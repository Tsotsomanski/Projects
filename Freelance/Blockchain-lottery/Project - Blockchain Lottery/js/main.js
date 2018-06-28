$(document).ready(function () {
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider)
        console.log("Using Metamask/Mist WEB3 provider")
    } else {
        //:TODO some kind of modals/alerts
        alert('MetaMask not loaded, you can participate only with MetaMask or by MyEtherWallet ?!?');
         return;
    }

    function MetaMaskAlert() {
        if (web3.eth.accounts[0] === undefined) {
            alert('To participate please unlock your metamask or you can participate by MyEtherWallet');
        }
    }

    const abi = [{"constant":true,"inputs":[],"name":"getTargetBlockLength","outputs":[{"name":"_targetBlockLenght","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ODD","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participants","outputs":[{"name":"isParticipated","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_blockNumber","type":"uint256"}],"name":"withdrawRevenue","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"COMMISSION_PERCENTAGE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_participant","type":"address"},{"name":"_blockNumber","type":"uint256"}],"name":"getIsParticipate","outputs":[{"name":"_isParticipate","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_blockNumber","type":"uint256"}],"name":"getIsBlockRevenueCalculated","outputs":[{"name":"_isCalculated","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"EVEN","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"activator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_blockNumber","type":"uint256"},{"name":"_blockOddOrEven","type":"uint256"}],"name":"getoddAndEvenBets","outputs":[{"name":"_weiAmountAtStage","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_blockNumber","type":"uint256"}],"name":"getBlockResult","outputs":[{"name":"_oddOrEven","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"END_DURATION_BETTING_BLOCK","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_endBetBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_Activator","type":"address"}],"name":"setActivator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCycleInfo","outputs":[{"name":"startBetBlock","type":"uint256"},{"name":"endBetBlock","type":"uint256"},{"name":"targetBlock","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getTargetBlocks","outputs":[{"name":"_targetBlockNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_blockNumber","type":"uint256"}],"name":"getBlockComission","outputs":[{"name":"_comission","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dividentManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_startBlock","type":"uint256"}],"name":"activateCycle","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"BET","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lottery","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwnerWallet","type":"address"}],"name":"setOwnerWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_blockNumber","type":"uint256"}],"name":"getBetsEvenAndODD","outputs":[{"name":"_ODDBets","type":"uint256"},{"name":"_EVENBets","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_targetBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_participant","type":"address"},{"name":"_blockNumber","type":"uint256"}],"name":"getBetAt","outputs":[{"name":"_oddOrEven","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"oddOrEven","type":"uint8"}],"name":"bet","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getblock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_blockNumber","type":"uint256"}],"name":"calculateRevenueAtBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_blockNumber","type":"uint256"}],"name":"getBlockHash","outputs":[{"name":"_blockHash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_Lottery","type":"address"}],"name":"setLottery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"TARGET_DURATION_BETTING_BLOCK","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_blockNumber","type":"uint256"}],"name":"getBlockRevenuePerPerson","outputs":[{"name":"_revenue","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_startBetBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_participant","type":"address"},{"name":"_blockNumber","type":"uint256"}],"name":"getIsRevenuePaid","outputs":[{"name":"_isParticipate","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_dividentManager","type":"address"},{"name":"_ownerWallet","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participant","type":"address"},{"indexed":false,"name":"blockNumber","type":"uint256"},{"indexed":false,"name":"oddOrEven","type":"uint8"},{"indexed":false,"name":"betAmount","type":"uint256"}],"name":"LogBet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"blockNumber","type":"uint256"},{"indexed":false,"name":"blockHash","type":"bytes32"},{"indexed":false,"name":"oddOrEven","type":"uint256"}],"name":"LogOddOrEven","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"blockNumber","type":"uint256"},{"indexed":false,"name":"winner","type":"uint256"},{"indexed":false,"name":"revenue","type":"uint256"}],"name":"LogRevenue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participant","type":"address"},{"indexed":false,"name":"blockNumber","type":"uint256"},{"indexed":false,"name":"revenuePaid","type":"bool"}],"name":"LogWithdrawRevenue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"old","type":"address"},{"indexed":true,"name":"current","type":"address"}],"name":"LogNew","type":"event"}]


    const address = '0x18b614e2f3359FE4B7ffce3C37F0E1c0dD59CF72';
    const contract = web3.eth.contract(abi).at(address);

    function refreshBlocks() {
        // method to be executed;

        let currentBlockNumber;
        contract.getblock(function (err, result) {
            currentBlockNumber = result.toNumber();
        })

        contract.getCycleInfo(async function (err, result) {
            let startBlock = result[0].toNumber();
            let endBlock = result[1].toNumber();
            let targetBlock = result[2].toNumber();
            const commission = 1.05;

            console.log(`Betting is from ${startBlock} - ${endBlock} for block: ${targetBlock}`);
            $('#targetBlockContractt').text(targetBlock);

            contract.getblock(function(err,result){
                let actualBlock = result;
                let remainingBlocks = endBlock - actualBlock;
                console.log(remainingBlocks);
                $("#targetBlockContractC").text(targetBlock);
                $("#endAfterBlocks").text(remainingBlocks);
            });

            contract.getBetsEvenAndODD(targetBlock, function (err, result) {
                let odd = Number(result[0]);
                let even = Number(result[1]);

                let oddBetsInETH = odd / 10e17;
                let evenBetsInETH = even / 10e17;

                $("#odd").text(oddBetsInETH + " ETH");
                $("#even").text(evenBetsInETH + " ETH");

                contract.END_DURATION_BETTING_BLOCK(function (err, result) {
                    let endDurationBettingBlock = result.toNumber();
                    let nextTargetBlock = endDurationBettingBlock + endBlock;
                    $("#nextTargetBlockContract").text(nextTargetBlock);

                    contract.getTargetBlockLength(function (err, result) {
                        let indexOfPrevBlock = Number(result) - 2;

                        contract.getTargetBlocks(indexOfPrevBlock, function (err, result) {
                            let prevBlockNumber = result;

                            $("#prevTargetBlockContract").text(prevBlockNumber);

                            let oddWin = (oddBetsInETH / commission);
                            $("#evenRevenue").text(oddWin + " ETH");

                            let evenWin = (evenBetsInETH / commission);
                            $("#oddRevenue").text(evenWin + " ETH");
                            contract.BET(function (err, result) {
                                let bet = result.toNumber() / 10e17;
                                let oddParticipants = oddBetsInETH / bet;
                                let evenParticipants = evenBetsInETH / bet;

                                let evenRevenueParticipant = oddWin / evenParticipants;
                                if(isNaN(evenRevenueParticipant)) {
                                    evenRevenueParticipant = 0;
                                }else if(evenRevenueParticipant/0 === evenRevenueParticipant){
                                     evenRevenueParticipant = oddWin;
                                }
                                $("#evenRevenueForParticipant").text(evenRevenueParticipant + " ETH");
                                let oddRevenueParticipant = evenWin / oddParticipants;
                                if(isNaN(oddRevenueParticipant)) {
                                    oddRevenueParticipant = 0;
                                }else if(oddRevenueParticipant/0 === oddRevenueParticipant){
                                    oddRevenueParticipant = evenWin;
                                }
                                $("#oddRevenueForParticipant").text(oddRevenueParticipant + " ETH");
                            })
                        })
                    })
                })
            })
        })
    }

    refreshBlocks();
    setInterval(refreshBlocks, 10000);


    $('#buttonBetting').on('click', function () {
        bet()
    });

    function bet() {
        let evenOddValue;
        MetaMaskAlert();
        let oddOrEven = $('.even-odd-btn').hasClass('checked').attr('value');
        let txInfo = {
            value: web3.toWei("0.1", "ether"),
            gas: 200000,
            gasPrice: 10000000000
        };

        contract.bet(oddOrEven, txInfo, function (err, result) {
            console.log("Txhash: " + result)
        })
    }

    $('body').on('click', '#WithdrawButton', function () {
        Withdraw()
    });

    function Withdraw() {
        MetaMaskAlert();
        let BlockNumber = $('#blockNum').val();

        let txInfo = {
            value: web3.toWei("0", "ether"),
            gas: 200000,
            gasPrice: 10000000000
        }

        contract.withdrawRevenue(BlockNumber, txInfo, function (err, result) {
            console.log("Txhash: " + result)
        })
    }

    $('body').on('click', '#GetPenndingTransactions', function () {
        getPenndingParticipateBlocks()
    });

    function getPenndingParticipateBlocks(){
        MetaMaskAlert();
        let account = web3.eth.accounts[0];
        let targetBlocksLength;
        let targetBlocksForUnWithdrawn = [];

        contract.getTargetBlockLength(function (err, result) {
            targetBlocksLength = result.toNumber();

            for (let i = 0; i < targetBlocksLength; i++) {
                contract.getTargetBlocks(i, function (err, block) {
                    contract.getIsParticipate(account, block.toNumber(), function (err, result) {
                        if (result === true) {
                            contract.getIsRevenuePaid(account, block.toNumber(), function (err, result) {
                                if (result === false) {
                                    let content = "<li>" + "Unwithdrawn block: " + block.toNumber() + "</li>";
                                    $('ul#unwithdrawn').append(content);
                                }
                            })
                        }
                    })
                })
            }
        })
    }
});
