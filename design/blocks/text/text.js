$(window).load(function() {
    text__bind();

    $(window).resize(function () {
        text__set();
    });
});

function text__set()
{
    $('.text').each(function(idx, text) {
        var max_height = $(text).attr('data-height') ? $(text).attr('data-height') : 250;
        $(text).find('.text__spoiler').css('height', 'auto');

        if (max_height>0 && $(text).find('.text__spoiler').height() > max_height) {
            $(text).removeClass('text_full').addClass('text_short');
            $(text).find('.text__spoiler').css('height', max_height + 'px');
        }
        else {
            $(text).removeClass('text_full').removeClass('text_short');
        }

    });
}

function text__bind() 
{
    text__set();

    $(".text__less").bind("click", function (event) {
        event.preventDefault();
        var text = $(this).closest('.text');

        var max_height = $(text).attr('data-height') ? $(text).attr('data-height') : 250;

        if (max_height>0) {
            $(text).removeClass('text_full').addClass('text_short');
            $(text).find('.text__spoiler').css('height', max_height + 'px');
        }
        else {
            $(text).removeClass('text_full').removeClass('text_short');
        }

    });

    $(".text__more").bind("click", function (event) {
        event.preventDefault();
        var text = $(this).closest('.text');

        $(text).removeClass('text_short').addClass('text_full');
        $(text).find('.text__spoiler').css('height', 'auto');
    });

}