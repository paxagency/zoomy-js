(function ($) {
    $.fn.zoomy = function(urls, options) {
        if(!urls) return;
        if(!Array.isArray(urls)) urls = [urls];
        if(!options) options = {};
        if(urls.length<2) options.thumbHide=1;
        if(options.height || options.width) {
            var st = (options.height) ? 'height:'+options.height+'px;' : '';
            if(options.width) st+='width:'+options.width+'px;';
            this.attr('style',st);
        }
        if(!this.hasClass('zoom')) this.addClass('zoom');
        if(options.thumbRight || options.thumbLeft) this.addClass('zoom-right');
        if(options.thumbLeft) this.addClass('zoom-left');
        var h = '<div class="zoom-main"><span class="zoom-mousemove" style="background-image: url('+urls[0]+')">';
        h+='<img src="'+urls[0]+'" /></span></div>';
        if(!options.thumbHide) {
            h+="<div class='zoom-thumb'>";
            $.each(urls,function(i,url){
                h+="<a class='zoom-click' data-url='"+url+"' ><img src='"+url+"' /></a>";
            });
            h+="</div>";
        }
        if(options.thumbHide) this.addClass('zoom-thumb-hide');
        this.html(h);
        this.find('.zoom-mousemove').on('mousemove',function(e){
            var zoomer = e.currentTarget;
            e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
            e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
            x = offsetX/zoomer.offsetWidth*100
            y = offsetY/zoomer.offsetHeight*100
            zoomer.style.backgroundPosition = x + '% ' + y + '%';
        });
        this.find('.zoom-click').on('click',function(){
            var main = $(this).parent().parent().find('.zoom-main > span')
            $(main).attr('style',"background-image: url("+$(this).attr('data-url')+")");
            $(main).find('img').attr('src',$(this).attr('data-url'));
        });
    };
}(jQuery));