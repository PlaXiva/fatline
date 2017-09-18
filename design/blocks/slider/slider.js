$(document).ready(function() {
    $('.slider__list').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: true,
        adaptiveHeight: true,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
});