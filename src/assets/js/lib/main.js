
	window.pmwoodwindsCloseSearch = function(){
		 jQuery('#search').slideUp(200);
	}	
	window.pmwoodwindsOpenSearch = function(){
		 jQuery('#search').slideDown(400);
	}
	
import ResponsiveBootstrapToolkit from 'responsive-toolkit';
	
( function( $, viewport ) {
	
	jQuery(document).ready(function($){
		$('form.dgwt-wcas-search-form').submit(function( event ) {
		  event.preventDefault();
		});
			$('#pmwoodwind_product_images').not('.slick-initialized').slick({
				infinite: true,
				speed: 300,
				autoplay: true,
				autoplaySpeed: 5000,
				speed: 1000,
				slidesToShow: 5,
				centerMode: true,
				centerPadding: '3px',
			});

		if ( viewport.is( '>md' ) ) {

			 $('img.zoom')
				.wrap('<span style="display:inline-block;top: 5px;"></span>')
				.css('display', 'block')
				.parent()
				.zoom();
			
		}
		
		//open/close lateral filter
		$('.cd-filter-trigger').on('click', function(){
			triggerFilter(true);
		});
		$('.cd-filter .cd-close').on('click', function(){
			triggerFilter(false);
		});

		function triggerFilter($bool) {
			var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
			elementsToTrigger.each(function(){
				$(this).toggleClass('filter-is-visible', $bool);
			});
		}

		//mobile version - detect click event on filters tab
		var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
			filter_tab_placeholder_default_value = 'Select',
			filter_tab_placeholder_text = filter_tab_placeholder.text();

		$('.cd-tab-filter li').on('click', function(event){
			//detect which tab filter item was selected
			var selected_filter = $(event.target).data('type');

			//check if user has clicked the placeholder item
			if( $(event.target).is(filter_tab_placeholder) ) {
				(filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text) : filter_tab_placeholder.text(filter_tab_placeholder_default_value) ;
				$('.cd-tab-filter').toggleClass('is-open');

			//check if user has clicked a filter already selected 
			} else if( filter_tab_placeholder.data('type') == selected_filter ) {
				filter_tab_placeholder.text($(event.target).text());
				$('.cd-tab-filter').removeClass('is-open');	

			} else {
				//close the dropdown and change placeholder text/data-type value
				$('.cd-tab-filter').removeClass('is-open');
				filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
				filter_tab_placeholder_text = $(event.target).text();

				//add class selected to the selected filter item
				$('.cd-tab-filter .selected').removeClass('selected');
				$(event.target).addClass('selected');
			}
		});

		//close filter dropdown inside lateral .cd-filter 
		$('.cd-filter-block h4').on('click touch', function( event ){
			$(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
		});




		var inputText;
		var $matching = $();




		var delay = (function(){
			var timer = 0;
			return function(callback, ms){
				clearTimeout (timer);
				timer = setTimeout(callback, ms);
			};
		})();
		var filters = [];
		var catfilters =  [];
		var brandsfilters =  [];
		var combinations =  [];
		var f = 0;




	});
		
} )( jQuery, ResponsiveBootstrapToolkit );