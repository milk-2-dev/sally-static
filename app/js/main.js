/// detect user device and browser
var md = new MobileDetect(window.navigator.userAgent);
$('html').addClass(md.userAgent());
///

///truncate a post text
$('.post-title .three-dots').ThreeDots({ max_rows:2 });
$('.post-description .three-dots').ThreeDots({ max_rows:3 });
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
				var formCustomBlock = $('.modal-emulation-workspace .small-block .form-custom');
				var secondTab = $('#settingsTab .wrap-for-mobile');

				$(formCustomBlock).appendTo('#prevForm');
				$('#audienceTab-tab').removeClass('show active');
				$('#prevForm-tab').tab('show');
				$(secondTab).appendTo('#audienceTab');
			}
		},

		moveBack: function(){
			var formCustomBlock = $('#prevForm .form-custom');
			var parentBlock = $('.modal-emulation-workspace .small-block');
			var secondTab = $('#audienceTab .wrap-for-mobile');

			$(formCustomBlock).appendTo(parentBlock);

			$('#audienceTab-tab').tab('show');
			$(secondTab).appendTo('#settingsTab');

		}
	}
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

                cropText();

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

	$('#shareSettingsTogle').on('click', function(){
		$('#shareSetting').toggle('fast', function(){

		});
	});


  //validate-order

  function checkParams(form , button){
      var form = $(form);

      $(form).find('.validate-order').each(function(){
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

          if(inputVal){
              $(this).removeClass('empty');
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
		$("#tagSelection").select2({
			allowClear: true,
			//maximumSelectionLength: 2,
			placeholder: 'Search for tags or add new...',
			width: '100%',
			containerCssClass : "label-icon"
		});
	});

	/////////////Activate selection



	////////////Add an ad

  $('#inputForPreview').on('change', function(){
      $('#preview-block>img').css('display', 'none');
      $('#preview-block').find('.message-article').css('display', 'block');
      $('button[form="myAwesomeDropzone"]').css('display','block')
  })

  if ($('#myAwesomeDropzone').length) {

	var dropzone = new Dropzone('#myAwesomeDropzone', {
		url: '/',
		params:true,
		previewTemplate: document.querySelector('#preview-template').innerHTML,
		parallelUploads: null,
		thumbnailHeight: 307,
		thumbnailWidth: 548,
		thumbnailMethod: 'crop',
		maxFilesize: 1,
		//filesizeBase: 1000,
		maxFiles: 1,
		addRemoveLinks: true,
		acceptedFiles: 'image/*, video/*',

		dictInvalidFileType:"Please insert a valid image or video file under 24mb",

		dictFileTooBig:"Please insert a valid image or video file under 24mb",

		//dictMaxFilesExceeded:"Please insert a valid image or video file under 24mb",
		dictRemoveFile: "",

		dictDefaultMessage: "<i class='fa fa-5x fa-picture-o' aria-hidden='true'></i> <br/><span class='dz-message__title'>Drag & Drop</span> a video or image here <br/> or <br/> " +
		"<span class='button bg-blue small btn-round color-white min_w_250 margin_r_0'>Choose a file</span>",

		accept: function(file, done) {
			done();
		},

		init: function() {
			this.on("addedfile", function(file) {
				var closeIcon = '<i class=\'fa fa-close\' aria-hidden=\'true\'></i>';

				$('button[form="myAwesomeDropzone"]').removeClass('disabled');
				$('.form-upload .order-block').css('display', 'block');
				$('#myAwesomeDropzone').css('poiter-event', 'none');
				$('.dz-progress').css('display', 'none');
				//$('.form-upload .dropzone').css('border', 'none');
				$('.form-upload .dropzone').removeClass('empty');
				$(file.previewTemplate).find('.dz-remove').text(closeIcon);
				validateOrder('#formToValidateOrder', '#validateOrder');
			});

			this.on("removedfile", function(file) {
				$('button[form="myAwesomeDropzone"]').addClass('disabled');
				$('.form-upload .order-block').css('display', 'none');
				//$('.form-upload .dropzone').css('border', '2px dashed #8f29fc');
				$('.form-upload .dropzone').addClass('empty');
				validateOrder('#formToValidateOrder', '#validateOrder');
			});

			this.on("maxfilesexceeded", function(file){
				this.removeAllFiles();
				this.addFile(file);
			});

			this.on('error', function(file, response) {
				console.log(file);
				console.log(response);

				var closeIcon = '<i class=\'fa fa-close\' aria-hidden=\'true\'></i>';

				//this.removeAllFiles();
				$(file.previewTemplate).find('.dz-error-message').text(response);
				//$(buttonUpload).appendTo($(file.previewTemplate).find('.dz-error-message'));
				// $('.form-upload .error-block').css('display', 'block');
				$(file.previewTemplate).find('.dz-remove').text(closeIcon);
				 $('.form-upload .order-block').css('display', 'none');
				//alert(response);
			});
		}

	});

}

});
