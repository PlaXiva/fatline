$(document).ready(function() {
    /* General */

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        $('body').addClass('touch');
    }
    else {
        $('body').addClass('no-touch'); // no-touch
    }

    var bMobile = false;
    if (!($(window).width() >= 768 || $.cookie('is_full_version')==1)) {
        bMobile = true;
    }

    $('.full-version').bind('click', function (event) {
        $.cookie('is_full_version', 1, {expires:1, path: '/'});
    });

    $('.mobile-version').bind('click', function (event) {
        $.removeCookie("is_full_version", {path: '/'});
    });

    var bFullVersion = ($.cookie('is_full_version')===undefined) ? false : true;

    $.cookie('device_width', $(window).width(), {expires:1, path: '/'});

    $(window).resize(function() {
        $.cookie('device_width', $(window).width(), {expires:1, path: '/'});
    });

    $("a.prettyPhoto").prettyPhoto({
        show_title: false,
        theme: 'pp_default',
        allow_resize: false,
        social_tools: ''
    });

    $("a[rel^='prettyPhoto']").prettyPhoto({
        show_title: false,
        theme: 'pp_default',
        allow_resize: false,
        social_tools: ''
    });

    $("input[type=checkbox], input[type=radio]").uniform();
    $('input[name^=phone]').mask('+38 (999) 999-99-99');

    $('button[type=reset], input[type=reset]').bind('click', function(event) {
        setTimeout(function(){
            $.uniform.update();
        }, 50);
        return true;
    });

    // hide #back-top first
    $("#back-top").hide();

    // fade in #back-top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#back-top a').click(function (event) {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        event.preventDefault();
        return false;
    });

    $('[data-toggle="tooltip"]').tooltip();

    bind_counter();

    $('#favs-count a').bind('click', function(event) {
        if ($(this).closest('#favs-count').hasClass('empty')) {
            return event.preventDefault();
        }
    });

    /* UsersCatalogSide */

    $('.navbar-header.cat .navbar-brand').bind('click', function(event) {
        event.preventDefault();
        $(this).closest('.navbar-header').find('button').trigger('click');
    });

    $('body.touch .topcat ul.lev1 > li.sub > a').bind('click', function (event) {
        if (bMobile) {
            return;
        }

        if ($(this).parent().hasClass('hover')) {
            return;
        }
        else {
            $('body.touch .topcat ul.lev1 > li').removeClass('hover');
            $(this).parent().addClass('hover');
            event.preventDefault();
        }
    });

    $('body .specials-row li.rasprodazha > a').bind('click', function (event) {
        event.preventDefault();

        if ($('body.touch').length > 0){
            if (!$(this).parent().hasClass('hover')) {
                $(this).parent().addClass('hover');
            }
            else {
                $(this).parent().removeClass('hover');
            }
        }

    });

    $('body').bind('click', function(event) {

        if ($('body.touch').length > 0) {
            if ($(event.target).closest('body.touch .topcat').length == 0) {
                $('body.touch .topcat ul.lev1 > li').removeClass('hover');
            }

            if ($(event.target).closest('body.touch .specials-row li.rasprodazha').length == 0) {
                $('body.touch .specials-row li.rasprodazha').removeClass('hover');
            }
        }

    });



    /*
     $('#topcat ul.lev1 > li > a').bind('click', function(event) {
     if ($(window).width() >= 768) {
     return;
     }

     if (!$(this).parent().hasClass('open')) {
     $('#topcat ul.lev1 > li').removeClass('open');
     $(this).parent().addClass('open');
     }
     else {
     $('#topcat ul.lev1 > li').removeClass('open');
     }

     event.preventDefault();
     });
     */

    /* UsersFilterSide */
    $('.filters-block h2').bind('click', function() {
        if ($(window).width() >= 768) {
            return;
        }

        if ($('.filters-block').hasClass('open')) {
            $('.filters-block').removeClass('open')
        }
        else {
            $('.filters-block').addClass('open')
        }
    });

    /* UsersProductHome */
    if ($('#slider').length > 0) {
        $('#slider').slick({
            autoplay: true,
            autoplaySpeed: 4000,
            dots: true,
            arrows: false,
            adaptiveHeight: true,
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }

    var aSpecLinksResp;
    if (bFullVersion) {
        aSpecLinksResp = [
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            }
        ];
    }
    else {
        aSpecLinksResp = [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ];
    }

    $('.home-specials-row ul.specials-links').slick({
        adaptiveHeight: true,
        mobileFirst: true,
        arrows: true,
        responsive: aSpecLinksResp
    });

    var aSpecProdsResp;

    if (bFullVersion) {
        aSpecProdsResp = [
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            }
        ];
    }
    else {

        aSpecProdsResp = [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 579,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ];
    }

    $('.home-specials-row .specials-prods > ul.active').slick({
        adaptiveHeight: true,
        mobileFirst: true,
        arrows: true,
        responsive: aSpecProdsResp
    });

    $('.specials-links li > a').bind('click', function(event) {
        var specials_rows = $(this).closest('.home-specials-row');

        $(specials_rows).find('.specials-links li').removeClass('active');
        $(this).parent().addClass('active');

        $(specials_rows).find('.specials-prods > ul').removeClass('active');

        var ul = $(specials_rows).find('.specials-prods > ul.'+$(this).parent().attr('data-prods'));

        if (!$(ul).hasClass('slick-slider')) {
            $(ul).slick({
                adaptiveHeight: true,
                mobileFirst: true,
                arrows: true,
                responsive: aSpecProdsResp
            });
        }

        $(ul).addClass('active').slick('setPosition');

        event.preventDefault();
    });

    /* UsersCategoryView */
    if ($('#topcat-vertical[data-alias]').length > 0) {
        var sAlias = $('#topcat-vertical[data-alias]').attr('data-alias');
        $('#topcat-vertical[data-alias] li.cat-'+sAlias).addClass('active');
    }

    load_more('');

    $('.product-info .oneclick').bind('click', function (event) {

        var prod_el = $(this).closest('[data-id]');
        var phone = $(this).parent().find('input').val();
        var cnt = ($(prod_el).find('input[name=cnt]').length>0) ? $(prod_el).find('input[name=cnt]').val() : 1;;

        if ($(prod_el).length > 0 && phone !='' && cnt>0) {
            var id = $(prod_el).attr('data-id');
            xajax_products_UsersProductView_oneclick(id, phone, cnt, getFeats(id));
        }

        event.preventDefault();
    });


    $('.category .params select').change(function() {
        $(this).closest('form').submit();
    });

    /* UsersFilterSide */

    $('.filters select, .filters input[type=checkbox]').change(function() {
        $(this).closest('form').submit();
    });

    $('.filters .feat a.title').bind('click', function(event) {
        var feat = $(this).closest('.feat');
        if ($(feat).length == 0) {
            event.preventDefault();
            return;
        }

        if ($(feat).hasClass('closed')) {
            $(feat).removeClass('closed');
        }
        else {
            $(feat).addClass('closed');
        }

        event.preventDefault();
    });

    /*
     $('.filters .fvals-more a').bind('click', function(event) {
     var fvals = $(this).closest('.fvals');
     if ($(fvals).length == 0) {
     event.preventDefault();
     return;
     }

     if ($(fvals).hasClass('all')) {
     $(fvals).removeClass('all');
     }
     else {
     $(fvals).addClass('all');
     }

     event.preventDefault();
     });
     */

    $('.filters button[type=reset]').bind('click', function(event) {
        event.preventDefault();
        $(this).closest('form').reset().submit();
    });

    /* UsersProductView */
    var aProdPicsResp;

    if (bFullVersion) {
        aProdPicsResp = [
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }
        ];
    }
    else {

        aProdPicsResp = [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },

            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },

            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 639,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 359,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ];
    }

    jQuery('.product-small-pics > ul').slick({
        adaptiveHeight: true,
        mobileFirst: true,
        arrows: true,
        infinite: false,
        responsive: aProdPicsResp
    });
    /*
     $('.product-small-pics img').bind('click', function(event) {
     if ($(this).hasClass('video')) {
     return;
     }

     var index = $(this).attr('data-index');
     $('.product-big-pic').removeClass('active');
     $('.product-big-pic[data-index='+index+']').addClass('active');

     // horizontal slider
     $('.product-small-pics li').removeClass('active');
     $(this).closest('li').addClass('active');

     event.preventDefault();
     });
     */

    $('.add2torg').bind('click', function (event) {

        var prod_el = $(this).closest('[data-id]');

        if ($(prod_el).length > 0) {
            var id = $(prod_el).attr('data-id');

            xajax_products_UsersCategoryView_put(id, 'torg', getFeats(id));
        }

        event.preventDefault();
    });

    $('.product-info .sizes-list a').bind('click', function (event) {
        $('.product-info .sizes-list li').removeClass('active');
        $(this).closest('li').addClass('active');

        $("input[name='feature[31]']").val($(this).attr('data-size-id'));

        var len = $('.length-list a[data-size-id='+$(this).attr('data-size-id')+']');
        if ($(len).length > 0) {
            $('.length-list li').removeClass('active');
            $(len).closest('li').addClass('active');
        }

        event.preventDefault();
    });

    $('.product-info .length-list a').bind('click', function (event) {
        $('.product-info .sizes-list a[data-size-id='+$(this).attr('data-size-id')+']').trigger('click');
        event.preventDefault();
    });

    $('.product-info .sizes-list li.active a').trigger('click');

    var aProdResp;

    if (bFullVersion) {
        aProdResp = [
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            }
        ];
    }
    else {
        aProdResp = [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 579,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ];
    }

    $('.product-related ul.prods, .product-viewed ul.prods').slick({
        adaptiveHeight: true,
        mobileFirst: true,
        arrows: true,
        responsive: aProdResp
    });


    $('.product-schema .socials a').bind('click', function(event) {
        //window.open($(this).attr('href'), '_blank','toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=500, height=400');
        event.preventDefault();
    });

    /* UsersShopCart */
    bind_cart('first');

    $('.cart-bottom .oneclick').bind('click', function (event) {

        var phone = $(this).parent().find('input').val();

        if (phone !='') {
            xajax_products_UsersProductView_oneclick('cart', phone, 0, Array());
        }

        event.preventDefault();
    });

    /* UsersOrderForm */
    $('#order-form .ship_id input').change(function() {
        var ship_id = $(this).val();

        inp_row('fname', 'hide');
        inp_row('lastname', 'hide');
        inp_row('firstname', 'hide');
        inp_row('fathername', 'hide');

        inp_row('state', 'hide');
        inp_row('region', 'hide');
        inp_row('city', 'hide');
        inp_row('address', 'hide');
        inp_row('room', 'hide');
        inp_row('sklad', 'hide');
        inp_row('zip', 'hide');

        if (ship_id == 10) {
            // curier new post
            inp_row('lastname', 'show');
            inp_row('firstname', 'show');
            inp_row('state', 'show');
            inp_row('city', 'show');
            inp_row('address', 'show');
            inp_row('room', 'show');
        }
        else if (ship_id == 9) {
            // office
            inp_row('fname', 'show');
        }
        else if (ship_id == 11 || ship_id == 13) {
            // new post
            inp_row('lastname', 'show');
            inp_row('firstname', 'show');
            inp_row('state', 'show');
            inp_row('city', 'show');
            inp_row('sklad', 'show');
        }
        else if (ship_id == 12) {
            // ukr post
            inp_row('lastname', 'show');
            inp_row('firstname', 'show');
            inp_row('fathername', 'show');

            inp_row('state', 'show');
            inp_row('region', 'show');
            inp_row('city', 'show');
            inp_row('address', 'show');
            inp_row('room', 'show');
            inp_row('zip', 'show');
        }

        set_calcs(ship_id, $('#order-form .pay_way input:checked').val());
    });

    $('#order-form .pay_way input').change(function() {
        set_calcs($('#order-form .ship_id input:checked').val(), $(this).val());
    });

    $('#order-form .ship_id input:checked').trigger('change');
    $('#order-form .pay_way input:checked').trigger('change');

    /* UsersCommentsBlock */
    $('a.comment-fav').bind('click', function(event) {
        event.preventDefault();
        xajax_system_UsersCommentsBlock_commentfav($(this).attr('data-id'), $(this).hasClass('on') ? 'off' : 'on');
    });
});

