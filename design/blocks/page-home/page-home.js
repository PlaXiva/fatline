$(document).ready(function() {
    page_home__bind();
});
    
function page_home__bind() 
{
    $('.page-home__cats-carousel').slick({
        dots: true,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 4000,
        adaptiveHeight: true,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $(".page-home__cats-list-item").bind("click", function (event) {
        event.preventDefault();

        $(".page-home__cats-list-item").removeClass('page-home__cats-list-item_active');
        $(this).addClass('page-home__cats-list-item_active');

        $('.page-home__cats-carousel').removeClass('page-home__cats-carousel_active');
        $('.page-home__cats-carousel[data-name='+$(this).attr('data-name')+']').addClass('page-home__cats-carousel_active').slick('setPosition');

    });
}