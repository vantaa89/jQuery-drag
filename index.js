var numBlocks = 0;

function addBlock(){
    var block = new Block(numBlocks++);
}

function randInt(minVal, maxVal){
    return Math.floor((maxVal - minVal + 1) * Math.random()) + minVal;
}

// function handle_mousedown(e){
//     window.my_dragging = {};
//     my_dragging.pageX0 = e.pageX;
//     my_dragging.pageY0 = e.pageY;
//     my_dragging.elem = this;
//     my_dragging.offset0 = $(this).offset();
//     console.log(my_dragging.offset0);

//     function handle_dragging(e){
//         var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
//         var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
//         $(my_dragging.elem).offset({top: top, left: left});
//     }

//     function handle_mouseup(e){
//         $('body')
//         .off('mousemove', handle_dragging)
//         .off('mouseup', handle_mouseup)
//     }

//     $('body')
//     .on('mouseup', handle_mouseup)
//     .on('mousemove', handle_dragging);
// }

class Block{
    constructor(id){
        this.blockno = id;
        this.id = "block" + id;
        $('.block-container').append('<div class="block" id="' + this.id + '"> </div>');
        $('#' + this.id).css({
            'top': randInt(100, 900),
            'left': randInt(100, 1100)
        });
        var prevOffset, curOffset;
        $('#' + this.id).draggable({
            addClasses: "false",
            drag: function(e, ui){
                prevOffset = curOffset;
                curOffset = $.extend({}, ui.offset);
                return true;
            }
        });

        $('.block:not(#' + this.id + ')').droppable({
            greedy: true,
            over: function(e, ui){
                ui.helper.offset(curOffset=prevOffset).trigger('mouseup');
            },
            tolerance: "touch",
        });
    }

}