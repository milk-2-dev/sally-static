/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */



function setAgeAuditory(){
    var s = $("#ageAuditory").bootstrapSlider();

    if(s != undefined){
        s.on("change", function (val) {
            $('#actualValue').html(val.value.newValue[0] + ' - ' + val.value.newValue[1]);
        });
    }
}

//setAgeAuditory();

function setReach(){
    var s = $("#setReach").bootstrapSlider();
    var viewCost = $("#setReach").attr('data-view-value');

    if(s != undefined){
        s.on("change", function (val) {
            $('#setReachViews span').html(val.value.newValue);
            $('#setReachMany span').html(val.value.newValue * viewCost);
        });
    }
}

//setReach();

function changeHeiht(e){

    console.log('modal id - '+e);
    var modalId = $('#'+ e);
    var modalHeader = modalId.find('.modal-header');
    var modalFooter = modalId.find('.modal-footer');

    var modalHeaderHeight = modalHeader.outerHeight(true);

    // console.log('modalHeaderHeight - '+modalHeaderHeight);

    var modalFooterHeight = modalFooter.outerHeight(true);

    // console.log('modalFooterHeight - '+modalFooterHeight);
    //
    // console.log('window height - '+$(window).height());

    var modalMargin = 40; // margin: 20px 0;

    var modalBodyOverflowHeight = $(window).height() - modalFooterHeight - modalHeaderHeight - modalMargin;

    // console.log('modalBodyOverflowHeight - '+modalBodyOverflowHeight);


    modalId.find('.modal-body__overflow').css('height', modalBodyOverflowHeight);
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
        var text = $(this).find('.post-title').html();
        var result;

        if(Number(text.length) > 45 ){
            result = text.slice(0,30);
            result += '...';
        }

        $(this).find('.post-title').html(result);
    });
}

function lookForModal(e, id){

    if(e){
        var change = changeHeiht(e.currentTarget.id);
    }
    else{
        var change = changeHeiht(id);
    }
}

$(document).on('hide.bs.modal','.modal', function (e) {
    $('.modal-backdrop').remove();
})


$(document).ready(function() {
    function responsive() {

        $(document).on('shown.bs.modal','.modal', function (e) {
            lookForModal(e, false);
        })

        if($('.modal').hasClass('show')){
            var id = $('.modal.show').attr('id');
            lookForModal(false, id);
        }



        var myWidth = $('body').innerWidth();

        if (myWidth < 768) {

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

                // $(document).on('shown.bs.modal','.modal', function (e) {
                //     lookForModal(e, false);
                // })
                //
                // if($('.modal').hasClass('show')){
                //     var id = $('.modal.show').attr('id');
                //     lookForModal(false, id);
                // }

                cropText();
            }

            var makePad = heightMobMenu();

            makePad.set();

        } else {
            if (!$('body').hasClass("desctop")) {

                $(".custom-posts .owl-carousel").trigger('destroy.owl.carousel');
                $('body').removeClass("mobile");
                $('body').addClass("desctop");

                $('.message-set-reach').find('.message-reach__views').after($('.message-reach__costs'));
                $('.custom-posts').find('.row').html($('.owl-carousel'));

                // $(document).on('shown.bs.modal','.modal', function (e) {
                //     lookForModal(e, false);
                // })
                //
                // if($('.modal').hasClass('show')){
                //     var id = $('.modal.show').attr('id');
                //     lookForModal(false, id);
                // }

                var makePad = heightMobMenu();

                makePad.reset();

            }
        }
    }

    responsive();

    $(window).resize(function () {
        responsive();
    });
});