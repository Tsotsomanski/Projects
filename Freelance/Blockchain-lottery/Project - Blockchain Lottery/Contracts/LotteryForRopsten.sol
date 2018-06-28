pragma solidity ^0.4.22;

library SafeMath {
	function mul(uint256 a, uint256 b) internal pure returns (uint256) {
		if (a == 0) {
			return 0;
		}
		uint256 c = a * b;
		assert(c / a == b);
		return c;
	}

	function div(uint256 a, uint256 b) internal pure returns (uint256) {
		// assert(b > 0); // Solidity automatically throws when dividing by 0
		uint256 c = a / b;
		// assert(a == b * c + a % b); // There is no case in which this doesn't hold
		return c;
	}

	function sub(uint256 a, uint256 b) internal pure returns (uint256) {
		assert(b <= a);
		return a - b;
	}

	function add(uint256 a, uint256 b) internal pure returns (uint256) {
		uint256 c = a + b;
		assert(c >= a);
		return c;
	}
}

contract Owned {
    address public owner;
    address public lottery;
    
	event LogNew(address indexed old, address indexed current);
	
	modifier onlyOwner { 
	    require(msg.sender == owner); 
	    _; 
	}
	
	modifier onlyLottery { 
	    require(msg.sender == lottery); 
	    _; 
	}
	
    constructor() public {
        owner = msg.sender;
    }
    
    function transferOwnership(address _newOwner) onlyOwner public { 
		emit LogNew(owner, _newOwner); 
		
		owner = _newOwner; 
    }
    
    function setLottery(address _Lottery) onlyOwner public { 
		emit LogNew(lottery, _Lottery);
		
        lottery = _Lottery; 
    }
}

contract DividentManager is Owned {
    event LogDeposit(uint256 _amount);
    event LogWithdraw(address indexed participant, uint256 revenue);
    
    function() payable public {
        emit LogDeposit(msg.value);
    }
    
    function withdraw(address _participant, uint256 _revenue) payable public onlyLottery {
        _participant.transfer(_revenue);
        
        emit LogWithdraw(_participant, _revenue);
    }
}

