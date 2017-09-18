$(document).ready(function() {
    nav_catalog_fixed__bind();
});

function nav_catalog_fixed__bind()
{
    if ($("body .nav-catalog-fixed__1item.hover").length > 0) {
        $(".page").addClass("page_overlay");
    }
    else {


    }

    $("body.no-touch .nav-catalog-fixed__1item").hover(function () {
        // in
        $(".page").addClass("page_overlay");
    },
    function () {
        // out
        $(".page").removeClass("page_overlay");
    });
}