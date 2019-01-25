// This is the custom javascript file 
var z = 0;
window.pmwoodwindsZoomCount = function(){
z++;
if(z > 0){
	jQuery("span#lg-zoom-in").hide();
}
}
window.pmwoodwindsZoomCountMin = function(){
z--;
if(z < 1){
	jQuery("span#lg-zoom-in").show();
}
}
	 
window.pmwoodwindsFirstview = function(){
	//jQuery("#pmwoodwind_product_images img.zoomImg").click();
}

jQuery( document ).on( "click", ".lg-actions .lg-icon", function() {
z = 0;
jQuery("span#lg-zoom-in").show();
});
jQuery(document).ready(function($) {
    "use strict";
	
	$( document ).on( 'click', '.single-product .zoomImg', function() {
		
		let href = $( this ).attr( 'src' ).replace( /-\d+x\d+/, '' );
		
		$( '.slick-track a[href="' + href + '"]' ).click();
		
	} );

		 $('.lg-actions .lg-icon').hide();
        $('#trd-testimonial').not('.slick-initialized').slick({
            infinite: true,
            speed: 300,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 1000,
            slidesToShow: 3,
            centerMode: true,
			centerPadding : '12px',
            responsive: [{
              breakpoint: 1023,
              settings: {
                slidesToShow: 3
              }

            }, {

              breakpoint: 767,
              settings: {
                slidesToShow: 3,
                centerPadding : '10px'
              }

            }]
        });     


	$("#instruments .category").mouseover(function() {
	  $("#instruments .category").removeClass('main');
	  $(this).addClass('main');
	});
    // === Header Menu Button ===
    $('#menu-button').on('click',function(e){
        e.preventDefault();
        $(this).toggleClass('close-icon');
        $('#main-nav').toggleClass('fade');
    });   

    $('#main-nav').on('click',function(){
        $('#menu-button').removeClass('close-icon');
        $('#main-nav').removeClass('fade');
    });

    // === LightGallery Home ===
    if ($('#gallery').length>0) {
       // $("#gallery").lightGallery();
    }   
	if ($('#pmwoodwind_product_images').length>0) {
        $("#pmwoodwind_product_images").lightGallery();
    }



    // === Countdown index.html config ===
    if ($('#countdown-home-1').length>0) {
       $("#countdown-home-1").countdown({
            date: "30 march 2016 12:00:00", // Edit this line
            format: "on"
        },
        function() {
          // This will run when the countdown ends
        });
    }

    // === Countdown track.html config ===
    if ($('#countdown-1').length>0) {
        $("#countdown-1").countdown({
            date: "30 march 2016 12:00:00", // Edit this line
            format: "on"
        },
        function() {
          // This will run when the countdown ends
        });
    }
    if ($('#countdown-2').length>0) {
        $("#countdown-2").countdown({
            date: "12 march 2016 12:00:00", // Edit this line
            format: "on"
        },
        function() {
          // This will run when the countdown ends
        });
    }
 
    // === Form Validation ===
    // Contact Page Form
     if ($('#contact-form').length>0) {
        $('#contact-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            }, //end rules
            messages: {
                email: {
                    required: "Please type a e-mail address.",
                    email: "This is not a valid email address."
                }
            }
        });// end validate 
    }
    //
    // === Revolution Slider config ===
    if ($('.slider').length>0) {
        jQuery('.slider').revolution({
			
			// Disable auto-play
			stopLoop: 'on',
			stopAfterLoops: 0,
			stopAtSlide: 1,
			
            delay:9000,
            startwidth:1920,
            startheight:780,
            //
            fullScreenAlignForce:"off",
            autoHeight:"off",
            minHeight:"off",
            //
            fullWidth:"off",
            forceFullWidth:"off",
            fullScreen:"off",
            fullScreenOffset:"0px",
            //
            onHoverStop:"on",
            //
            thumbWidth:100,
            thumbHeight:50,
            thumbAmount:3,
            //
            hideThumbsOnMobile:"on",
            hideNavDelayOnMobile:1500,
            hideBulletsOnMobile:"on",
            hideArrowsOnMobile:"on",
            hideThumbsUnderResoluition:0,
            //
            hideThumbs:1,
            hideTimerBar:"on",
            //
            keyboardNavigation:"on",
            //
            navigationType:"none",
            navigationArrows:"solo",
            navigationStyle:"round",
            //
            navigationHAlign:"center",
            navigationVAlign:"bottom",
            navigationHOffset:30,
            navigationVOffset:105,
        });
    }
	var wh =  $(window).height()*0.8;
    $(".slider-container").height(wh);
 


    $("#eventsbg").css('border-bottom',wh+'px solid');
    // === Responsive Videos ===
    if ($('.embed-video').length>0) {
        $('.embed-video').fitVids();
    }

    // === ScrollTo annimation ===
    $('.scrollTo').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
        $target = $(target);
        if ($(target).length>0) {
            $('body, html').stop().animate({
                'scrollTop': $(target).offset().top-0
            }, 1000, 'swing', 
            function() {
                window.location.hash = target;
            });
        }
    }); // End Click  

    // === Go to top ===
    $('.go-to-top').click(function(){
        $('html, body').animate({scrollTop:0}, 'slow');
        return false;
    }); 

    // === Header Nav BG ===
    $(window).scroll(function(){
        if($(document).scrollTop() > 150)
        {    
            $('.navigation-bar').addClass('scroll-BG');
        }
        else
        {  
           $('.navigation-bar').removeClass('scroll-BG');
        }
    });

    // === Header Parallax Image Style ===
    $(window).on('scroll', function(){
        var curPos = $(window).scrollTop();
        $('.header-parallax-image').css('background-position', 'right bottom -' + curPos * .8 + 'px');
        //fadePanels(curPos);
    }).scroll();

});// END READY