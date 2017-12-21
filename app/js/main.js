/// detect user device and browser
var md = new MobileDetect(window.navigator.userAgent);
$('html').addClass(md.userAgent());
///

///some settings for dropzone
Dropzone.autoDiscover = false;
///


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

enableFixedHeader();

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
    var  menuHeight = $('.mobile-menu').outerHeight(true);

    return {
        set: function(value) {
            $('body').css('padding-bottom', menuHeight);
        },

        reset: function() {
            $('body').css('padding-bottom', '0');
        }
    };
}

// function cropText(){
//     $('.sc-blog-post').each(function() {
//         var text = $(this).find('.post-title').text();
//         var textArr = text.split(' ');
//         var symbolLength = 0;
//         var resultText ='';
//
//         if(text.length > 40){
//             textArr.forEach(function(item, i, arr) {
//
//                 if(symbolLength < 40){
//                     symbolLength += item.length+1;
//
//                     resultText += item+' ';
//                 }
//             });
//
//             resultText = resultText.trim();
//             resultText += '...';
//         }
//         else{
//             resultText = text;
//         }
//
//         $(this).find('.post-title').html(resultText);
//     });
// }

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

$(document).on('shown.bs.modal','.modal', function (e) {
    actualHeight = scrollToTop ;
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

function removeTab(){
	return {
		moveForMob: function(){
			if ($('.modal-emulation-workspace').length) {
			    console.log('enter');
				var formCustomBlock = $('.modal-emulation-workspace .small-block .form-custom');
				var secondTab = $('#settingsTab .wrap-for-mobile');
				var orderBlock = $('.modal-emulation-options .order-button');

				$(orderBlock).appendTo('.mobile-menu');
				$(formCustomBlock).appendTo('#prevForm');
				//$('a[aria-controls="audienceTab"]').removeClass('show active');
				$('a[href="#prevForm"]').tab('show');
				$(secondTab).appendTo('#audienceTab');

			}
		},

		moveBack: function(){
			var formCustomBlock = $('#prevForm .form-custom');
			var parentBlock = $('.modal-emulation-workspace .small-block');
			var secondTab = $('#audienceTab .wrap-for-mobile');
            var orderBlock = $('.mobile-menu .order-button');

            $(orderBlock).appendTo('.modal-emulation-options');
			$(formCustomBlock).appendTo(parentBlock);

			$('a[href="#audienceTab"]').tab('show');
			$(secondTab).appendTo('#settingsTab');

		}
	}
}

function savingActivate(block){
    var savingBlock = $('body').find(block);
    var headerHeight = $('.modal-emulation-head').outerHeight(true);

    savingBlock.css({
        'top': headerHeight,
        'opacity': '1'
    });

    function func() {
        savingBlock.css({
            'top': '0',
            'opacity': '0'
        });
    }

    setTimeout(func, 3500);
}

function changeFormTitle(elem){
    var text = $(elem).attr('data-name');
    $('body').find('.main-form__menu-title').html(text);
}


function modalEmulation(device){
    var modalEmulationBlock = $('.modal-emulation');
    var modalEmulationHeader = modalEmulationBlock.find('.modal-emulation-head');
    var modalEmulationBody = modalEmulationBlock.find('.modal-emulation-body');
    var modalEmulationHeaderHeight = modalEmulationHeader.outerHeight(true);
    var mobileMenuHeight = $('.mobile-menu').outerHeight(true);
    var windowHeight = $(window).height();

    if(device == 'mobile'){
        var modalEmulationBodyHeight = windowHeight - modalEmulationHeaderHeight - mobileMenuHeight;
    }

    else if(device == 'desctop'){
        var modalEmulationBodyHeight = windowHeight - modalEmulationHeaderHeight;
    }

    modalEmulationBody.css('height', modalEmulationBodyHeight);
}


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

                //('.message-set-reach').find('.modal-title').after($('.message-reach__costs'));
                $('.custom-posts').find('.container').after($('.owl-carousel'));

                //cropText();

                if ($('#myAwesomeDropzone').length) {

                    // var dropzone = new Dropzone('#myAwesomeDropzone', {
                    //     url: '/',
                    //     previewTemplate: document.querySelector('#preview-template').innerHTML,
                    //     parallelUploads: null,
                    //     thumbnailHeight: 307,
                    //     thumbnailWidth: 548,
                    //     thumbnailMethod: 'crop',
                    //     maxFilesize: 3,
                    //     filesizeBase: 1000,
                    //     maxFiles: 1,
                    //     addRemoveLinks: true,
                    //     dictRemoveFile: "<i class='fa fa-close' aria-hidden='true'></i>",
                    //     dictDefaultMessage: "<i class='fa fa-5x fa-picture-o' aria-hidden='true'></i> <br/><br/><span class='button bg-blue small btn-round color-white min_w_250 margin_r_0'>Choose a file</span>",
                    //
                    //     init: function() {
                    //         this.on("addedfile", function(file) {
                    //             $('button[form="myAwesomeDropzone"]').removeClass('disabled');
                    //             $('#myAwesomeDropzone').css('poiter-event', 'none');
                    //             $('.dz-progress').css('display', 'none');
                    //             $('.form-upload .dropzone').css('border', 'none');
                    //             $('.form-upload .dropzone').removeClass('empty');
                    //             validateOrder('#formToValidateOrder', '#validateOrder');
                    //         });
                    //
                    //         this.on("removedfile", function(file) {
                    //             $('button[form="myAwesomeDropzone"]').addClass('disabled');
                    //             $('.form-upload .dropzone').css('border', '2px dashed #8f29fc');
                    //             $('.form-upload .dropzone').addClass('empty');
                    //             validateOrder('#formToValidateOrder', '#validateOrder');
                    //         });
                    //
                    //         this.on("maxfilesexceeded", function(file){
                    //             this.removeAllFiles();
                    //             this.addFile(file);
                    //         });
                    //     }
                    // });

                }
                removeTab().moveForMob();

                $('.message-article article').after($('.message-set-reach')) //move block like in https://projects.invisionapp.com/share/SAEOF3BUH#/screens/268129653

	            $('#saveCustomAudinceButton').appendTo('#audienceTab .wrap-for-mobile');
	            $('#saveCustomAudinceButton').addClass('button unfilled  br-color-blue br-light small-margin fill-frm-top unfilled  btn-large btn-round color-blue');

	            modalEmulation('mobile');

	            ///truncate a post text
		            $('.post-title .three-dots').ThreeDots({ max_rows:2 });
		            $('.post-description .three-dots').ThreeDots({ max_rows:3 });
							///

            }

            var makePad = heightMobMenu();

            makePad.set();


        } else {
            if (!$('body').hasClass("desctop")) {

                $(".custom-posts .owl-carousel").trigger('destroy.owl.carousel');
                $('body').removeClass("mobile");
                $('body').addClass("desctop");

                //$('.message-set-reach').find('.message-reach__views').after($('.message-reach__costs'));
                $('.custom-posts').find('.row').html($('.owl-carousel'));

                var makePad = heightMobMenu();

                makePad.reset();
	            removeTab().moveBack();
	            $('#messagePreview .message-list').after($('.message-set-reach')) //move block like in https://projects.invisionapp.com/share/SAEOF3BUH#/screens/268129653
	            modalEmulation('desctop');

	            ///truncate a post text
		            $('.post-title .three-dots').ThreeDots({ max_rows:2 });
		            $('.post-description .three-dots').ThreeDots({ max_rows:3 });
				///
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

    /////////////input length

	function maxCharacters(){
		var textareaElem = $('.max-length');


		$(textareaElem).each(function(){
			var maxLength = $(this).attr('maxLength');

			$(this).parent().find('.edit-box-count').text(maxLength +'/'+ maxLength);


			$(this).keyup(function() {
				var textlen = maxLength - $(this).val().length;

				if(textlen >=0 && textlen <= maxLength){
					$(this).parent().find('.edit-box-count').text(textlen +'/'+ maxLength);
					$(this).parent().find('.edit-box-error').text('');
				}

				if(textlen == 0){
					$(this).parent().find('.edit-box-error').show();
					$(this).parent().find('.edit-box-error').text('Max length');
				}
			});
		})
	}

	maxCharacters();

	///////////// Share toogle

    function changeShareSettings() {
        if($('#shareSettingsToggle').prop( 'checked' )){
            $('#shareSetting').show('fast');
        }

        $('#shareSettingsToggle').on('change', function(){
            $('#shareSetting').toggle('fast');
        })
    }

    changeShareSettings();

    ///////////// Share toggle


  //validate-order

  function checkParams(form , button){
      var form = $(form);

      $(form).find('.validate-order').each(function(){
          validateOrder(form, button);

          $(this).keyup(function() {
              validateOrder(form, button)
          });
      })
  }

  function checkValidate(form, button){
      var form = $(form);
      var emptyCount = $(form).find('.empty').length;
      if(emptyCount <= 0 ){
          $(button).removeClass('disabled');
      }
      else{
          $(button).addClass('disabled');
      }
  }

  function validateOrder(form, button){
      var form = $(form);

      $(form).find('.validate-order').each(function(){
         var inputVal = $(this).val().length;

          if(inputVal && inputVal < 30){
              $(this).removeClass('empty');
          }
          else if(inputVal >= 30){
              var cropText = $(this).val().substr(0, 30);
              $(this).removeClass('empty');
              $(this).val(cropText);
          }
          else{
              $(this).addClass('empty');
          }
      })

      checkValidate(form, button);
  }

  checkParams('#formToValidateOrder', '#validateOrder');

  $('#formToValidateOrder').find('.form-upload').on('click', function(){
      checkParams('#formToValidateOrder', '#validateOrder');
  })

  //validate-order

	/////////////Activate selection
	$(function(){
		$("#tagSelection").chosen({
			width: '100%'
		});
	});
	/////////////Activate selection

    ////////////Add an ad


  if ($('#myAwesomeDropzone').length) {

	var dropzone = new Dropzone('#myAwesomeDropzone', {
		//url: '/',
		params:true,
		previewTemplate: document.querySelector('#preview-template').innerHTML,
		//parallelUploads: null,
		thumbnailHeight: 307,
		thumbnailWidth: 548,
		thumbnailMethod: 'crop',
		maxFilesize: 1,
		maxFiles: 1,
		addRemoveLinks: true,
		acceptedFiles: 'image/*, video/*',

		dictInvalidFileType:"Please insert a valid image or video file under 24mb",

		dictFileTooBig:"Please insert a valid image or video file under 24mb <br/> <span class='button bg-blue small btn-round color-white min_w_250 margin_r_0'>try again</span>",

		//dictMaxFilesExceeded:"Please insert a valid image or video file under 24mb",
		dictRemoveFile: "",

		dictDefaultMessage: "<i class='icon icon-Image medium-icon' aria-hidden='true'>" +
		"<svg width='75' height='41' viewBox='0 0 75 41' id='Image' y='269'><title>Image</title><path d='M34.62 34.498l3.157-3.252-7.393-8.04L44.74 8.302 75 40.931l-19.793.048.008.006H52.99L46.747 41l-.014-.015H0l20.67-21.493 13.95 15.006zM14.826 11.622c-3.372 0-6.105-2.602-6.105-5.811C8.72 2.6 11.454 0 14.826 0c3.371 0 6.104 2.602 6.104 5.81 0 3.21-2.733 5.812-6.104 5.812z' fill=''#8d8d8d' fill-rule='evenodd'></path></svg>" +
		"</i> <br/><span class='dz-message__title'>Drag & Drop</span> a video or image here <br/> or <br/> " +
		"<span class='button bg-blue small btn-round color-white min_w_250 margin_r_0'>Choose a file</span>",

		accept: function(file, done) {
			done();
		},

		init: function() {
			this.on("addedfile", function(file) {
                $(file.previewTemplate).find('.dz-error-message').html('');
				$('button[form="myAwesomeDropzone"]').removeClass('disabled');
				$('.form-upload .order-block').css('display', 'block');
				//$('#myAwesomeDropzone').css('poiter-event', 'none');
				//$('.dz-progress').css('display', 'none');
				$('.form-upload .dropzone').removeClass('empty');
				$(file.previewTemplate).find('.dz-remove').html('<i class="fa fa-close" aria-hidden="true"></i>');
				$(file.previewTemplate).find('.dz-error-message').html();
				validateOrder('#formToValidateOrder', '#validateOrder');

                console.log( file);
			});

			this.on("removedfile", function(file) {
				$('button[form="myAwesomeDropzone"]').addClass('disabled');
				$('.form-upload .order-block').css('display', 'none');
				$('.form-upload .dropzone').addClass('empty');
				validateOrder('#formToValidateOrder', '#validateOrder');
			});

			// this.on("reset", function(file) {
			// 	$('button[form="myAwesomeDropzone"]').addClass('disabled');
			// 	$('.form-upload .order-block').css('display', 'none');
			// 	//$('.form-upload .dropzone').css('border', '2px dashed #8f29fc');
			// 	$('.form-upload .dropzone').addClass('empty');
			// 	validateOrder('#formToValidateOrder', '#validateOrder');
             //    this.removeAllFiles();
			// });

			this.on("maxfilesexceeded", function(file){
				this.removeAllFiles();
				this.addFile(file);
			});

			this.on('error', function(file, response) {
				$('.dz-preview.dz-image-preview').hide();
				$(file.previewTemplate).find('.dz-error-message').html(response);
                $('.dz-error-message').on('click', function(){
                    dropzone.removeAllFiles(true);
                })

				$('.form-upload .order-block').css('display', 'none');



			});
		}
	});
  }


  ///////validate url on preview
    function isUrlValid(url) {
        return /(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    }

    $('#inputForPreview').keyup(function(){
        var url = $(this).val();

        if(isUrlValid(url)){
            $('.check-valid-url .button').removeClass('disabled');
            $('.modal-emulation__next-button').removeClass('disabled');

            $('.check-valid-url').on('click', function(){
                $('#preview-block>img').css('display', 'none');
                $('#preview-block').find('.message-article').css('display', 'block');
            })
        }
        else{
            console.log('inside '+ url);
            $('.check-valid-url .button').addClass('disabled');
            $('.modal-emulation__next-button').addClass('disabled');

            $('#preview-block>img').css('display', 'block');
            $('#preview-block').find('.message-article').css('display', 'none');
        }
    })

    ///////validate url on preview
});