contract Lottery is Owned {
    using SafeMath for uint256;
    
	address public ownerWallet;
	address public activator;
	
	uint256 public constant BET = 0.1 ether; // TODO THINK // test with 1 eth
	uint8 public constant ODD = 1;
	uint8 public constant EVEN = 2;
	uint256 public constant COMMISSION_PERCENTAGE = 5;
	uint256 public constant END_DURATION_BETTING_BLOCK = 29085; // 5 days average 
	uint256 public constant TARGET_DURATION_BETTING_BLOCK = 40720; // 7 days  average
	
	DividentManager public dividentManager;
	
	uint256[] targetBlocks;
	
	mapping(address => Participant) public participants;
	
 	mapping(uint256 => mapping(uint256 => uint256)) oddAndEvenBets; // Stores the msg.value for the block and the bet (odd or even)
	
 	mapping(uint256 => uint256) blockResult; // Stores if the blockhash's last char is odd or even
	mapping(uint256 => bytes32) blockHash; // Stores the hash of block (block.number)
	
 	mapping(uint256 => uint256) blockRevenuePerPerson; // Stores the amount of the revenue per person for given block
 	mapping(uint256 => bool) isBlockRevenueCalculated; // Stores if the blocks revenue is calculated
	
 	mapping(uint256 => uint256) comissionsAtBlock; // Stores the commision amount for given block

 	uint256 public _startBetBlock;
 	uint256 public _endBetBlock;
	
 	uint256 public _targetBlock;
	
	modifier afterBlock(uint256 _blockNumber) {
		require(block.number >= _blockNumber);
		_;
	}
	
	modifier onlyActivator { 
	    require(msg.sender == activator); 
	    _; 
	}
	
	struct Participant {
	    mapping(uint256 => Bet) bets;
	    bool isParticipated;
	}
	
	struct Bet {
	    uint8 betType;
		bool isRevenuePaid;
	}

	constructor(address _dividentManager, address _ownerWallet) public {
		dividentManager = DividentManager(_dividentManager);
		ownerWallet = _ownerWallet;
	}
	
	function() payable public {
	   bet(getBlockHashOddOrEven(block.number - 128));
	}
	
	function activateCycle(uint256 _startBlock) public onlyActivator returns (bool) {
		if(_startBlock == 0){
			_startBlock = block.number;
		}
		require(block.number >= _endBetBlock);
		
		_startBetBlock = _startBlock;
		_endBetBlock = _startBetBlock.add(END_DURATION_BETTING_BLOCK);
		
		_targetBlock = _startBetBlock.add(TARGET_DURATION_BETTING_BLOCK);
		targetBlocks.push(_targetBlock);
		
		return true;
	}

	event LogBet(address indexed participant, uint256 blockNumber, uint8 oddOrEven, uint256 betAmount);
	function bet(uint8 oddOrEven) public payable returns (bool) {        
		require(msg.value == BET);
		require(oddOrEven == ODD || oddOrEven == EVEN);
		require(block.number <= _endBetBlock && block.number >= _startBetBlock);
		
		// @dev - check if participant already betted on this block
		require(participants[msg.sender].bets[_targetBlock].betType == 0);
		
		// @dev - check if participant already betted
		if(participants[msg.sender].isParticipated == false) {
		    // create new participant in memory
			Participant memory newParticipant;
			newParticipant.isParticipated = true;
			
			//save the participant to state
			participants[msg.sender] = newParticipant;
		}
		
		// @dev - create new bet
		Bet memory newBet = Bet({betType: oddOrEven, isRevenuePaid: false});
		
		//save the bet
    	participants[msg.sender].bets[_targetBlock] = newBet;
		
		// save the bet for the block
    	oddAndEvenBets[_targetBlock][oddOrEven] = oddAndEvenBets[_targetBlock][oddOrEven].add(msg.value);
    
    	address(dividentManager).transfer(msg.value);
    
    	emit LogBet(msg.sender, _targetBlock, oddOrEven, BET);
    
    	return true;
	}
	
	function calculateRevenueAtBlock(uint256 _blockNumber) public afterBlock(_blockNumber) {
		require(isBlockRevenueCalculated[_blockNumber] == false);

		blockResult[_blockNumber] = getBlockHashOddOrEven(_blockNumber);

		require(blockResult[_blockNumber] == ODD || blockResult[_blockNumber] == EVEN);
		
		if(blockResult[_blockNumber] == ODD) {
			calculateRevenue(_blockNumber, ODD, EVEN);
		} else if(blockResult[_blockNumber] == EVEN) {
		    calculateRevenue(_blockNumber, EVEN, ODD);
		}
	}
	
	event LogOddOrEven(uint256 blockNumber, bytes32 blockHash, uint256 oddOrEven);
	function getBlockHashOddOrEven(uint256 _blockNumber) internal returns (uint8) {
    	blockHash[_blockNumber] = blockhash(_blockNumber); 
		uint256 result  = uint256(blockHash[_blockNumber]);
        uint256 lastChar = (result * 2 ** 252) / (2 ** 252);
		uint256 _oddOrEven = lastChar % 2;
		
		emit LogOddOrEven(_blockNumber, blockHash[_blockNumber], _oddOrEven);
		
		if(_oddOrEven == 1) {
			return ODD;
		} else if (_oddOrEven == 0) {
			return EVEN;
		}
	}
	
	event LogRevenue(uint256 blockNumber, uint256 winner, uint256 revenue);
	function calculateRevenue(uint256 _blockNumber, uint256 winner, uint256 loser) internal {
        uint256 revenue = oddAndEvenBets[_blockNumber][loser];
		if(oddAndEvenBets[_blockNumber][ODD] != 0 && oddAndEvenBets[_blockNumber][EVEN] != 0) {
            uint256 comission = (revenue.div(100)).mul(COMMISSION_PERCENTAGE);
            revenue = revenue.sub(comission);
    		comissionsAtBlock[_blockNumber] = comission;
    		dividentManager.withdraw(ownerWallet, comission);
    		uint256 winners = oddAndEvenBets[_blockNumber][winner].div(BET);
		    blockRevenuePerPerson[_blockNumber] = revenue.div(winners);
		}
		isBlockRevenueCalculated[_blockNumber] = true;
		emit LogRevenue(_blockNumber, winner, revenue);
	}
    // TODO event for return bet
	event LogWithdrawRevenue(address indexed participant, uint256 blockNumber, bool revenuePaid);
	function withdrawRevenue(uint256 _blockNumber) public returns (bool) {
		require(participants[msg.sender].bets[_blockNumber].betType > 0);
		require(participants[msg.sender].bets[_blockNumber].isRevenuePaid == false);
		require(isBlockRevenueCalculated[_blockNumber] == true);
		
		if(oddAndEvenBets[_blockNumber][ODD] == 0 || oddAndEvenBets[_blockNumber][EVEN] == 0) {
			dividentManager.withdraw(msg.sender , BET);
			participants[msg.sender].bets[_blockNumber].isRevenuePaid = true;
			emit LogWithdrawRevenue(msg.sender, _blockNumber, participants[msg.sender].bets[_blockNumber].isRevenuePaid);

		    return participants[msg.sender].bets[_blockNumber].isRevenuePaid;	
		}

	    if(participants[msg.sender].bets[_blockNumber].betType == blockResult[_blockNumber]) {
			uint256 _revenue = blockRevenuePerPerson[_blockNumber].add(BET);
			dividentManager.withdraw(msg.sender , _revenue);
			participants[msg.sender].bets[_blockNumber].isRevenuePaid = true;
		}
		
		emit LogWithdrawRevenue(msg.sender, _blockNumber, participants[msg.sender].bets[_blockNumber].isRevenuePaid);
		return participants[msg.sender].bets[_blockNumber].isRevenuePaid;	
	}
	
	function setActivator(address _Activator) onlyOwner public { 
		emit LogNew(activator, _Activator);
		
        activator = _Activator; 
    }
	
	function setOwnerWallet(address _newOwnerWallet) public onlyOwner {
		emit LogNew(ownerWallet, _newOwnerWallet);
		
		ownerWallet = _newOwnerWallet;
	}
	
	function getblock() public view returns (uint256){
	    return block.number;
	}
	
	function getCycleInfo() public view returns (uint256 startBetBlock, uint256 endBetBlock, uint256 targetBlock){
	    return (
    	    _startBetBlock,
	    	_endBetBlock,
			_targetBlock);
	}
	
	function getBlockHash(uint256 _blockNumber) public view  returns (bytes32 _blockHash) {
		return blockHash[_blockNumber];
	}
	
	function getBetAt(address _participant, uint256 _blockNumber) public view returns(uint256 _oddOrEven){
   	    return participants[_participant].bets[_blockNumber].betType;
	}
	
	function getBlockResult(uint256 _blockNumber) public view returns(uint256 _oddOrEven){
   	    return blockResult[_blockNumber];
	}
	
	function getoddAndEvenBets(uint256 _blockNumber, uint256 _blockOddOrEven) public view returns(uint256 _weiAmountAtStage) {
   	    return oddAndEvenBets[_blockNumber][_blockOddOrEven];
	}
	
	function getIsParticipate(address _participant, uint256 _blockNumber) public view returns(bool _isParticipate) {
		return participants[_participant].bets[_blockNumber].betType > 0;
	}
	
	function getBlockRevenuePerPerson(uint256 _blockNumber) public view returns(uint256 _revenue) {
   	    return blockRevenuePerPerson[_blockNumber];
	}
	
	function getIsBlockRevenueCalculated(uint256 _blockNumber) public view returns(bool _isCalculated) {
   	    return isBlockRevenueCalculated[_blockNumber];
	}
	
	function getIsRevenuePaid(address _participant, uint256 _blockNumber) public view returns(bool _isParticipate) {
   	    return participants[_participant].bets[_blockNumber].isRevenuePaid;
	}
	
	function getBlockComission(uint256 _blockNumber) public view returns(uint256 _comission) {
   	    return comissionsAtBlock[_blockNumber];
	}
	
	function getBetsEvenAndODD(uint256 _blockNumber) public view returns(uint256 _ODDBets, uint256 _EVENBets) {
		return (oddAndEvenBets[_blockNumber][ODD],oddAndEvenBets[_blockNumber][EVEN]);
	}
	
	function getTargetBlockLength() public view returns(uint256 _targetBlockLenght) {
   	    return targetBlocks.length;
	}
	
	function getTargetBlocks() public view returns(uint256[]) {
   	    return targetBlocks;
	}
	
	function getTargetBlock(uint256 _index) public view returns(uint256 _targetBlockNumber) {
   	    return targetBlocks[_index];
	}
}
