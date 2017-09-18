$(document).ready(function() {
    $('.callback__link').bind('click', function (event) {
        event.preventDefault();

        var callback = $(this).closest('.callback');

        if ($(callback).hasClass('callback_open')) {
            $('.callback').removeClass('callback_open');
        }
        else {
            $('.callback').addClass('callback_open');
        }
    });

    $('body').bind('click', function (event) {

        if ($(event.target).closest('.callback').length == 0 && $('.callback').hasClass('callback_open')) {
            $('.callback__link').first().trigger('click');
        }

    });
});