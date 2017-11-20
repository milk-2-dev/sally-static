/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */



function setAgeAuditory(){
    var s = $("#ageAuditory").slider();

    if(s != undefined){
        s.on("change", function (val) {
            console.log(val);
            $('#actualValue').html(val.value.newValue[0] + ' - ' + val.value.newValue[1]);
        });
    }
}

setAgeAuditory();

function setReach(){
    var s = $("#setReach").slider();
    var viewCost = $("#setReach").attr('data-view-value');

    if(s != undefined){
        s.on("change", function (val) {
            $('#setReachViews span').html(val.value.newValue);
            $('#setReachMany span').html(val.value.newValue * viewCost);
        });
    }
}

setReach();

function changeHeiht(e){
    var modalFooterHeight = $('#'+ e).find('.modal-footer').outerHeight(true);

    var modalBodyOverflowHeight = $(window).height() - modalFooterHeight - 120;

    return {
        set: function(e2, e3){
            $('#'+ e).find('.'+ e2).css('max-height', modalBodyOverflowHeight);
            $('#'+ e).find('.'+ e3).css('max-height', modalBodyOverflowHeight);
        },

        reset: function(e2, e3){
            $('#'+ e).find('.'+ e2).css('max-height', '100%');
            $('#'+ e).find('.'+ e3).css('max-height', '100%');
        }
    }
}


function heightMobMenu() {
    var  h = $('.mobile-menu').outerHeight(true);

    return {
        set: function(value) {
            $('body').css('padding-bottom', h);
        },

        reset: function() {
            $('body').css('padding-bottom', '0');
        }
    };
}

function cropText(){
    $('.sc-blog-post').each(function() {
        var text = $(this).find('.post-title a').html();
        var result;

        if(Number(text.length) > 45 ){
            result = text.slice(0,30);
            result += '...';
        }

        $(this).find('.post-title a').html(result);
    });
}

$(document).ready(function() {
    function responsive() {
        var myWidth = $('body').innerWidth();

        if (myWidth < 768) {

            if($('.modal').hasClass('show')){
                var modalId = $('.modal.show').attr('id');
                var change = changeHeiht(modalId);

                console.log(modalId);

                change.set('modal-body__overflow', 'modal-body__overflow');

                if(modalId == 'messagePreview'){
                    change.reset('message-article', 'message-list');
                }
            }

            if (!$('body').hasClass("mobile")) {

                var owl = $(".custom-posts .owl-carousel").owlCarousel({
                    center: true,
                    items: 1,
                    slideSpeed: 500,
                    autoplay: true,
                    autoplayTimeout: 4500,
                    loop: true,
                    mouseDrag: true,
                    singleItem: true,
                    dots: false,
                    margin: 0,
                    dotsData: false,
                    nav: false,
                    //autoHeight:true,
                    responsive:{
                        0:{
                            items:1,
                            stagePadding: 20
                        },
                        480:{
                            items:1,
                            stagePadding: 80
                        }
                    }
                }).data('owlCarousel');

                $('body').removeClass("desctop");
                $('body').addClass("mobile");

                $('.message-set-reach').find('.modal-title').after($('.message-reach__costs'));
                $('.custom-posts').find('.container').after($('.owl-carousel'));

                //initialize change height for modal content
                $('.modal').on('shown.bs.modal', function (e) {
                    var change = changeHeiht(e.currentTarget.id);

                    change.set('modal-body__overflow', 'modal-body__overflow');

                    if(e.currentTarget.id == 'messagePreview'){
                        change.reset('message-article', 'message-list');
                    }
                })

                cropText();
            }

            var makePad = heightMobMenu();

            makePad.set();

        } else {
            if (!$('body').hasClass("desctop")) {

                $(".custom-posts .owl-carousel").trigger('destroy.owl.carousel');
                // $(".custom-posts .owl-carousel").css('display','flex');
                $('body').removeClass("mobile");
                $('body').addClass("desctop");

                $('.message-set-reach').find('.message-reach__views').after($('.message-reach__costs'));
                $('.custom-posts').find('.row').html($('.owl-carousel'));

                //initialize change height for modal content
                $('.modal').on('shown.bs.modal', function (e) {
                    var change = changeHeiht(e.currentTarget.id);
                    console.log('from more ' + e.currentTarget.id);

                    change.set('modal-body__overflow', 'modal-body__overflow');

                    if(e.currentTarget.id == 'messagePreview'){
                        change.set('message-article', 'message-list');
                        change.reset('modal-body__overflow', 'modal-body__overflow');
                    }
                })

                if($('.modal').hasClass('show')){
                    var modalId = $('.modal.show').attr('id');
                    var change = changeHeiht(modalId);

                    change.set('modal-body__overflow', 'modal-body__overflow');

                    if(modalId == 'messagePreview'){
                        change.set('message-article', 'message-list');
                        change.reset('modal-body__overflow', 'modal-body__overflow');
                    }
                }

                var makePad = heightMobMenu();

                makePad.reset();

            }
        }
    }

    responsive();

    $(window).resize(function () {
        responsive();
    });

    $('.modal').on('shown.bs.modal', function(){
        // $('#iframeTest').load(function(){
            $('#iframeTest').attr('scrolling', 'no');
        // });
    })
});