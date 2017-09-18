$(document).ready(function() {

    nav_catalog__bind();
});

function nav_catalog__bind()
{
    if ($("body.touch .nav-catalog__1item_sub.hover").length > 0) {
        $(".page").addClass("page_overlay");
    }
    else {

    }

    $("body.no-touch .nav-catalog__1item_sub").hover(function () {
        // in
        $(".page").addClass("page_overlay");
    },
    function () {
        // out
        $(".page").removeClass("page_overlay");
    });
}