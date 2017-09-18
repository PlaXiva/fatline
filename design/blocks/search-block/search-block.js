$(document).ready(function() {
    blockSearch.init();
});

function BlockSearch ()
{
    Block.apply(this, arguments);
    this.interval = 500;
}

BlockSearch.prototype = Object.create(Block.prototype);
BlockSearch.prototype.constructor = BlockSearch;

// mixin
for(var key in Typing) BlockSearch.prototype[key] = Typing[key];

BlockSearch.prototype.init = function() {
    var _ = this;

    //_.setId();

    _.getElem('input').change(function() {

        _.getElem('input').val($(this).val());

        if ($(this).val() != '') {
            _.getElem('clear').addClass(_.be('clear_on'));
        }
        else {
            _.getElem('clear').removeClass(_.be('clear_on'));
        }
    });

    _.getElem('input').keyup(function (event) {
        $(this).trigger('change');

        if (!is_control_key(event.keyCode)) {
            _.getElem('input').addClass(_.be('input_loading'));
            _.interceptKeypress($(this).val()); // calls stopTypingCallback
        }
    });

    _.getElem('clear').bind('click', function(event) {
        event.preventDefault();
        _.clear();
    });

    _.init_open_hide();

    return true;
};

BlockSearch.prototype.clear = function() {
    this.getElem('input').val('').trigger('change').removeClass(this.be('input_loading'));
    this.getElem('results').removeClass(this.be('results_on'));
};

BlockSearch.prototype.stopTypingCallback = function (sText) {
    //xajax_products_UsersProductView_search(sText); // => blockSearch.setResult(sHtml);
    this.setResult(sText);
};

BlockSearch.prototype.setResult = function (sRes) {
    this.getElem('results').addClass(this.be('results_on')).html(sRes);
    this.getElem('input').removeClass(this.be('input_loading'));
    return true;
};

var blockSearch = new BlockSearch('.search-block');
