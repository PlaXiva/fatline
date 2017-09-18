$(document).ready(function() {
    nav_h__bind();
});

function nav_h__bind()
{
    $(".nav-h__menu").bind("click", function (event) {
        //event.preventDefault();

        var nav = $(this).closest('.nav-h');
        var list = $(nav).find('.nav-h__list').first();

        if ($(list).hasClass('nav-h__list_open')) {
            $(list).removeClass('nav-h__list_open');
        }
        else {
            $(list).addClass('nav-h__list_open');
        }
    });

    $("body").bind("click", function (event) {

        if ($(event.target).closest('.nav-h').length == 0) {
            $('.nav-h__list').removeClass('nav-h__list_open');
        }

    });
}