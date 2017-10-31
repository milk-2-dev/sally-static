/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

/** * Request Animation Frame Polyfill. * @author Tino Zijdel * @author Paul Irish * @see https://gist.github.com/paulirish/1579671 */ ;(function() {var lastTime = 0; var vendors = ['ms', 'moz', 'webkit', 'o']; for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']; window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame']; } if (!window.requestAnimationFrame) {window.requestAnimationFrame = function(callback, element) {var currTime = new Date().getTime(); var timeToCall = Math.max(0, 16 - (currTime - lastTime)); var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall); lastTime = currTime + timeToCall; return id; }; } if (!window.cancelAnimationFrame) {window.cancelAnimationFrame = function(id) {clearTimeout(id); }; } }());

/**
 *	Filename: scripts.js
 *
 *	Contains all main Javascript for the template
 */

(function($, window, document){

    $(document).ready(function(){

        /********************************
         GLOBAL VARIABLES
         ********************************/

            // Window Object and Window Variables
        var $window = $(window),
            $document = $(document),
            window_w = $window.width(),
            window_h = $window.height(),
            window_s = $window.scrollTop();

        // Update variables on resize
        $window.on('load resize', function(){
            window_w = $window.width();
            window_h = $window.height();
            window_s = $window.scrollTop();

            stickyFooter(); // Enable Sticky Footer
        });

        // Update scrollTop on scroll
        $window.on('scroll', function(){
            window_s = $window.scrollTop();
        });

        // Global Elements
        var $html = $('html'),
            $body = $('body');

        // Splendid Main Variables
        var splendidVars = {
            fixedHeader: false,
            stickyHeader:false,
            headerHeight: 0,
            supportTransforms: ($html.hasClass('csstransforms')) ? true : false,
            supportTransitions: ($html.hasClass('csstransitions')) ? true : false
        }

        // Calling Functions when the document is fully loaded
        $window.on('load', function(){

            // enableParallax(); // Enable Prallax BG
            //
            // parallaxBg(); // Enable parallax Background

            animatedIcons(); // Enable Animated Icons
        });

        // Format Number With Commas
        function formatNumberWithCommas(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // Format Number With Spaces
        function formatNumberWithSpaces(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }

        // Format Counter String For Animations
        function formatCounterAnimator(x){
            return x.toString().replace(/(\d)/g, '<span class="counter-animator"><span class="animator-value">$1</span></span>');
        }

        // inView Function
        $.fn.inView = function(inViewType){
            var viewport = {};
            viewport.top = $(window).scrollTop();
            viewport.bottom = viewport.top + $(window).height();
            var bounds = {};
            bounds.top = this.offset().top;
            bounds.bottom = bounds.top + this.outerHeight();
            switch(inViewType){
                case 'bottomOnly':
                    return ((bounds.bottom <= viewport.bottom) && (bounds.bottom >= viewport.top));
                case 'topOnly':
                    return ((bounds.top <= viewport.bottom) && (bounds.top >= viewport.top));
                case 'both':
                    return ((bounds.top >= viewport.top) && (bounds.bottom <= viewport.bottom));
                default:
                    return ((bounds.top >= viewport.top) && (bounds.bottom <= viewport.bottom));
            }
        };


        /********************************
         THEME FEATURES
         ********************************/

        //smoothScroll(1.3, 220); // Smooth Scroll

        enableFullWidth(); // Full Width Sections

        enableFullHeight(); // Full Height Sections

        stickyFooter(); // Enable Sticky Footer

        textBlockAnimation(); // Enable Text Block Animation

        megaMenu(); // Enable Mega Menu

        menuItemsDelay(); // Enable transform delay for menu items

        //horParallax(); // Enable Horizontal Background Parallax

        shopBoxParallax(); // Enable Shop box parallax

        enableMobileNav(); // Mobile Navigation

        enableFixedHeader(); // Fixed Header

        enableStickyHeader(); // Sticky Header

        enableStickyElement(); // Sticky Element

        enableHeaderNav(); // Header Navigation

        //productsMatchHeight(); // Init producsts list match height

        blogMatchHeight(); // Blog Match Height

        revealAnimation(); // Enable Reveal Animation

        enableSectionNav(); // Section Nav

        enableTooltips(); // Tooltips

        //enableFlexslider(); // Flexsliders

        enableOwlCarousel(); // Carousels

        //enableTabs(); // Tabs

        //enableAccordions(); // Accordions

        enableCounters(); // Counters, Circular Counters, Progressbars

        //enableAudioPlayer(); // Audio Player

        //modalInit(); // Init Modal

        //activePanr(); // Enable Panr

        enablePrettyPhoto(); // Lightbox Plugin

        enableAjaxLoadMore(); // Ajax Load More Posts

        enableMixItUp(); // MixItUp Filtering Plugin

        enableIsotope(); // Masonry/Filtering Plugin

        enableGoogleMaps(); // Google Maps

        enableComingSoonCounter(); // Coming Soon Counter

        enableRaty(); // Jquery Rating Plugin

        qtyStepper(); // Woocommerce number inputs

        wcPostPerPage(); // Woocommerce posts per page support

        //moveDown(); // Move Down

        //backToTop(); // Enable back to top button


        /********************************
         FUNCTIONS
         ********************************/

        function smoothScroll(scrollTime, scrollDistance){

            var scrollTime = scrollTime;			//Scroll time
            var scrollDistance = scrollDistance;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll

            if (navigator.userAgent.indexOf('Mac OS X') != -1 || navigator.userAgent.indexOf('Firefox') > -1 || navigator.userAgent.indexOf('MSIE') > -1 || navigator.appVersion.indexOf('Trident/') > -1) {
                return false;
            } else {
                $window.on("mousewheel DOMMouseScroll", function(event){

                    event.preventDefault();

                    var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
                    var scrollTop = $window.scrollTop();
                    var finalScroll = scrollTop - parseInt(delta*scrollDistance);

                    TweenMax.to($window, scrollTime, {
                        scrollTo : { y: finalScroll, autoKill:true },
                        ease: Expo.easeOut,	//For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
                        autoKill: true,
                        overwrite: 5
                    });

                });
            }

        };


        /**
         *	Full Height Sections (.full-height)
         */

        // Enables Full Width Sections
        function enableFullHeight(){
            initFullHeight();
            $window.on('load resize', function(){
                initFullHeight();
            });
        }

        // Initializes Fullwidth Sections
        function initFullHeight(){
            var pageHeading = $('.page-heading.full-height'),
                mainHeader = $('#header'),
                pageHeadingOffset;
            if (mainHeader.length) {
                if (mainHeader.css('position') != 'absolute') {
                    pageHeadingOffset = mainHeader.outerHeight();
                } else {
                    pageHeadingOffset = 0;
                };
            };
            $('.full-height').not('.page-heading').each(function(){
                var element = $(this),
                    elementPT = parseInt(element.css('padding-top'), 10),
                    elementPB = parseInt(element.css('padding-bottom'), 10),
                    elementPaddings = elementPT + elementPB,
                    offsetElement = element.attr('data-offset-element');

                if (typeof offsetElement !== typeof undefined && offsetElement !== false) {
                    element.height(window_h - $(offsetElement).outerHeight() - elementPaddings);
                    return;
                } else {
                    element.height(window_h - elementPaddings);
                };
            });
            if (window_w >= 768) {

                pageHeading.each(function() {
                    var $this = $(this),
                        pT = parseInt($this.css('padding-top'), 10),
                        pB = parseInt($this.css('padding-bottom'), 10),
                        paddings = pT + pB;
                    $this.height(window_h - paddings - pageHeadingOffset);
                });
            };
        };


        /**
         *	Full Width Sections (.full-width)
         */

        // Enables Full Width Sections
        function enableFullWidth(){
            initFullWidth();
            $window.on('load resize', function(){
                initFullWidth();
                if (window_w >= 991) {
                    megaMenu();
                };
            });
            $window.on('resize', function(){
                if (window_w >= 991) {
                    if ($('.dropdown-inner').length && $body.hasClass('headerstyle7') == false) {
                        $('.dropdown-inner').css({
                            'display': 'block',
                            'visibility': 'hidden'
                        });
                        $('#primary-nav').find('.menu-item-has-children:not(.megamenu)').find('.mn-sub').css({
                            'display': 'block',
                            'visibility': 'hidden'
                        });
                        setTimeout(function(){
                            $('.dropdown-inner').slideUp();
                        }, 100);
                    };
                };
                menuItemsDelay();
            });
        }

        // Initializes Fullwidth Sections
        function initFullWidth(){
            if(!$body.hasClass('b_1170') && !$('.content-with-sidebar').length){
                $('.full-width, .upsells.products, .related.products').each(function(){
                    var element = $(this),
                        element_x;

                    // Reset Styles
                    element.css('margin-left', '');
                    element.css('width', '');

                    // Set New Styles
                    element.css('margin-left', -element.offset().left + 'px');
                    element.css('width', window_w + 'px');

                });
            }
        };


        // Background Parallax Init
        // function enableParallax() {
        //     var parallaxDiv = $('<div />').addClass('parallax-bg'),
        //         parallaxEl = $('.section.parallax-bg');
        //
        //     if (parallaxEl.length) {
        //         parallaxEl.each(function() {
        //             var $this = $(this),
        //                 parallaxRatio = $this.attr('data-stellar-ratio'),
        //                 offsetH = $this.attr('data-stellar-horizontal-offset'),
        //                 offsetV = $this.attr('data-stellar-vertical-offset'),
        //                 background = $this.css('background-image');
        //             parallaxDiv.clone().prependTo($this);
        //             $this.children('.parallax-bg').attr({
        //                 'data-stellar-ratio': parallaxRatio,
        //                 'data-stellar-horizontal-offset': offsetH,
        //                 'data-stellar-vertical-offset': offsetV
        //             })
        //                 .css('background-image', background)
        //                 .end()
        //                 .removeAttr('data-stellar-ratio')
        //                 .removeAttr('data-stellar-horizontal-offset')
        //                 .removeAttr('data-stellar-vertical-offset')
        //             // .css({'background-image': 'none', 'background-color': 'transparent'});
        //         });
        //     };
        // };
        // function parallaxBg(){
        //     $('div.parallax-bg').fadeIn('fast');
        //     if ( window_w >= 992 ) {
        //         $.stellar({
        //             horizontalOffset: 0,
        //             verticalOffset: 0,
        //             positionProperty: 'transform',
        //             responsive: true,
        //             hideDistantElements: false
        //         });
        //     };
        // };

        function textBlockAnimation() {
            var el = $('.text-block.animateme');

            if (el.length) {
                el.each(function() {
                    $(this).parent().addClass('scrollme');
                });
                setTimeout(function(){
                    scrollme.on_resize();
                }, 200);
            };
        };

        function moveDown() {
            var el = $('.move-down'),
                mainContent = $('#splendid-main-container').offset().top;

            el.on('click', function(event) {
                event.preventDefault();
                TweenMax.to($window, 1, {scrollTo:{y: mainContent}, ease:Power3.easeOut});
            });
        };

        // Horizontal Parallax
        function horParallax() {

            var el = $('.hor-parallax');

            if (el.length) {
                el.each(function() {
                    var $this = $(this),
                        bgImg = $this.css('background-image'),
                        parallaxEl = $('<div class="hor-parallax-el layer" data-depth="0.50"></div>');

                    parallaxEl.prependTo($this);

                    var horParallaxEl = $this.find('.hor-parallax-el');
                    horParallaxEl.css('background-image', bgImg);

                    $this.css('background-image', '');

                    $this.parallax({
                        limitY: 1,
                        scalarX: 10,
                        scalarY: 0,
                        originY: 1.0
                    });
                });
            };
        };

        /* Megamenu */
        function megaMenu() {
            var el = $('.megamenu'),
                headerContainer,
                headerW,
                mainNav = $('#main-nav');

            if ($body.hasClass('headerstyle7') == false && $('.dropdown-inner').length && window_w >= 991) {
                if ($('#main-header').find('.container').length) {
                    headerContainer = $('.container').first();
                } else {
                    headerContainer = $('#main-header');
                };
                headerW = headerContainer.width(),
                    containerOffset = headerContainer.offset().left;

                el.each(function() {
                    var $this = $(this),
                        dropdown = $this.children('.dropdown-inner'),
                        dropdownW = dropdown.width(),
                        offset;
                    if (dropdown.children('.mn-sub').children('li').length <= 3) {
                        if ((dropdownW + dropdown.offset().left) >= (headerW + containerOffset)) {
                            dropdown.css({'left': '', 'right': ''});
                            dropdown.css({'left': 'auto', 'right': 0});
                            offset = (dropdownW - (headerW + containerOffset));
                        } else {
                            offset = dropdownW - $this.offset().left + containerOffset;
                            dropdown.css({'left': '', 'right': ''});
                            dropdown.css({'left': -(offset) + 'px', 'right': 'auto'});
                        };
                    } else {
                        if ($('body:not(.b_1170) #header.header-full-width').length) {
                            dropdown.css({
                                'right': ''
                            });
                            dropdown.css({
                                'right': window_w - (mainNav.offset().left + mainNav.width() + 30)
                            });
                            if (window_w <= 1299) {

                                dropdown.css({
                                    'right': '',
                                    'left': ''
                                });
                                dropdown.css({
                                    'width': window_w - 30,
                                    'right': 15,
                                    'left': -($('.navigation').offset().left - 30)
                                });
                            };
                        } else if ($('#header.header5').length) {
                            offset = $('.container:first-child').offset().left - containerOffset - 15;
                            dropdown.css({
                                'width': '',
                                'left': ''
                            });
                            dropdown.css({
                                'width': headerW,
                                'left': -(offset)
                            });
                        } else {
                            offset = $('.navigation').offset().left - containerOffset - (parseInt(headerContainer.css('padding-left'),10)) - 15;
                            dropdown.css({
                                'width': '',
                                'left': ''
                            });
                            dropdown.css({
                                'width': headerW,
                                'left': -(offset)
                            });
                        };
                    };
                });
            };
        };


        /**
         *	Add Transform Delay to Menu items
         */

        function menuItemsDelay() {
            var primaryNav = $('#primary-nav'),
                navItems = primaryNav.find('.menu-item-has-children');

            if (navItems.not('.megamenu').find('.mn-sub').length) {
                navItems.not('.megamenu').find('.mn-sub').each(function() {
                    var $this = $(this);
                    if (($this.width() + $this.offset().left) >= $(window).width()) {
                        $this.addClass('drop-to-left');
                    }
                });
            };
            if (primaryNav.length && $body.hasClass('headerstyle7') == false && window_w >= 992) {
                navItems.on('mouseenter', function() {
                    var $this = $(this);
                    $this.children('.mn-sub').hide().css('visibility', 'visible').stop().slideDown(300);
                    if ($this.hasClass('megamenu') == true) {
                        $this.children('.dropdown-inner').css('visibility', 'visible').stop().slideDown(300);
                    };
                }).on('mouseleave', function() {
                    var $this = $(this);
                    $this.children('.mn-sub').stop().slideUp(200, function(){$this.children('.dropdown-inner').css('visibility', 'hidden')});
                    if ($this.hasClass('megamenu') == true) {
                        $this.children('.dropdown-inner').stop().slideUp(200, function(){$this.children('.dropdown-inner').css('visibility', 'hidden')});
                    };
                });
            } else if (window_w <= 991) {
                navItems.off();
            };
            // navItems.find('.dropdown-inner').slideUp();
        }


        /**
         *	Mobile Navigation (#main-nav)
         */

        // Enables Full Width Sections
        function enableMobileNav(){
            initMobileNav();
        }

        // Initializes Mobile Navigation
        function initMobileNav(){
            var $mainNav = $('#main-nav');
            if($mainNav.length){

                var $menuButton = $('#mobile-menu-button'),
                    $mainNavMenu = $mainNav.find('.menu'),
                    $navItems = $mainNav.find('.menu li'),
                    $navParentItems = $navItems.filter(function(){
                        return $(this).find('ul').length;
                    });

                // Menu Button
                $menuButton.on('click', function(){
                    $menuButton.toggleClass('active');
                    $mainNavMenu.slideToggle(600, function(){
                        if($(this).css('display') == 'none') $(this).css('display', '');
                        $navItems.removeClass('dropdown-active');
                        $mainNav.find('ul ul').css('display','');
                    });
                });

                // Dropdown Icons
                $navParentItems.each(function(){
                    $(this).append('<div class="dropdown-icon"><span></span></div>');
                });

                // Dropdown Event
                $mainNav.find('.dropdown-icon').on('click', function(){
                    if ($(this).parents('.megamenu').length) {
                        $(this).parent().toggleClass('dropdown-active').find('.dropdown-inner').slideToggle(600, function(){
                            if($(this).css('display') == 'none') $(this).css('display', '');
                        });
                    } else {
                        $(this).parent().toggleClass('dropdown-active').find('>ul').slideToggle(600, function(){
                            if($(this).css('display') == 'none') $(this).css('display', '');
                        });
                    };
                });

            }
        }


        /**
         *	Fixed Header (body.headerfixed)
         */

        // Enables Fixed Header
        function enableFixedHeader(){
            initFixedHeader();
            toggleFixedHeader();
            $(window).on('load scroll resize', toggleFixedHeader);
        }

        // Initializes Fixed Header
        function initFixedHeader(){
            splendidVars['fixedHeader'] = ($body.hasClass('headerfixed') ? true : false);
        }

        // Toggle Fixed Header
        function toggleFixedHeader(){
            var header = $('#header');
            if(header.length && splendidVars['fixedHeader']){
                var header_h = header.height();

                if(!header.hasClass('fixed-header'))
                    splendidVars['headerHeight'] = header_h;

                header_h = splendidVars['headerHeight'];
                if(window_s > header_h){
                    header.addClass('fixed-header').removeClass('not-fixed');;
                    if(header.css('position') == 'fixed' && !header.hasClass('header6') && !header.hasClass('header7')) $body.css('padding-top', header_h + 'px');
                }else{
                    header.removeClass('fixed-header').addClass('not-fixed');
                    if(!header.hasClass('header6')) $body.css('padding-top', '');
                }
            }else{
                header.addClass('not-fixed');
            }
        }


        /**
         *	Sticky Header (body.headersticky)
         */

        // Enables Sticky Header
        function enableStickyHeader(){
            initStickyHeader();
            $(window).on('load scroll', toggleStickyHeader);
            $(window).on('resize', resetStickyHeader);
        }

        // Initializes Sticky Header
        function initStickyHeader(){
            splendidVars['stickyHeader'] = ($body.hasClass('headersticky') ? true : false);
            var header = $('#header');
            if(header.length && splendidVars['stickyHeader'] && !header.hasClass('header7')){

                // Set Header Vars
                var header_h = header.height(),
                    header_top = header.offset().top;
                $body.data('headerHeight', header_h);
                $body.data('headerTop', header_top);

                // Initialize Header Placeholder
                header.after('<div id="header-placeholder-space"></div>');

            }
        }

        // Toggle Sticky Header
        function toggleStickyHeader(){
            var header = $('#header');
            if(header.length && splendidVars['stickyHeader']){
                var header_h = parseInt($body.data('headerHeight')),
                    header_top = parseInt($body.data('headerTop')),
                    headerPlaceholder = $('#header-placeholder-space');

                if(window_s >= header_top){
                    header.addClass('just-fixed-header');
                    headerPlaceholder.height(header_h);
                }else{
                    header.removeClass('just-fixed-header');
                    headerPlaceholder.height(0);
                }
            }
        }

        // Reset Sticky Header
        function resetStickyHeader(){
            var header = $('#header'),
                headerPlaceholder = $('#header-placeholder-space');
            if(header.length && splendidVars['stickyHeader']){

                // Disable Sticky Header
                header.removeClass('fixed-header');
                headerPlaceholder.height(0);

                // Reset Header Vars
                var header_h = header.height(),
                    header_top = header.offset().top;
                $body.data('headerHeight', header_h);
                $body.data('headerTop', header_top);

                // Reenable Sticky Header
                toggleStickyHeader();

            }
        }


        /**
         *	Sticky Element (.sticky-element)
         */

        // Enables Sticky Element
        function enableStickyElement(){
            initStickyElement();
            $(window).on('load scroll', toggleStickyElement);
            $(window).on('resize', resetStickyElement);
        }

        // Initializes Sticky Element
        function initStickyElement(){
            $('.sticky-element').each(function(){
                var stickyEl = $(this);

                // Set Element Vars
                var stickyElH = stickyEl.height(),
                    stickyElT = stickyEl.offset().top;
                stickyEl.data('elementHeight', stickyElH);
                stickyEl.data('elementTop', stickyElT);

                // Initialize Element Placeholder
                stickyEl.after('<div class="sticky-element-placeholder"></div>');
            });
        }

        // Toggle Sticky Element
        function toggleStickyElement(){
            $('.sticky-element').each(function(){
                var stickyEl = $(this);

                var stickyElH = parseInt(stickyEl.data('elementHeight')),
                    stickyElT = parseInt(stickyEl.data('elementTop')),
                    stickyElPlaceholder = stickyEl.next('.sticky-element-placeholder');

                if(window_s >= stickyElT){
                    stickyEl.addClass('sticky-element-active');
                    stickyElPlaceholder.height(stickyElH);
                }else{
                    stickyEl.removeClass('sticky-element-active');
                    stickyElPlaceholder.height(0);
                }
            });
        }

        // Reset Sticky Element
        function resetStickyElement(){
            $('.sticky-element').each(function(){
                var stickyEl = $(this);
                var stickyElPlaceholder = stickyEl.next('.sticky-element-placeholder');

                // Disable Sticky Header
                stickyEl.removeClass('sticky-element-active');
                stickyElPlaceholder.height(0);

                // Reset Header Vars
                var stickyElH = stickyEl.height(),
                    stickyElT = stickyEl.offset().top;
                stickyEl.data('elementHeight', stickyElH);
                stickyEl.data('elementTop', stickyElT);

                // Reenable Sticky Header
                toggleStickyElement();

            });
        }



        /**
         *	Header Navigation (#main-nav)
         */

        // Enables Header Navigation
        function enableHeaderNav(){
            initHeaderNav();
        }

        // Initializes Header Navigation
        function initHeaderNav(){

            // Sideheader Dropdowns
            initSideheaderDropdown();

            // Onpage Links
            initOnPageLinks();

        }

        // Initializes Sideheader Dropdowns
        function initSideheaderDropdown(){
            var $sideheader = $('#sideheader');
            if($sideheader.length){

                // Perfect Scrollbar
                $sideheader.perfectScrollbar({
                    suppressScrollX: true,
                    includePadding: true
                });

                // Dropdown
                var $nav = $('#main-nav'),
                    $nav_items = $nav.find('li');

                $nav_items.on('mouseenter', function(){
                    if(window_w > 991){
                        var nav_item = $(this);
                        nav_item.addClass('hovered')
                        setTimeout(function(){
                            if (nav_item.hasClass('megamenu') == true) {
                                nav_item.children('.dropdown-inner').css('visibility', 'visible').stop().slideDown(800, function(){
                                    $sideheader.perfectScrollbar('update');
                                });
                            } else {
                                if(nav_item.hasClass('hovered')) nav_item.find('>ul').slideDown(800, function(){
                                    $sideheader.perfectScrollbar('update');
                                });
                            };
                        }, 400);
                    }
                })
                    .on('mouseleave', function(){
                        if(window_w > 991){
                            var nav_item = $(this);
                            nav_item.removeClass('hovered');
                            setTimeout(function(){
                                if (nav_item.hasClass('megamenu') == true) {
                                    nav_item.children('.dropdown-inner').stop().slideUp(400, function(){nav_item.children('.dropdown-inner').css('visibility', 'hidden');$sideheader.perfectScrollbar('update');});
                                } else {
                                    if(!nav_item.hasClass('hovered')) nav_item.find('>ul').slideUp(400, function(){
                                        $sideheader.perfectScrollbar('update');
                                    });
                                };
                            }, 1200);
                        }
                    });

            }
        }

        // Initialize OnPage Links
        function initOnPageLinks(){
            var $nav = $('#main-nav, .section-nav');
            if($nav.length){
                $nav.find('a[href*="#"]:not([href="#"])').on('click', function(e){
                    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                        e.preventDefault();
                        var link = $(this),
                            target = $(this.hash),
                            target = target.length ? target : $('[name=' + this.hash.slice(1) +']'),
                            targetTop = target.offset().top,
                            delta = Math.abs(targetTop - window_s),
                            duration;

                        if($body.hasClass('headerfixed') || $body.hasClass('headersticky')){
                            targetTop = targetTop - $('#header').height();
                        }

                        duration = delta / 3;
                        if(duration < 400) duration = 400;

                        if (target.length) {
                            $('body, html').animate({scrollTop: targetTop}, duration);
                        };
                    }
                });
            }
        }



        /**
         *	Header Search Form
         */
        function headerSearchForm(){
            var searchBox = $('.header-search-box'),
                searchFormTrigger = searchBox.children('a'),
                searchForm = searchBox.find('.header-search-form'),
                searchFormClose = searchBox.find('.form-close-btn');

            searchFormTrigger.on('click', function(event) {
                event.preventDefault();
                searchForm.addClass('slideDown');

                setTimeout(function(){
                    searchForm.find('input[type=text]').focus();
                }, 300);

                if ($('#sideheader').length) {
                    $('#sideheader').css('overflow', 'visible');
                };
            });
            searchFormClose.on('click', function(event) {
                event.preventDefault();
                searchForm.removeClass('slideDown');

                setTimeout(function(){
                    if ($('#sideheader').length) {
                        $('#sideheader').css('overflow', 'hidden');
                    };
                }, 500);

            });
            $(document).on('click', function(e) {
                if (!searchBox.is(e.target) // if the target of the click isn't the container...
                    && searchBox.has(e.target).length === 0 ) // ... nor a descendant of the container
                {
                    searchForm.removeClass('slideDown');

                    setTimeout(function(){
                        if ($('#sideheader').length) {
                            $('#sideheader').css('overflow', 'hidden');
                        };
                    }, 500);
                }
            });
        };
        if ( $('.header-search-box').length ) {
            headerSearchForm();
        };



        /**
         *	Section Navigation (.section-nav)
         */

        // Enables Section Navigation
        function enableSectionNav(){
            initSectionNav();
            $window.resize(refreshScrollSpy);
        }

        // Initializes Section Navigation
        function initSectionNav(){
            $body.scrollspy({ target: '.section-nav'});
        }

        function refreshScrollSpy(){
            $body.scrollspy('refresh');
        }

        function revealAnimation() {

            var el = $('.wow');

            if (el.length) {
                new WOW().init();
            };
        }


        /**
         *	Woocommerce number inputs
         */

        function qtyStepper(){

            if (typeof $.fn.number != 'function') {
                return;
            }

            if ( $('input[type=number]').length ) {
                $('input[type=number]').number();
            };
        }

        /**
         * Woocommerce items match height
         */
        function productsMatchHeight() {
            var productsList = $('ul.products');

            if (productsList.length) {
                productsList.imagesLoaded(function(){
                    productsList.find('.product').matchHeight();
                });
            };
        }

        /**
         * Blog Match Height
         */
        function blogMatchHeight() {
            var blogRow = $('.no-flexbox').find('latest-post-row');

            if (blogRow.length) {
                blogRow.imagesLoaded(function(){
                    blogRow.find('.latest-post').matchHeight();
                });
            };
        }

        /**
         * Woocommerce posts per page dropdown submit
         */

        function wcPostPerPage() {

            if ( $('form.woocommerce-ordering .postsperpage').length ) {
                $('form.woocommerce-ordering .postsperpage').change( function() {
                    $(this).parent('form').submit();
                });
            };
        }


        /**
         *	Flexsliders (.flexslider)
         */

        // Enables Flexsliders
        function enableFlexslider(){
            initFlexslider();
            $window.on('load', function(){
                $window.trigger('resize');
            });
        }

        // Initializes Flexsliders
        function initFlexslider(){

            if (typeof $.fn.flexslider != 'function') {
                return;
            }

            // Initialize Home Slider
            initHomeFlexslider('.home-flexslider');

            // Initialize Gallery Slider
            initFlexGallery('.gallery-slider');

            // Initialize Posts Slider
            initFlexPosts('.posts-slider');

            // Initialize Testimonials Slider
            initFlexTestimonials('.testimonials-slider');

            // Initialize Post Gallery
            initFlexPostGallery('.post-gallery');

            // Initialize Main Flexslider
            initMainFlexslider('.main-flexslider');

        }

        // Initializes Home Flexslider
        function initHomeFlexslider(selector){
            var isStyleDots = $(selector).hasClass('style-dots');
            $(selector).flexslider({
                animation:'fade',
                animationDuration: 800,
                nextText: '',
                prevText: '',
                directionNav: !isStyleDots,
                controlNav: isStyleDots,
                smoothHeight:true
            });
        }

        // Initializes Gallery Slider
        function initFlexGallery(selector){
            $(selector).flexslider({
                animation:'slide',
                smoothHeight:true,
                directionNav:false,
                controlNav:'thumbnails'
            });
        }

        // Initializes Posts Slider
        function initFlexPosts(selector){
            $(selector).flexslider({
                animation:'fade',
                nextText: '',
                prevText: '',
                smoothHeight:true,
                controlNav:false
            });
        }

        // Initializes Testimonials Slider
        function initFlexTestimonials(selector){
            $(selector).flexslider({
                animation:'fade',
                animationDuration: 1200,
                nextText: '',
                prevText: '',
                smoothHeight:true,
                controlNav:false
            });
        }

        // Initializes Post Gallery
        function initFlexPostGallery(selector){
            $(selector).flexslider({
                animation:'slide',
                nextText: '',
                prevText: '',
                smoothHeight:true,
                start: function(){
                    refreshIsotope();
                }
            });
        }

        // Initializes Main Flexslider
        function initMainFlexslider(selector){
            $(selector).flexslider({
                animation:'slide',
                nextText: '',
                prevText: '',
                smoothHeight:true,
                animationDuration: 1000
            });
        }


        /**
         *	Shop box parallax
         */
        function shopBoxParallax() {
            var el = $('.shop-box');

            if (el.length) {
                el.each(function() {
                    var $this = $(this),
                        elImg = $this.children('img');
                    if (elImg.length) {
                        elImg.imagesLoaded(function(){
                            elImg.panr({
                                sensitivity: 30,
                                scale: false,
                                scaleOnHover: true,
                                scaleTo: 1.12,
                                scaleDuration: .5,
                                panY: true,
                                panX: true,
                                panDuration: 1.25,
                                moveTarget: $this,
                                resetPanOnMouseLeave: false
                            });
                        });
                    };
                });
            };
        };


        /* Active Panr */
        function activePanr() {
            var el = $('.panr-active');

            if (!el.length || typeof $.fn.panr != 'function') {
                return
            } else {
                el.each(function() {
                    var $this = $(this),
                        sensitivityValue = $this.attr('data-sensitivity');
                    if (sensitivityValue === null || sensitivityValue === undefined) {
                        sensitivityValue = 30;
                    };
                    $this.imagesLoaded(function(){
                        $this.find('.panr-element').panr({
                            sensitivity: sensitivityValue,
                            scale: false,
                            scaleOnHover: true,
                            scaleTo: 1.1,
                            scaleDuration: .5,
                            panY: true,
                            panX: true,
                            panDuration: 1.25,
                            moveTarget: $this,
                            resetPanOnMouseLeave: false
                        });
                    })
                });
            };
        };


        /**
         *	Owl Carousels (.sc-carousel)
         */

        // Enables Owl Carousel
        function enableOwlCarousel(){

            // Initialize Owl Carousel
            initOwlCarousel();

        }

        function initOwlCarousel(){

            /* Carousel Shortcode */
            scOwlCarousel('.sc-carousel');

        }

        // OwlCarousel Custom Content Carousel
        function scOwlCarousel(selector){
            $(selector).each(function(){

                var carousel = $(this),
                    owl_carousel = carousel.find('.owl-carousel'),
                    owl_instance,
                    max_items, tablet_items, mobile_items;

                // Max false
                (carousel.data('items')) ? max_items = carousel.data('items') : max_items = 5;

                // On Tablet
                (max_items > 1) ? tablet_items = max_items - 1 : tablet_items = 1;

                // On Mobile
                mobile_items =1;
                false
                // Initialize Carousel
                owl_carousel.owlCarousel({
                    items:max_items,
                    itemsDesktop : [1600,max_items],
                    itemsDesktopSmall : [1170,tablet_items],
                    itemsTablet: [991,tablet_items],
                    itemsMobile: [767,mobile_items],
                    slideSpeed : 400,
                    navigation : true,
                    navigationText : ["",""],
                    addClassActive : true
                });

                // Owl Instance
                owl_instance = owl_carousel.data('owlCarousel');

                if($('.carousel-nav', carousel).length){

                    // Left Arrow
                    $('.carousel-nav .carousel-prev', carousel).on('click', function(e){
                        e.preventDefault();
                        owl_instance.prev();
                    });

                    // Right Arrow
                    $('.carousel-nav .carousel-next', carousel).on('click', function(e){
                        e.preventDefault();
                        owl_instance.next();
                    });

                }

            });
        }





        /**
         *	Tabs (.tabs)
         */

        // Enables Tabs
        function enableTabs(){
            // Initialize Tabs
            initTabs('.tabs');
        }

        // Init Tabs
        function initTabs(selector){
            $(selector).each(function(){
                var tab = $(this),
                    activeTab = tab.find('.active-tab'),
                    activeTabIndex = tab.find('.tab-header .active-tab').index();

                // Set Active Tab
                if ( activeTab.length ) {
                    tab.find('.tab').hide().eq(activeTabIndex).show();
                } else {
                    tab.find('.tab').hide().first().show();
                    tab.find('.tab-header li:first-child').addClass('active-tab');
                };

                // tab.find('.tab-header li:first-child').addClass('active-tab');

                // Prevent Default
                tab.find('.tab-header li a').on('click', function(e){
                    e.preventDefault();
                });

                // Tab Navigation
                tab.find('.tab-header li').on('click', function(){
                    var tab_menu_item = $(this);
                    var target = tab_menu_item.find('a').attr('href');

                    // tab_menu_item.closest('.tabs').find('.tab').animate({opacity:0}, 200, function(){
                    // 	$(this).hide().css('opacity','');
                    // 	tab_menu_item.closest('.tabs').find(target).fadeIn(200);
                    // });
                    tab_menu_item.closest('.tabs').find('.tab').removeClass('slideOut active').animate({opacity:0}, 400, function(){
                        $(this).hide().css('opacity','');
                        tab_menu_item.closest('.tabs').find(target).fadeIn(400).addClass('active').removeClass('slideOut');
                    }).siblings('.tab').addClass('slideOut');

                    tab_menu_item.parent().find('.active-tab').removeClass('active-tab');
                    tab_menu_item.addClass('active-tab');
                });

            });
        }



        /**
         *	Accordions (.accordions)
         */

        // Enable Accordions
        function enableAccordions(){
            // Initialize Accordions
            initAccordions();
        }

        // Init Accordions
        function initAccordions(){
            $('.accordions').each(function(){

                var accordion = $(this);

                // Set First Accordion As Active
                accordion.find('.accordion-content').hide();
                if(!accordion.hasClass('toggles')){
                    accordion.find('.accordion:first-child').addClass('active').find('.accordion-content').show();
                }

                // Set Accordion Events
                accordion.find('.accordion-header').on('click', function(){

                    var accordion_header = $(this);

                    if(!accordion_header.parent().hasClass('active')){
                        // Close other accordions
                        if(!accordion_header.closest('.accordions').hasClass('toggles')){
                            accordion_header.closest('.accordions').find('.active').removeClass('active').find('.accordion-content').slideUp(300);
                        }

                        // Open Accordion
                        accordion_header.parent().addClass('active');
                        accordion_header.parent().find('.accordion-content').slideDown(300);
                    }else{
                        // Close Accordion
                        accordion_header.parent().removeClass('active');
                        accordion_header.parent().find('.accordion-content').slideUp(300);
                    }

                });

            });
        }

        function stickyFooter() {
            var el = $('#footer.style3'),
                mainContent = $('#splendid-main-container');

            if (el.length) {
                el.imagesLoaded(function() {
                    var elH = el.outerHeight();
                    $('#splendid-main-container').css('margin-bottom', elH + 'px');
                    $window.on('scroll', function() {
                        if (document.body.scrollHeight == (document.body.scrollTop + window.innerHeight)) {
                            mainContent.addClass('shadow-removed');
                        } else {
                            mainContent.removeClass('shadow-removed');
                        }
                    });
                });
            };
        }


        /**
         *	MixItUp Filtering Plugin (.mix)
         */

        // Enable MixItUp
        function enableMixItUp(){

            if (typeof $.fn.mixItUp != 'function') {
                return;
            }
            // Initializes MixItUp
            initMixItUp();
        }

        // Init MixItUp
        function initMixItUp(){

            var $sortableAccordions = $('.sortable-accordion'),
                $sortablePortfolio = $('.portfolio-sortable');

            // Destroy If Already Initialized
            if($sortableAccordions.mixItUp('isLoaded'))
                $sortableAccordions.mixItUp('destroy');
            if($sortablePortfolio.mixItUp('isLoaded'))
                $sortablePortfolio.mixItUp('destroy');

            // Sortable Accordions
            $sortableAccordions.mixItUp({
                selectors: {
                    filter: '.sortable-accordion .filter'
                },
                animation: {
                    effects: 'fade translateX(-40px) translateY(-30px)'
                }
            });

            // Sortable Accordions
            $sortablePortfolio.mixItUp({
                selectors: {
                    filter: '.portfolio-sortable .filter'
                }
            });

        }



        /**
         *	Counters (.sc-counter, .sc-circular-progressbar, .sc-progressbar)
         */

        // Enables Counters
        function enableCounters(){
            initCounters();
            $(window).on('scroll load resize', function(){
                animateCounters();
                animateProgressbar();
                animateCircularProgressbar();
            });
        }

        // Initializes Counters
        function initCounters(){

            /**
             *	Counters
             */
            $('.sc-counter').each(function(){
                var counter = $(this);
                var counterVal = counter.text(),
                    formatWithCommas = /,+/.test(counterVal),
                    formatWithSpaces = /\s+/.test(counterVal);

                // Format The Counter Value
                if(formatWithCommas)
                    counter.html(formatCounterAnimator(formatNumberWithCommas(counterVal)));
                else if(formatWithSpaces)
                    counter.html(formatCounterAnimator(formatNumberWithSpaces(counterVal)));
                else
                    counter.html(formatCounterAnimator(counterVal));

                // Init Counter Animator
                counter.find('.counter-animator').each(function(){
                    var animator = $(this);
                    var animatorValue = animator.find('.animator-value').text();

                    // Append Animator For Numbers To Each Number
                    animator.append(
                        '<div class="animator-numbers" data-value="' + animatorValue + '">' +
                        '<ul>' +
                        '<li>0</li>' +
                        '<li>1</li>' +
                        '<li>2</li>' +
                        '<li>3</li>' +
                        '<li>4</li>' +
                        '<li>5</li>' +
                        '<li>6</li>' +
                        '<li>7</li>' +
                        '<li>8</li>' +
                        '<li>9</li>' +
                        '</ul>'+
                        '</div>'
                    );
                });

            });

            /**
             *	Progressbars
             */
            $('.progressbar-width').css('width','');

            /**
             *	Circular Progressbars
             */
            $('.circular-progressbar>input').each(function() {

                var knob = $(this),
                    value = $(this).val(),
                    size = (knob.parents('.circular-progressbar').hasClass('big')) ? 230 : 150,
                    thickness =  (knob.parents('.circular-progressbar').hasClass('big')) ? 0.032 : 0.05;

                knob.wrap('<div class="circular-progressbar-inner"></div>');
                knob.parent().append('<span class="knob-percent"></span>');
                $(this).data('value', value);

                // Initialize Knob
                $(this).knob({
                    min: 0,
                    max: 100,
                    width: size,
                    height: size,
                    thickness: thickness,
                    readOnly: true,
                    displayInput : false
                });

                // Set The Start Value to 0
                $(this).val(0).trigger('change');

            });

        }

        // Animate Counters In Viewport
        function animateCounters(){
            $('.sc-counter').each(function(){

                // Variables
                var counter = $(this),
                    counter_value = counter.data('value'),
                    counter_y = counter.offset().top + counter.height(),
                    counter_animated = counter.hasClass('counter-animated');

                // Check if counter is in viewport
                if((window_s + window_h) > counter_y && !counter_animated){

                    /*var format_with_commas = /,+/.test(counter_value),
                        format_with_spaces = /\s+/.test(counter_value);

                    counter_value = parseInt(counter_value.replace(',','').replace(' ',''));
                    counter.addClass('counter-animated');

                    $({startVal:0}).animate({startVal:counter_value},
                        {
                            duration: 2000,
                            easing:'easeInQuad',
                            step: function() {
                                var val = Math.ceil(this.startVal);

                                if(format_with_commas) counter.text(formatNumberWithCommas(val));
                                else if(format_with_spaces) counter.text(formatNumberWithSpaces(val));
                                else counter.text(val);
                            },
                            complete: function(){
                                var val = Math.ceil(this.startVal);
                                if(format_with_commas) counter.text(formatNumberWithCommas(val));
                                else if(format_with_spaces) counter.text(formatNumberWithSpaces(val));
                                else counter.text(val);
                            }
                        }
                    );*/

                    // Advanced Animation
                    counter.addClass('counter-animated');
                    counter.find('.animator-numbers').each(function(){
                        var animator = $(this);
                        var value = animator.data('value') * 10;
                        if(splendidVars['supportTransforms']){
                            animator.find('ul').css({
                                'transform': 'translateY(-' + value + '%)',
                                '-webkit-transform': 'translateY(-' + value + '%)',
                                '-moz-transform': 'translateY(-' + value + '%)',
                                '-ms-transform': 'translateY(-' + value + '%)',
                                '-o-transform': 'translateY(-' + value + '%)'
                            });
                        }
                    });

                }

            });
        }

        // Animate Progressbar In Viewport
        function animateProgressbar(){
            $('.progressbar-container:not(.progressbar-animated)').each(function(){

                // Variables
                var progressbar = $(this),
                    progressbar_y = progressbar.offset().top,
                    viewport_offset = 0,
                    progressbar_width, progressbar_percent, progressbar_value;

                // Check if progressbar is in viewport
                if((window_s + window_h - viewport_offset) > progressbar_y){

                    // Get Progress bar Values
                    progressbar_width = $('.progress-width', progressbar);
                    progressbar_percent = $('.progress-percent', progressbar);
                    progressbar_value = progressbar.data('percent');

                    progressbar.addClass('progressbar-animated');

                    $({startVal:0}).animate({startVal:progressbar_value},
                        {
                            duration: 1200,
                            easing:'easeOutBack',
                            step: function() {
                                progressbar_width.css('width', Math.ceil(this.startVal)+'%');
                                progressbar_percent.html(Math.ceil(this.startVal)+'%');
                            },
                            complete: function(){
                                progressbar_width.css('width', progressbar_value+'%');
                                progressbar_percent.html(progressbar_value+'%');
                            }
                        }
                    );

                }

            });
        }

        // Animate Circular Progressbar In Viewport
        function animateCircularProgressbar(){
            $('.circular-progressbar').each(function(){

                // Variables
                var knob = $(this).find('.circular-progressbar-inner input'),
                    knob_percent = knob.parents('.circular-progressbar-inner').find('span.knob-percent'),
                    value = knob.data('value'),
                    knob_y = $(this).offset().top,
                    knob_val = parseInt(knob.data('value')),
                    knob_animated = knob.hasClass('knob-animated'),
                    viewport_offset = 0;

                // Check if knob is in viewport
                if((window_s + window_h - viewport_offset) > knob_y && !knob_animated){
                    knob.addClass('knob-animated');
                    $({startVal:0}).animate({startVal:knob_val},
                        {
                            duration: 800,
                            easing:'easeInQuad',
                            step: function() {
                                knob.val(Math.ceil(this.startVal)).trigger('change');
                                knob_percent.html(Math.ceil(this.startVal)+'<span>%</span>');
                            },
                            complete: function(){
                                knob.val(knob_val).trigger('change');
                                knob_percent.html(knob_val+'<span>%</span>');
                            }
                        }
                    );
                }

            });
        }



        /**
         *	AudioPlayer (.sc-audio-player)
         */

        // Enables AudioPlayer
        function enableAudioPlayer(){

            // Init AudioPlayer if it can be played
            var a = document.createElement('audio');
            if(!!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''))){
                initAudioPlayer();
            }
            else{
                audiojs.events.ready(function() {
                    var as = audiojs.createAll();
                });
            }
        }

        // Initializes AudioPlayer
        function initAudioPlayer(){
            $('.sc-audio-player:not(.audio-initialized)').each(function(){

                // Audio Variables
                var audio = $(this).addClass('audio-initialized').get(0);

                // On Loaded Metadata
                audio.onloadedmetadata = function(){

                    var duration = audio.duration,
                        currentTime = 0,
                        played = 0, // 0 - 100%
                        audioVolume = 0.5,
                        timelineDrag = false,
                        volumeDrag = false;

                    audio.volume = audioVolume;

                    // Initialize Template
                    $(this).after('<div class="audio-player">'+
                        '<div class="audio-option">'+
                        '<button class="audio-play-button"></button>'+
                        '</div>	'+
                        '<div class="audio-option">'+
                        '<span class="audio-current-time">00:00</span>'+
                        '</div>	'+
                        '<div class="audio-option audio-option-timeline">'+
                        '<div class="audio-timeline">'+
                        '<div class="audio-timeline-played"><div class="drag-knob"></div></div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="audio-option">'+
                        '<span class="audio-duration">00:00</span>'+
                        '</div>'+
                        '<div class="audio-option">'+
                        '<button class="audio-volume-button"></button>'+
                        '</div>'+
                        '<div class="audio-option audio-option-volume">'+
                        '<div class="audio-volume">'+
                        '<div class="audio-volume-current"><div class="drag-knob"></div></div>'+
                        '</div>'+
                        '</div>'+
                        '</div>');

                    // Refresh the masonry layout
                    refreshIsotope();

                    // Player Variables
                    var player = $(this).parent().find('.audio-player'),
                        playButton = player.find('.audio-play-button'),
                        volumeButton = player.find('.audio-volume-button'),
                        timeline = player.find('.audio-timeline'),
                        timelinePlayed = player.find('.audio-timeline-played'),
                        timelineKnob = timeline.find('.drag-knob'),
                        volume = player.find('.audio-volume'),
                        volumeCurrent = player.find('.audio-volume-current'),
                        volumeKnob = volume.find('.drag-knob'),
                        playerCurrentTime = player.find('.audio-current-time'),
                        playerDuration = player.find('.audio-duration');

                    playerCurrentTime.text(formatAudioTime(currentTime));
                    playerDuration.text(formatAudioTime(duration));

                    // Attach Player Events

                    // Play/Pause Button
                    playButton.on('click', function(){
                        if(playButton.hasClass('audio-playing')){
                            audio.pause();
                        }else{
                            audio.play();
                        }
                    });

                    // Volume Button
                    volumeButton.on('click', function(){
                        audioVolume = audio.volume;
                        if(audioVolume != 0)
                            audio.volume = 0;
                        else
                            audio.volume = 0.5;
                    });

                    // Timeline/Current Time
                    audio.ontimeupdate = function(){
                        currentTime = audio.currentTime;
                        played = currentTime/duration * 100;

                        // Update Timeline
                        timelinePlayed.css('width', played + '%');

                        // Update currentTime
                        playerCurrentTime.text(formatAudioTime(currentTime));
                    }

                    // Volume Change
                    audio.onvolumechange = function(){
                        audioVolume = audio.volume;
                        volumeCurrent.css('width', audioVolume*100 + '%')
                        if(audioVolume == 0)
                            volumeButton.addClass('volume-off');
                        else
                            volumeButton.removeClass('volume-off');
                    }

                    // On Play
                    audio.onplay = function(){
                        playButton.addClass('audio-playing');
                    }

                    // On Pause
                    audio.onpause = function(){
                        playButton.removeClass('audio-playing');
                    }

                    // On Ended
                    audio.onended = function(){
                        playButton.removeClass('audio-playing');
                    }

                    // Timeline click
                    timeline.on('click', function(e){
                        var timeline_x = timeline.offset().left,
                            timeline_w = timeline.width(),
                            mouse_x = e.pageX,
                            played = (mouse_x - timeline_x) / timeline_w * 100;

                        audio.currentTime = played/100 * duration;
                    });

                    // Volume click
                    volume.on('click', function(e){
                        var volume_x = volume.offset().left,
                            volume_w = volume.width(),
                            mouse_x = e.pageX,
                            audioVolume = (mouse_x - volume_x) / volume_w;

                        audio.volume = audioVolume;
                    });

                    // Timeline/Volume drag
                    timelineKnob.on('mousedown', function(){
                        timelineDrag = true;
                    });

                    volumeKnob.on('mousedown', function(){
                        volumeDrag = true;
                    });

                    $document.on('mousemove', function(e){
                        if(timelineDrag){
                            var timeline_x = timeline.offset().left,
                                timeline_w = timeline.width(),
                                mouse_x = e.pageX;

                            played = (mouse_x - timeline_x);
                            if(played > timeline_w) played = timeline_w;
                            else if(played < 0) played = 0;
                            played = played/timeline_w * 100;

                            audio.currentTime = played/100 * duration;
                        }
                        if(volumeDrag){
                            var volume_x = volume.offset().left,
                                volume_w = volume.width(),
                                mouse_x = e.pageX;

                            audioVolume = (mouse_x - volume_x);
                            if(audioVolume > volume_w) audioVolume = volume_w;
                            else if(audioVolume < 0) audioVolume < 0;
                            audioVolume = audioVolume/volume_w;

                            audio.volume = audioVolume;
                        }
                    });

                    $document.on('mouseup', function(){
                        timelineDrag = false;
                        volumeDrag = false;
                    });

                }


            });
        }

        // Formats Audio Time In Seconds (MM:SS)
        function formatAudioTime(time){
            var m, s;
            m = Math.floor(time/60);
            s = Math.round(time%60);
            return ((m < 10) ? '0' + m : m) + ':' + ((s < 10) ? '0' + s : s);
        }

        /**
         *	Modal Init
         */
        function modalInit(){
            $('a[class*=modal-]').on('click', function(event) {
                event.preventDefault();
                var regexp = /(modal).*?\s/gi,
                    trigger = (" " +  $(this).attr('class') + " ").match(regexp)[0];
                $('.modal#' + trigger).modal('show');
            });
        };

        /**
         *	PrettyPhoto ([rel^="prettyPhoto"])
         */

        // Enables PrettyPhoto
        function enablePrettyPhoto(){

            if (typeof $.fn.prettyPhoto != 'function') {
                return;
            }
            initPrettyPhoto();
        }

        // Initializes PrettyPhoto
        function initPrettyPhoto(){
            $("a[data-gal^='prettyPhoto']").prettyPhoto({
                default_width: window_w,
                default_height: window_h,
                theme: 'facebook',
                hook: 'data-gal'
            });
        }




        /**
         *	Isotope
         */

        // Enables Isotope
        function enableIsotope(){

            if (typeof $.fn.isotope != 'function') {
                return;
            }

            initIsotope();
            $(window).load(function(){
                refreshIsotope();
            });
        }

        // Initializes Isotope
        function initIsotope(){

            var $container = $('.isotope-sortable');

            $container.each(function(){
                var that = $(this),
                    $isotope = that.find('.isotope-container'),
                    isMasonry = $isotope.hasClass('isotope-masonry');

                // Hide Isotope While Initializing
                $isotope.css('opacity', 0);

                // Initialze Isotope
                if(isMasonry){
                    $isotope = $isotope.isotope({
                        itemSelector: '.isotope-item',
                        masonry: {
                            columnWidth: '.masonry-column',
                            gutter: 0
                        }
                    });
                }else{
                    $isotope = $isotope.isotope({
                        itemSelector: '.isotope-item',
                        isInitLayout: false
                    });
                }

                // Bind Resize
                $isotope.isotope('bindResize');

                // Filtering
                that.find('.filter').on('click', function() {
                    var filterValue = $(this).data('filter');
                    $(this).addClass('active').siblings().removeClass('active');
                    $isotope.isotope({ filter: filterValue });
                });

                // On Layout Complete
                $isotope.isotope( 'once', 'layoutComplete', function(isoInstance) {
                    $isotope.animate({opacity:1}, 800);
                });

            });

            // Isotope Shortcode
            var $scContainer = $('.sc-isotope');
            $scContainer.each(function(){
                var $isotope = $(this),
                    isMasonry = $isotope.hasClass('isotope-masonry');

                // Hide Isotope While Initializing
                $isotope.css('opacity', 0);

                // Initialze Isotope
                if(isMasonry){
                    $isotope = $isotope.isotope({
                        itemSelector: '.isotope-item',
                        masonry: {
                            columnWidth: '.masonry-column',
                            gutter: 0
                        }
                    });
                }else{
                    $isotope = $isotope.isotope({
                        itemSelector: '.isotope-item',
                        isInitLayout: false
                    });
                }

                // Bind Resize
                $isotope.isotope('bindResize');

                // Filtering
                $isotope.parent().find('.filter').on('click', function() {
                    var filterValue = $(this).data('filter');
                    $(this).addClass('active').siblings().removeClass('active');
                    $isotope.isotope({ filter: filterValue });
                });

                // On Layout Complete
                $isotope.isotope( 'once', 'layoutComplete', function(isoInstance) {
                    $isotope.animate({opacity:1}, 800);
                });

            });

        }

        // Refresh Isotope Layout
        function refreshIsotope(){
            $('.isotope-container').isotope();
            $('.sc-isotope').isotope();
            $('.isotope-container').isotope('layout');
            $('.sc-isotope').isotope('layout');
        }

        function animatedIcons() {
            var el = $('.content-box.style12');
            if (el.find('.icon-container').length) {
                el.each(function(i){
                    var $this = $(this),
                        iconContainer = $this.find('.icon-container').css('opacity', 1),
                        animationDelay = iconContainer.data('animation-delay'),
                        obj = $this.find('object');
                    obj.attr('id','icon-container-' + i);
                    var svgContext = $this.find('object')[0].contentDocument,
                        strokeColor = svgContext.createElementNS('http://www.w3.org/2000/svg', 'style');
                    strokeColor.textContent = 'svg, svg path { stroke: ' + iconContainer.data('stroke-color') + '; }';
                    svgContext.getElementById("Layer_1").appendChild(strokeColor);
                    var animatedIcon = new Vivus(obj.attr('id'), {type: $(this).find('.icon-container').data('animation-type'), duration: 100, start: 'manual'});
                    $(window).on('scroll', function() {
                        if ($this.inView('topOnly') == true) {
                            setTimeout(function(){
                                animatedIcon.play();
                            }, animationDelay);
                        };
                    });
                });
            };
        };

        /**
         *	Google Maps
         */
        function enableGoogleMaps(){

            $('.sc-google-map').each(function(){

                // Get Map Settings
                var element = $(this),
                    elementNative = element.get(0),
                    address = '',
                    zoom = element.data('zoom'),
                    customMarker = element.data('custom-marker'),
                    latitude = Number(element.data('latitude')),
                    longitude = Number(element.data('longitude')),
                    grayscaleEffect = element.data('grayscale') == 'yes' ? true : false;

                // Adjust Zoom  
                zoom = (zoom > 20 || zoom < 1) ? 14 : zoom;

                // Geocoder
                var geocoder = new google.maps.Geocoder(),
                    mapOptions = {
                        scrollwheel: false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        center: new google.maps.LatLng(latitude, longitude),
                        zoom: zoom
                    },
                    map = new google.maps.Map(elementNative, mapOptions);

                if (grayscaleEffect === true) {
                    var map_styles = [{
                        featureType: "all",
                        elementType: "all",
                        stylers: [
                            { saturation: -100 }
                        ]
                    }];
                    var mapType = new google.maps.StyledMapType(map_styles, { name:"Grayscale" });
                    map.mapTypes.set('grayscale_map', mapType);
                    map.setMapTypeId('grayscale_map');
                }

                var mapCenter = new google.maps.LatLng(latitude, longitude);

                geocoder.geocode({"latLng": mapCenter}, function(results, status) {
                    if(status == google.maps.GeocoderStatus.OK)
                    {
                        result = results[0].geometry.location;
                        map.setCenter(result);

                        // Marker Options
                        var markerOptions = {
                            position: result,
                            map: map,
                            title: address
                        }

                        // CustomMarker Icon
                        if(customMarker != ''){
                            markerOptions.icon = customMarker;
                        }

                        // Initialize Marker
                        var marker = new google.maps.Marker(markerOptions);
                    }
                });

            });

        }




        /**
         *	Coming Soon Counter
         */
        function enableComingSoonCounter(){
            $('.coming-soon-counter').each(function(){
                var el = $(this),
                    todayDate = new Date(),
                    countDate = new Date(el.data('countdate')),
                    $days = el.find('.c-days'),
                    $hours = el.find('.c-hours'),
                    $minutes = el.find('.c-minutes'),
                    $seconds = el.find('.c-seconds');

                var dif = countDate.getTime() - todayDate.getTime();

                // Start Counter
                if(dif > 0){
                    updateComingSoonCounter();
                    var counterInterval = setInterval(function(){
                        updateComingSoonCounter();
                    },1000);
                }else{
                    $days.text(0);
                    $hours.text(0);
                    $minutes.text(0);
                    $seconds.text(0);
                }

                // Update Coming Soon Counter
                function updateComingSoonCounter(){
                    todayDate = new Date();

                    var daysDif = getDaysDifference(todayDate, countDate),
                        hoursDif = getHoursDifference(todayDate, countDate),
                        minutesDif = getMinutesDifference(todayDate, countDate),
                        secondsDif = getSecondsDifference(todayDate, countDate);

                    if(secondsDif > 0){

                        // Fix Seconds, Minutes And Hours
                        secondsDif -= minutesDif * 60;
                        minutesDif -= hoursDif * 60;
                        hoursDif -= daysDif * 24;

                        // Update The Counters
                        $days.text(daysDif);
                        $hours.text(hoursDif);
                        $minutes.text(minutesDif);
                        $seconds.text(secondsDif);

                    }else{
                        clearInterval(counterInterval);

                        // Update The Counters
                        $days.text(0);
                        $hours.text(0);
                        $minutes.text(0);
                        $seconds.text(0);
                    }
                }

                // Get Floored Difference In Days Between Two Dates
                function getDaysDifference(now, then){
                    return Math.floor((then.getTime() - now.getTime()) / (1000*60*60*24));
                }

                // Get Floored Difference In Hours Between Two Dates
                function getHoursDifference(now, then){
                    return Math.floor((then.getTime() - now.getTime()) / (1000*60*60));
                }

                // Get Floored Difference In Minutes Between Two Dates
                function getMinutesDifference(now, then){
                    return Math.floor((then.getTime() - now.getTime()) / (1000*60));
                }

                // Get Floored Difference In Seconds Between Two Dates
                function getSecondsDifference(now, then){
                    return Math.floor((then.getTime() - now.getTime()) / (1000));
                }

            });
        }


        /*------------------------------------------
        Back To Top
        ------------------------------------------*/
        function backToTop() {
            var el = $('.back-to-top'),
                revSlider = $('.rev_slider_wrapper'),
                offset;

            if (el.length) {
                if (revSlider.length) {
                    revSlider.imagesLoaded(function() {
                        offset = revSlider.height();
                    });
                } else {
                    offset = window_h / 2;
                };
                $window.on('scroll', function() {
                    if ($window.scrollTop() >= offset) {
                        el.addClass('slideIn');
                    } else {
                        el.removeClass('slideIn');
                    };
                });
                el.on('click', function(event) {
                    event.preventDefault();
                    TweenMax.to($window, 1.5, {scrollTo:{y: 0}, ease:Power3.easeOut});
                });
            };
        };


        /**
         *	Tooltips (.tooltip-ontop, .tooltip-onleft, .tooltip-onright, .tooltip-onbottom)
         */

        // Enables Tooltips
        function enableTooltips(){
            initTooltips();
        }

        // Initializes Tooltips
        function initTooltips(){
            // Tooltip on TOP
            $('.tooltip-ontop').tooltip({placement: 'top'});

            // Tooltip on BOTTOM
            $('.tooltip-onbottom').tooltip({placement: 'bottom'});

            // Tooltip on LEFT
            $('.tooltip-onleft').tooltip({placement: 'left'});

            // Tooltip on RIGHT
            $('.tooltip-onright').tooltip({placement: 'right'});
        }




        /**
         *	AJAX Load More (#blog-load-more)
         */

        // Enable AJAX Load More
        function enableAjaxLoadMore(){
            initAjaxLoadMore();
        }

        // Initializes Ajax Load More
        function initAjaxLoadMore(){

            // Blog Ajaxfy
            splendidAjaxfy({
                button: '#blog-load-more',
                postWrapper: '#blog-wrapper',
                postItem: '.isotope-item'
            });

            splendidAjaxfy({
                button: '#latest-blog-load-more',
                postWrapper: '.latest-post-row',
                postItem: '.latest-post'
            });

            // Portfolio Ajaxfy
            splendidAjaxfy({
                button: '#portfolio-load-more',
                postWrapper: '.portfolio-container',
                postItem: '.isotope-item'
            });

        }

        function splendidAjaxfy(args){
            var ajaxButton = args.button,
                postWrapper = args.postWrapper,
                postItem = args.postItem;

            $(ajaxButton).on('click', function(e){

                e.preventDefault();

                // Variables
                var element = $(this),
                    target = element.attr('href'),
                    loadingTextOrg = element.html(),
                    loadingText = element.data('loading-text'),
                    $postWrapper = $(postWrapper);

                // Loading Text
                if(loadingText == 'spinner') element.html('<i class="fa fa-spinner fa-pulse"></i>');
                else element.html(loadingText);

                // Run AJAX
                $.ajax({
                    type: 'GET',
                    url: target,
                    success: function(data, textStatus, XMLHttpRequest) {

                        // Store New Data
                        var newPostItems = $(data).find(postWrapper + ' ' + postItem),
                            nextPageUrl = $(data).find(ajaxButton).attr('href');

                        // Update Load More Button Href
                        if (nextPageUrl) element.attr('href', nextPageUrl);
                        else element.parent().slideUp();

                        // Add New Items
                        $postWrapper.isotope();
                        newPostItems.imagesLoaded(function(){
                            $postWrapper.append(newPostItems).isotope('appended', newPostItems);
                            $postWrapper.isotope('layout');
                        })

                        // Post Gallery
                        initFlexPostGallery('.post-gallery');

                        // Audio Player
                        initAudioPlayer();

                        // PrettyPhoto
                        initPrettyPhoto();

                        // Trigger Resize To Fix Responsive Issues
                        $(window).trigger('resize');

                    },
                    complete: function() {
                        element.html(loadingTextOrg);
                    },
                    error: function(MLHttpRequest, textStatus, errorThrown){
                        alert(errorThrown);
                    }
                });

            });
        }




        /**
         *	Jquery Raty
         */
        function enableRaty(){

            if (typeof $.fn.raty != 'function') {
                return;
            }


            initRaty();
        }

        // Initializes Raty
        function initRaty(){
            var wp_vars = {"template_url":"http:\/\/splendidwp.staging.wpengine.com\/wp-content\/themes\/splendid"};
            $('.raty-rating').raty({
                readOnly: true,
                path: wp_vars.template_url + '/img/raty',
                score: function(){
                    return $(this).data('score');
                }
            })
        }


    }); // End Of Document Ready

})(jQuery, this, document);

var s = $("#ex2").slider();

s.on("slide", function (val) {
    console.log(val);
    $('#actualValue').html(val.value[0] + ' - ' + val.value[1]);
});