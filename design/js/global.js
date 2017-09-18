Block = function (sSelector, sBlock)
{
    if (sBlock == undefined) {
        sBlock = sSelector.substr(1);
    }

    this.block_selector = sSelector;
    this.element_selector = sSelector+' .'+sBlock+'__';
    this.block = sBlock;
    this.element_prefix = sBlock+'__';
};

Block.prototype.getBlock = function(sSelectorMore) {
    if (sSelectorMore == undefined) {
        sSelectorMore = '';
    }
    return $(this.block_selector + sSelectorMore);
}

Block.prototype.getElem = function(sName) {
    return $(this.element_selector + sName);
}

Block.prototype.be = function(sName) {
    return this.element_prefix + sName;
}

function isMobile()
{
    if (!($(window).width() >= 768 || $.cookie('is_full_version')==1)) {
        return true;
    }

    return false;
}

function is_control_key(key_code)
{
    // http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    if (key_code >= 9 && key_code<=40) {
        return true;
    }

    return false;
}

var Typing = {
    interval : 500,
    lastKeypress : null,
    interceptKeypress : function(sText) {
        this.sText = sText;
        this.lastKeypress = new Date().getTime();
        var that = this;
        setTimeout(function() {
            var currentTime = new Date().getTime();
            if(currentTime - that.lastKeypress > that.interval) {
                that.stopTypingCallback(sText);
            }
        }, that.interval + 100);
    }
}

$(document).ready(function() {
  /* General */

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    $('body').addClass('touch');
  }
  else {
    $('body').addClass('no-touch'); // no-touch
  }

  var bMobile = isMobile();

  $(".full-version").bind('click', function (event) {
    $.cookie('is_full_version', 1, {expires:1, path: '/'});
  });

  $('.mobile-version').bind('click', function (event) {
    $.removeCookie("is_full_version", {path: '/'});
  });

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

  /*
  bind_counter();

  $('.topcat-toggle .navbar-brand').bind('click', function() {
    $('.topcat-toggle button').trigger('click');
  });

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
  
  // UsersFilterSide
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
  

  $('.specials-links > li > a').bind('click', function(event) {
    $('.specials-links > li').removeClass('active');
    $(this).parent().addClass('active');

    $('.specials-prods > ul').removeClass('active');
    $('.specials-prods > ul.'+$(this).parent().attr('class').replace('active', '').trim()).addClass('active');
    
    event.preventDefault();
  });
  
  // UsersCategoryView
  
  $('.sortby select, .ipp select').change(function() {
    $(this).closest('form').submit();
  });
  
  // UsersFilterSide
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
  
  // UsersProductView

  $('.product-small-pics a').bind('click', function(event) {
    if ($(this).hasClass('video')) {
      return;
    }

    var index = $(this).closest('li').attr('data-index');
    $('.product-big-pic').removeClass('active');
    $('.product-big-pic[data-index='+index+']').addClass('active');
    
    $('.product-small-pics li').removeClass('active');
    $(this).closest('li').addClass('active');
    
    event.preventDefault();
  });
  
  $('.product-related ul.prods').slick({
    adaptiveHeight: true,
    mobileFirst: true,
    arrows: true,
    responsive: [
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
        breakpoint: 579,
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
    ]
  });
    
  $('.add2cart').bind('click', function (event) {
    
    var prod_el = $(this).closest('[data-id]');
    
    if ($(prod_el).length > 0) {
      var id = $(prod_el).attr('data-id');
      cnt = ($(prod_el).find('input[name=cnt]').length>0) ? $(prod_el).find('input[name=cnt]').val() : 1;
      xajax_products_UsersCategoryView_put(id, cnt);
    }
    
    event.preventDefault();
  });

  $('.oneclick').bind('click', function (event) {
    
    var prod_el = $(this).closest('[data-id]');
    var phone = $(this).parent().find('input').val();
    var cnt = ($(prod_el).find('input[name=cnt]').length>0) ? $(prod_el).find('input[name=cnt]').val() : 1;;

    if ($(prod_el).length > 0 && phone !='' && cnt>0) {
      var id = $(prod_el).attr('data-id');
      xajax_products_UsersProductView_oneclick(id, phone, cnt);
    }
    
    event.preventDefault();
  });

  $('a.favs-link').bind('click', function(event) {
    event.preventDefault();
    
    var id = $(this).attr('id').replace('favs-link', '');
    
    if ($(this).hasClass('del')) {
      var bFav = ($(this).closest('ul.prods.favs').length>0) ? true : false;
      xajax_products_UsersProductView_fav(id, 'off', bFav);
    }
    else {
      xajax_products_UsersProductView_fav(id, 'on', false);
    }
    
  });
  
  // UsersShopCart
  bind_cart('first');

  // UsersOrderForm
  $('#order-form .ship_id select').change(function() {
    var ship_alias = $(this).val();
    
    inp_row('state', 'hide');
    inp_row('city', 'hide');
    inp_row('address', 'hide');
    inp_row('zip', 'hide');
    
    if (ship_alias == 'novaposhta') {
      inp_row('city', 'show');
      inp_row('address', 'show');
    }
    else if (ship_alias == 'ukrposhta') {
      inp_row('state', 'show');
      inp_row('city', 'show');
      inp_row('address', 'show');
      inp_row('zip', 'show');
    }

    else if (ship_alias == 'kurier') {
      inp_row('city', 'show');
      inp_row('address', 'show');
    }

    else if (ship_alias == 'samovyvoz') {
      inp_row('city', 'show');
    }

    else if (ship_alias == 'manager') {
        
    }

  });

  $('#order-form .ship_id select').trigger('change');  
*/

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
    xajax_products_UsersShopCart_upd($(this).closest('[data-num]').attr('data-num'), $(this).val());
  });
  
  if (sMode == 'next') {
    bind_counter();
  }
}

function bind_cart_side()
{
  if ($('#basket a.empty').length==0) {
    $('#basket a.prettyPhoto').prettyPhoto({
      show_title: false,
      theme: 'pp_default',
      allow_resize: false,
      social_tools: ''
    });
  }
  else {
    $('#basket a').bind('click', function(event) {
      event.preventDefault();
    });
  }
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