$(document).ready(function() {
    $(window).scroll(function () {
        header__scroll();
    });

    header__scroll();

    $(".header").on("timer:stop", function () {
        $('.header__banner').css('display', 'none');
    });

});

function header__scroll() {
    if ($(window).scrollTop() > $('.header__static').height()) {
        //$('.header__static').fadeOut();
        $('.header__fixed').fadeIn();
        //$('.header').removeClass('header_static').addClass('header_fixed');
    } else {
        //$('.header__static').fadeIn();
        $('.header__fixed').fadeOut();
        //$('.header').removeClass('header_fixed').addClass('header_static');
    }
}