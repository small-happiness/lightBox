(function ($) {
    $.fn.showBox = function (settings) {
        settings = $.extend({
            /*遮罩层配置*/
            overlayBgColor: '#000',		//遮罩层背景色
            overlayOpacity: 0.8,    // 遮罩透明度
            /*功能按钮配置*/
            imageBtnPrev: 'images/lightbox-btn-prev.gif',
            imageBtnNext: 'images/lightbox-btn-next.gif',
            imageBtnClose: 'images/lightbox-btn-close.gif',
            imageBlank: 'images/lightbox-blank.gif',
            // 配置图片盒子容器的参数
            containerBorderSize: 10,			//边框的圆角半径
            containerResizeSpeed: 400,		// 图片切换时重绘的速度
            containerPadding: 10
        }, settings);

        var jQueryMatchedObj = []; //存储对象数组
        $(this).each(function () {
            jQueryMatchedObj.push($(this).find('img'));
        });

        var imageArr = []; //存放图片数组对象(路径和文字)
        var imageActive = 0; //指示当前图片

        /*
         * 初始化插件
         *
         * */
        function _init() {
            var clicked = $(this).find('img');
            //传入当前对象和数组对象
            _start(clicked, jQueryMatchedObj);
        }

        function _start(objClicked, jQueryMatchedObj) {
            _set_interface();

            //取得图片数组数据（路径和备注文字）
            for (var i = 0,max=jQueryMatchedObj.length; i < max; i++) {
                imageArr.push({
                    src: jQueryMatchedObj[i].attr('src'),
                    alt: jQueryMatchedObj[i].attr('alt')
                });
            }
            //确定当前点击的是哪一张图片
            while (imageArr[imageActive].src !== objClicked.attr('src')) {
                imageActive++;
            }
            _set_image_show();
        }

        /*
         * 设置初始样式
         * */
        function _set_interface() {
            $('body').append('<div id="showBox-showUp"></div><div id="showBox-box"><div class="showBox-picShow"><div class="showBox-picShow-pic"><img src="photos/image1.jpg" alt=""></div><div class="showBox-picShow-prev"><img src="'+settings.imageBtnPrev+'" alt=""></div><div class="showBox-picShow-next"><img src="'+settings.imageBtnNext+'" alt=""></div></div><div id="showBox-alt"><p></p></div><div id="showBox-box-close"><img src="'+settings.imageBtnClose+'"></div></div>');
            $('#showBox-alt').css({'margin-top':'10px','margin-bottom':'10px'});

            $('#showBox-showUp').on('click', function () {
                _finish();
            });

            $('#showBox-box-close').click(function () {
                _finish();
            });

            $('.showBox-picShow-next').on('click', next);
            $('.showBox-picShow-prev').on('click', prev);
        }

        function _set_image_show() {
            var img = $('.showBox-picShow-pic img'),
                text =  $('#showBox-alt p');
            //先将图片去掉，在重新开始，否则图片效果不佳
            img.attr('src','');
            text.html('');

            // $('#showBox-alt').css({'opacity':'0','transition': 'all .5s'});
            img.css({'opacity':'0','transition': 'all .5s'})
                .attr('src', imageArr[imageActive].src);
            text.html(imageArr[imageActive].alt);

            $('#showBox-box').animate({
                width:img[0].width,
                height:img[0].height
            },400);
            img.css({'opacity':'1','transition': 'all .5s .5s'});
            // $('#showBox-alt').css({'opacity':'1','transition': 'all .5s'});
        }

        function next() {
            imageActive = (imageActive<imageArr.length-1) ? ++imageActive : 0;
            _set_image_show();
        }

        function prev() {
            imageActive = (imageActive > 0) ? --imageActive : (imageArr.length - 1);
            _set_image_show();
        }

        function _finish() {
            $('#showBox-box').remove();
            $('#showBox-showUp').remove();
        }

        // 加载时候添加事件绑定，解除绑定是为了防止多次绑定带来的冲突
        return this.off('click').on('click', _init);
    }
})(jQuery);