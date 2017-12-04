//Opening Modals

function openSignIn(){
    var modalId = $('.modal.show').attr('id');
    $('#'+modalId).modal('hide');
    $('#signUp').modal('show');
    $('#signUp').on('shown.bs.modal', function(){
        $('body').addClass('modal-open');
    });
}


function setAgeAuditory(){
    var s = $("#ageAuditory").bootstrapSlider();

    if(s != undefined){
        s.on("change", function (val) {
            $('#actualValue').html(val.value.newValue[0] + ' - ' + val.value.newValue[1]);
        });
    }
}

setAgeAuditory();

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

setReach();

function changeHeiht(e){
    var modalId = $('#'+ e);
    var modalHeader = modalId.find('.modal-header');
    var modalFooter = modalId.find('.modal-footer');
    var modalHeaderHeight = modalHeader.outerHeight(true);
    var modalFooterHeight = modalFooter.outerHeight(true);
    var modalMargin = 20; // margin: 20px 0;

    var modalBodyOverflowHeight = $(window).height() - modalFooterHeight - modalHeaderHeight - modalMargin;

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
        var text = $(this).find('.post-title').text();
        var textArr = text.split(' ');
        var symbolLength = 0;
        var resultText ='';

        if(text.length > 40){
            textArr.forEach(function(item, i, arr) {

                if(symbolLength < 40){
                    symbolLength += item.length+1;

                    resultText += item+' ';
                }
            });

            resultText = resultText.trim();
            resultText += '...';
        }
        else{
            resultText = text;
        }

        $(this).find('.post-title').html(resultText);
    });
}

function lookForModal(e){
    if(typeof(e) == 'object'){
        changeHeiht(e.currentTarget.id);
    }
    else{
        changeHeiht(e);
    }
}

scrollToTop=0;

$(document).on('scroll', function (e) {

    scrollToTop = $(window).scrollTop();

})


// $(document).on('hide.bs.modal','.modal', function (e) {
//     $('.modal-backdrop').remove();
// })
//
$(document).on('shown.bs.modal','.modal', function (e) {
    actualHeight = scrollToTop ;

    //console.log('actualHeight '+actualHeight);

    $('.modal-open').css({
        'top': actualHeight* (-1),
        'position': 'fixed',
        'width': '100%'
    });
})

$('#messagePreviewEdit').on('hidden.bs.modal', function(){
    $('body').addClass('modal-open');

    $('.modal-open').css({
        'top': actualHeight* (-1),
        'position': 'fixed',
        'width': '100%'
    });
})

$(document).on('hide.bs.modal','.modal', function (e) {
    $('body').css({
        'top': 'auto',
        'position': 'relative',
        'width': '100%'
    });

    $(window).scrollTop(actualHeight);
})


$(document).ready(function() {
    function responsive() {

        $(document).on('shown.bs.modal','.modal', function (e) {
            lookForModal(e);
        })

        if($('.modal').hasClass('show')){
            var id = $('.modal.show').attr('id');
            lookForModal(id);
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

	  /////////////test progress

    function userBarStatus(){
        var statusValue = $('.skill__circle').attr('data-value');
        $('.skill__circle .skill__circle_progress').css('stroke-dashoffset', 100 - statusValue);
    }

	  userBarStatus();


	// $('#my-awesome-dropzone').Dropzone( {
	// 	previewTemplate: document.querySelector('#preview-template').innerHTML,
	// 	parallelUploads: 2,
	// 	thumbnailHeight: 120,
	// 	thumbnailWidth: 120,
	// 	maxFilesize: 3,
	// 	filesizeBase: 1000,
	// 	thumbnail: function(file, dataUrl) {
	// 		if (file.previewElement) {
	// 			file.previewElement.classList.remove("dz-file-preview");
	// 			var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
	// 			for (var i = 0; i < images.length; i++) {
	// 				var thumbnailElement = images[i];
	// 				thumbnailElement.alt = file.name;
	// 				thumbnailElement.src = dataUrl;
	// 			}
	// 			setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
	// 		}
	// 	}
	//
	// });

	Dropzone.options = {
		previewTemplate: document.querySelector('#preview-template').innerHTML,
		//parallelUploads: 2,
        addRemoveLinks: true,
		thumbnailHeight: 150,
		thumbnailWidth: 150,
        paramName: 'file',
        maxFilesize: 2, // MB
        maxFiles: 1,
        dictDefaultMessage: 'Drag an image here to upload, or click to select one',
		thumbnail: function(file, dataUrl) {
			if (file.previewElement) {
				file.previewElement.classList.remove("dz-file-preview");
				var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
				for (var i = 0; i < images.length; i++) {
					var thumbnailElement = images[i];
					thumbnailElement.alt = file.name;
					thumbnailElement.src = dataUrl;
				}
				setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
			}
		},
        init:function(){
            var self = this;
            // config
            self.options.addRemoveLinks = true;
            self.options.dictRemoveFile = "Delete";
            //New file added
            self.on("addedfile", function (file) {
                console.log('new file added ', file);
            });
            // Send file starts
            self.on("sending", function (file) {
                console.log('upload started', file);
                $('.meter').show();
            });

            // File upload Progress
            self.on("totaluploadprogress", function (progress) {
                console.log("progress ", progress);
                $('.roller').width(progress + '%');
            });

            self.on("queuecomplete", function (progress) {
                $('.meter').delay(999).slideUp(999);
            });

            // On removing file
            self.on("removedfile", function (file) {
                console.log(file);
            });
        }
	};

});