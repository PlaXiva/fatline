$(document).ready(function() {
    blockPhones.init();
});

function BlockPhones ()
{
    Block.apply(this, arguments);
}

BlockPhones.prototype = Object.create(Block.prototype);
BlockPhones.prototype.constructor = BlockPhones;

BlockPhones.prototype.init = function() {
    var _ = this;

    _.init_open_hide();
    return true;
};

var blockPhones = new BlockPhones('.phones_xs', 'phones');
