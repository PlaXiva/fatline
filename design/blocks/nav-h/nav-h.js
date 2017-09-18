$(document).ready(function() {
    blockNav_h.init();
});

function BlockNav_h ()
{
    Block.apply(this, arguments);
}

BlockNav_h.prototype = Object.create(Block.prototype);
BlockNav_h.prototype.constructor = BlockNav_h;

BlockNav_h.prototype.init = function() {
    var _ = this;

    _.init_open_hide();
    return true;
};

var blockNav_h = new BlockNav_h('.nav-h_xs', 'nav-h');