function inp_row(sField, sMode)
{
    if (sMode == 'hide') {
        $('#order-form .'+sField).addClass('hidden');
        $('#order-form .'+sField+' input').prop('disabled', true);
    }
    else {
        $('#order-form .'+sField).removeClass('hidden');
        $('#order-form .'+sField+' input').prop('disabled', false);
    }
}

function bind_cart(sMode)
{
    $('.cart-prods .counter input').on('change', function() {
        xajax_products_UsersShopCart_upd($(this).closest('[data-num]').attr('data-num'), $(this).val(), $('.cart-prods').hasClass('block'));
    });

    if (sMode == 'next') {
        bind_counter();

        $(".cart-prods a.prettyPhoto").prettyPhoto({
            show_title: false,
            theme: 'pp_default',
            allow_resize: false,
            social_tools: ''
        });
    }
}

function bind_counter()
{
    $('.counter span.plus, .counter span.minus').bind('click', function(event) {
        var inp = $(this).closest('.counter').find('input');

        var val = parseInt($(inp).val());

        if (isNaN(val) || val <= 0) {
            val = 1;
        }
        else {
            if ($(this).hasClass('plus')) {
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

function load_more(sScope)
{
    $('#show-more').bind('click', function(event) {
        var type = $(this).attr('data-type');
        var alias = $(this).attr('data-alias');
        var page = $(this).attr('data-p');
        var page_start = $(this).attr('data-pstart');

        $(this).removeClass('loading');
        $(this).addClass('loading');

        xajax_products_UsersCategoryView_showmore(type, alias, page, page_start, $('#input_sort').val(), $('#input_size').val(), $('#input_model').val(), $('#input_view').val(), $('#input_maker').val(), $('#input_search').val());

        event.preventDefault();
    });

    $(sScope+'.pics-scroll a').bind('click', function(event) {
        event.preventDefault();
        var ul = $(this).closest('.pics').find('ul');

        if ($(this).hasClass('prev')) {
            ul.children('li').last().prependTo(ul);
        }
        else {
            ul.children('li').first().appendTo(ul);
        }
    });

    $(sScope+'.pics-list a').bind('click', function(event) {
        event.preventDefault();

        var pic = $(this).closest('li[data-id]').find('.pic img');
        pic.attr('src', $(this).find('img').attr('src')).attr('width', '').attr('height', '');

        $('.pics-list li').removeClass('active');
        $(this).closest('li').addClass('active');
    });

    $(sScope+'.add2cart').bind('click', function (event) {

        var prod_el = $(this).closest('[data-id]');

        if ($(prod_el).length > 0) {
            var id = $(prod_el).attr('data-id');
            cnt = ($(prod_el).find('input[name=cnt]').length>0) ? $(prod_el).find('input[name=cnt]').val() : 1;
            xajax_products_UsersCategoryView_put(id, cnt, getFeats(id));
        }

        event.preventDefault();
    });

    $(sScope+' .product-info .add2bron').bind('click', function (event) {

        var prod_el = $(this).closest('[data-id]');

        if ($(prod_el).length > 0) {
            var id = $(prod_el).attr('data-id');
            cnt = ($(prod_el).find('input[name=cnt]').length>0) ? $(prod_el).find('input[name=cnt]').val() : 1;
            xajax_products_UsersCategoryView_put(id, cnt, getFeats(id), 'bron');
        }

        event.preventDefault();
    });


    $(sScope+'span.favs-del').bind('click', function(event) {
        event.preventDefault();
        var id = $(this).closest('li').attr('data-id');
        xajax_products_UsersProductView_fav(id, 'off', true);
    });

    $(sScope+'a.favs-link').bind('click', function(event) {
        event.preventDefault();

        var id = $(this).attr('data-id');

        if ($(this).hasClass('del')) {
            var bFav = ($(this).closest('ul.prods.favs').length>0) ? true : false;
            xajax_products_UsersProductView_fav(id, 'off', bFav);
        }
        else {
            xajax_products_UsersProductView_fav(id, 'on', false);
        }

    });

}

function getFeats(id)
{
    var aFeats = Array();
    $("[data-id='"+id+"'] input[name^='feature['").each(function (idx, el) {
        aFeats.push({
            'feat_id': $(el).attr('name').replace('feature[', '').replace(']', ''),
            'fval_id': $(el).val()
        });
    });

    return aFeats;
}

function set_calcs(ship_id, pay_way)
{
    $('.calcs').removeClass('show');
    $('.calcs.ship'+ship_id).addClass('show');

    $(".calcs [class *= 'pay_way_']").removeClass('show');
    $('.calcs .pay_way_'+pay_way).addClass('show');
}

function confirmSubmit(event, msg)
{
    var agree = confirm(msg);
    if (agree)
        return true;
    else {
        event.returnValue = false;
        return false ;
    }
}

function sh_form_row(sInpName, sShow)
{
    var row_id = get_Obj('row-'+sInpName);
    if (!row_id) {
        return false;
    }
    else {
        row_id.style.display = sShow
    }

    var row_id2 = get_Obj('row-'+sInpName+'2');
    if (row_id2) {
        row_id2.style.display = sShow
    }

    var row_id_error = get_Obj('row-'+sInpName+'-error');
    if (row_id_error) {
        row_id_error.style.display = sShow
    }

    var row_id_notes = get_Obj('row-'+sInpName+'-notes');
    if (row_id_notes) {
        row_id_notes.style.display = sShow
    }

    return true;
}

function get_Obj(objID)
{
    if (document.getElementById(objID)) {return document.getElementById(objID);}
    else if (document.all) {return document.all[objID];}
    else if (document.layers) {return document.layers[objID];}
}
