(function(){
    $('#buttonBetting').on('click', function() {
        $(this).css('color','white').addClass('pulse animated');
        setTimeout(function () {
            $('#buttonBetting').removeClass('pulse animated')
        }, 600);
    });

    $('#even-btn').on('click', function() {
        evenOddSwitchStyles($('#even-btn'), $('#odd-btn'));

        $('#odd-btn').removeClass('checked');
        $(this).addClass('checked');
    });

    $('#odd-btn').on('click', function() {
        evenOddSwitchStyles($('#odd-btn'), $('#even-btn'));
        $('#even-btn').removeClass('checked');
        $(this).addClass('checked');
    });

    $('#withdraw').on('click', function() {
        $(this).addClass('visited-button');
        $('#bet').removeClass('visited-button');
    });

    $('#bet').on('click', function() {
        $(this).addClass('visited-button');
        $('#withdraw').removeClass('visited-button');
    });
})();

function evenOddSwitchStyles(clicked, notClicked) {
    $('.even-odd-container').css('margin-bottom','36px');
    clicked.css({'background':themeColor, 'padding':'13px 0'});
    $('#or').css('background','rgba(255, 255, 255, 1)');
    notClicked.css({'background':'none', 'padding': '11px 0'});
}