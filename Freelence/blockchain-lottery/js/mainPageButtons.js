let chosenNetwork = '';
let notChosenNetwork = '';
let themeColor = '';

(function(){
    let btnRopsten = $('#ropsten');
    let btnMainnet = $('#mainnet');
    let btnBet = $('#bet');
    let btnHowItWorks = $('#how-it-works');
    let btnWithdraw = $('#withdraw');

    btnRopsten.on('click', function() {
        themeColor = '#e91550';
        chosenNetwork = btnRopsten;
        notChosenNetwork = btnMainnet;

        $('.btn-container-top').addClass('zoomInUp animate').css('display','flex');
        $('#buttonBetting').css('background',themeColor);

        btnBet.addClass('visited-button');
        resetOddEvenStyles();
        defineChosenNetwork(ropsten);

        $(this).removeClass('not-chosen-network').addClass('chosen-network zoomOutUp');
        btnMainnet.removeClass('chosen-network zoomOutUp').addClass('not-chosen-network');

        hideShowNeeded(chosenNetwork);
        setTimeout(function() {
            $('.btn-container-top').addClass('zoomInUp animate').css('display','flex');
            $('#how-it-works').show().addClass('zoomIn animated how-it-works-after how-it-works-margins');
        }, 1000);

        $('.dynamic-title').text('Ropsten Network');
        $(btnRopsten).removeClass('flag');
    });

    btnMainnet.on('click', function() {
        themeColor = '#038789';
        chosenNetwork = btnMainnet;
        notChosenNetwork = btnRopsten;

        //This logic is checking the margins of the buttons   END

        resetOddEvenStyles();
        defineChosenNetwork(mainnet);
        $('#buttonBetting').css('background',themeColor);

        $(this).removeClass('not-chosen-network').addClass('chosen-network zoomOutUp');
        btnRopsten.removeClass('chosen-network zoomOutUp').addClass('not-chosen-network');

        hideShowNeeded(chosenNetwork);
        setTimeout(function() {
            $('.btn-container-top').addClass('zoomInUp animate').css('display','flex');
            $('#how-it-works').show().addClass('zoomIn animated how-it-works-after  how-it-works-margins');
        }, 1000);
        $('.dynamic-title').text('Mainnet Network');
        $(btnMainnet).removeClass('flag');
    });

    btnBet.on('click', function () {
        if (!$('#div-mainnet-ropsten').hasClass('show')) {
            showBetContent();
        }
    });

    btnWithdraw.on('click', function () {
        if (!$('#div-withdraw').hasClass('show')) {
            showWithdrawContent();
        }
    });

    btnHowItWorks.on('click', function() {
        $('.btn-container-top').hide();
        showHowItWorkContent();

        setTimeout(function () {
            $('.btn-container').css('display', 'flex');
            $('#how-it-works').hide();

            $('#ropsten').css({
                'display': 'flex',
                'width': '100%'
            }).removeClass('zoomIn animated').addClass('pulse animate flag');
            $('#mainnet').css({
                'display': 'flex',
                'width': '100%'
            }).removeClass('zoomIn animated').addClass('pulse animate flag');
        },400);

    });
})();

function hideShowNeeded(chosenNetwork) {

    setTimeout(function () { //Hide buttons at the bottom
        notChosenNetwork.hide();
        $('#how-it-works').hide();
    }, 5);

    setTimeout(function() {
        showBetContent();
    }, 500);

    setTimeout(function() { //showing BET and WITHDRAW buttons after Mainnet/Ropsten
            if (chosenNetwork[0].innerHTML === "Ropsten") {
                $('.chosen-btn .main-btn:not(#bet-amount-label)').css('background','#e91550');
            }
            else if (chosenNetwork[0].innerHTML === "Mainnet") {
                $('.chosen-btn .main-btn:not(#bet-amount-label)').css('background','#038789');
            }

            //show Bet & Withdraw & bet amount label
            $('.chosen-btn .main-btn:not(#bet-amount-label)')
                .css({
                    'display': 'flex',
                    'width': '46%',
                    'position':'relative',
                    'cursor':'pointer'
                })
                .addClass('zoomInDown animated');

            // Show buttons: 'how-it-works' and the other choise for network
            $('#how-it-works').show().addClass('zoomIn animated how-it-works-after');
            if (chosenNetwork = 'Ropsten') {
                $('#mainnet').css('width','100%');
            }

            notChosenNetwork.addClass('zoomIn animated').show().css('width','100%');
        }, 1000);

    setTimeout(function () {
        $('.chosen-network').css('display','none');
    },1100);
    
    $('#bet-amount-label').css('background', 'none');

    $('.chosen-network')
        .css({
            'display':'block',
            'width':'100%',
            'position':'relative'
        })
        .animate({
            'width':'10%',
            'margin':'0 auto',
            'display':'none'
        },400)
        .addClass('zoomOutUp animated');
}

function resetOddEvenStyles() {
    $('.even-odd-container').css('margin-bottom','30px');
    $('#odd-btn').css({'background':'none', 'padding': '11px 0'});
    $('#or').css('background','rgba(255, 255, 255, .7)');
    $('#even-btn').css({'background':'none', 'padding': '11px 0'});
}

function defineChosenNetwork(network) {
    $(this).addClass('chosen-network').removeClass('not-chosen-network');
}

function showBetContent() {
    // Hide the main page content and show the new content
        $('#div-mainpage').removeClass('show').addClass('hide');
        $('#div-withdraw').removeClass('show').addClass('hide');
        $('#div-how-it-works').removeClass('show').addClass('hide');
        $('#div-mainnet-ropsten').removeClass('hide').addClass('show');

        $('.chosen-btn #bet-amount-label') //Showing the Ropsten/Mainnet button first
            .css({
                //
                'border-bottom':'2px solid white',
                'border-top':'2px solid white',
                'letter-spacing':'3px',
                'background':'rgba(255, 255, 255, .6)'
            })
            .addClass('zoomInUp animated title-button')
            .css({'display':'flex'});

}

function showHowItWorkContent() {
    setTimeout(function () { // Hide the main page content and show the new content
        $('#div-mainpage').removeClass('show').addClass('hide');
        $('#div-mainnet-ropsten').removeClass('show').addClass('hide');
        $('#div-withdraw').removeClass('show').addClass('hide');
        $('#div-how-it-works').removeClass('hide').addClass('show pulse animate');
        $('.btn-container').hide();
    }, 50);
}

function showWithdrawContent() {
    setTimeout(function () { // Hide the main page content and show the new content
        $('#div-mainpage').removeClass('show').addClass('hide');
        $('#div-mainnet-ropsten').removeClass('show').addClass('hide');
        $('#div-how-it-works').removeClass('show').addClass('hide');
        $('#div-withdraw').removeClass('hide').addClass('show');
    });
}