$(document).ready(function() {
    timer.init();
});

function BlockTimer ()
{
    Block.apply(this, arguments);
}

BlockTimer.prototype = Object.create(Block.prototype);
BlockTimer.prototype.constructor = BlockTimer;

BlockTimer.prototype.init = function() {
    var _ = this;


    if (_.getBlock(':not(.'+_.block+'_stopped)').length == 0) {
        return false;
    }

    setInterval(function() {
        _.getBlock(':not(.'+_.block+'_stopped)').each(function(idx, timer) {
            // Get Values
            s = parseInt(_.getElem('second1').first().text() + _.getElem('second2').first().text());
            m = parseInt(_.getElem('minute1').first().text() + _.getElem('minute2').first().text());
            h = parseInt(_.getElem('hour1').first().text()   + _.getElem('hour2').first().text());

            if (s > 0) {
                s = s - 1;
            }
            else if (m > 0) {
                s = 59;
                m = m - 1;
            }
            else if (h > 0) {
                s = 59;
                m = 59;
                h = h - 1;
            }
            else {
                s = 0;
                m = 0;
                h = 0;
                $(timer).addClass(this.block+'_stopped');
                $(timer).trigger('timer:stop');
            }

            if (m <= 9) m = '0' + m;
            if (s <= 9) s = '0' + s;
            if (h <= 9) h = '0' + h;

            _.getElem('second1').html(s.toString().substr(0,1));
            _.getElem('second2').html(s.toString().substr(1,1));

            _.getElem('minute1').html(m.toString().substr(0,1));
            _.getElem('minute2').html(m.toString().substr(1,1));

            _.getElem('hour1').html(h.toString().substr(0,1));
            _.getElem('hour2').html(h.toString().substr(1,1));
        });
    }, 1000);

};

BlockTimer.prototype.start = function() {
    this.getBlock().removeClass(this.block+'_stopped');
};

BlockTimer.prototype.stop = function() {
    this.getBlock().addClass(this.block+'_stopped');
};

timer = new BlockTimer('.timer');