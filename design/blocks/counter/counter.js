$(document).ready(function() {
    counter__bind();
});

function counter__bind()
{
    $(".counter__m, .counter__p").unbind('click').bind("click", function (event) {
        event.preventDefault();

        var inp = $(this).closest('.counter').find('.counter__input');

        var val = parseInt($(inp).val());

        if (isNaN(val) || val <= 0) {
            val = 1;
        }
        else {
            if ($(this).hasClass('counter__p')) {
                val = val + 1;
            }
            else {
                val = val - 1;
                if (val <= 0) {
                    val = 1;
                }
            }
        }

        $(inp).val(val).trigger('change');
    });
}