
	window.pmwoodwindsCloseSearch = function(){
		 jQuery('#search').slideUp(200);
	}	
	window.pmwoodwindsOpenSearch = function(){
		 jQuery('#search').slideDown(400);
	}
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
	var mainslides = $(".tp-revslider-mainul li").length;
	
	switchslides(0, mainslides);
	function switchslides(p, mainslides){

		p++;
		if(p == mainslides){
			p = 0;
		}
		setTimeout(function(){
		$(".tp-revslider-mainul li").removeClass('active');
		$(".tp-revslider-mainul li.slide"+p).addClass('active');		
			switchslides(p, mainslides);	
		}, 7000);
	
	}
	 $('img.zoom')
		.wrap('<span style="display:inline-block;top: 5px;"></span>')
		.css('display', 'block')
		.parent()
		.zoom();
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

	

	$(".cd-filters.list li input.filter").on('click',function(){
		$(".cd-filter form").addClass("active");
		var $combatching = $();
			
			if($(this).parent().parent().hasClass('levels')){
				//var filterstohide = ["categories", "brands"];
				var filterstohide = [];
			}	
			if($(this).parent().parent().hasClass('categories')){
				var filterstohide = ["levels", "brands"];
				catfilters.push($(this).attr('id').toLowerCase()); 

				if($(this).prop('checked')) {
					catfilters.push($(this).attr('id').toLowerCase());
				} else {
			
					var index = catfilters.indexOf($(this).attr('id').toLowerCase());
					if (index > -1) {
					  catfilters.splice(index, 1);
					}
				}
			}	
			if($(this).parent().parent().parent().parent().hasClass('categories')){
				var filterstohide = ["levels", "brands"];
				

				if($(this).prop('checked')) {
					catfilters.push($(this).attr('id').toLowerCase());
				} else {
			
					var index = catfilters.indexOf($(this).attr('id').toLowerCase());
					if (index > -1) {
					  catfilters.splice(index, 1);
					}
				}
			}	
			if($(this).parent().parent().hasClass('brands')){
				//var filterstohide = ["levels", "categories"];
				var filterstohide = [];
	
				if($(this).prop('checked')) {
					brandsfilters.push($(this).attr('id').toLowerCase());
				} else {
			
					var index = brandsfilters.indexOf($(this).attr('id').toLowerCase());
					if (index > -1) {
					  brandsfilters.splice(index, 1);
					}
				}
			}
		
			if((catfilters.length) > 0 && (brandsfilters.length) > 0){
				combinations = pmwoodwindsAllPossibleCases([catfilters,brandsfilters]);
				filters = [];
			} 		
			if((catfilters.length) > 0 && (brandsfilters.length) === 0){
				filters = catfilters;
		
			} 		
			if((catfilters.length) === 0 && (brandsfilters.length) > 0){
				filters = brandsfilters;
		
			}
	
			if ((filters.length) > 0 || (combinations.length) > 0) { 
				
				if((filters.length) > 0){
					$('.mix').each(function() {
						
						var match = $(this).attr('class').split(' ');
				
						var matchexists = $(match).filter(filters);
						
						if(matchexists.length > 0){
							$matching = $matching.add(this);
						} else {
							$matching = $matching.not(this);
						}
						
						
					});
					$('.cd-gallery ul').mixItUp('filter', $matching);
					setTimeout(function(){ 
					$(".cd-filter form").removeClass("active");
					}, 300);
				}			
				if((combinations.length) > 0){
				
					
						$(combinations).each(function(i,comb) {
						$('.mix').each(function() {
							var match = $(this).attr('class');
							var m = match.indexOf(comb);
							if(m >= 0){
								$combatching = $combatching.add(this);
							}
			
						});
						
					});
					$('.cd-gallery ul').mixItUp('filter', $combatching);
					setTimeout(function(){ 
					$(".cd-filter form").removeClass("active");
					}, 300);
				}
			
	
				
				$('.cd-gallery ul').on('mixEnd', function() {
					setTimeout(function(){ 
						
						var checkedCategories = [];
						
						// If there are no Instruments/Accessories/Mouthpieces checked, show all Levels and Brands again
						if ( filterstohide.length > 0 ) {
						
							$( '.cd-filters' ).not( $( '.cd-filters' ).filter( '.' + filterstohide.join( ', .' ) ) ).each( function( index, filter ) {

								$( filter ).find( 'input[type="checkbox"]' ).each( function( checkboxIndex, checkbox ) {
									
									if ( $( checkbox ).prop( 'checked' ) ) {
										checkedCategories = checkedCategories.concat( $( checkbox ).closest( 'li' ).attr( 'class' ).replace( 'childcat', '' ).trim().split( ' ' ) );
									}
									
								} );

							} );
							
						}
						
						$(filterstohide).each(function(i,filtertohide) {
							$('.cd-filter-block.'+filtertohide).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
							$('.cd-filters.'+filtertohide+' li').each(function() {
							var ids = $(this).attr('class').split(' ');
							var exists = $(checkedCategories).filter(ids);
							 if( exists.length > 0 || checkedCategories.length == 0 ){
									$(this).show(); // Hide or show Levels or Brands
								} else {
									$(this).hide();
								}
							});
		
						});	
						
					}, 300);

				});	
					
		
				
			} else {
				
				$('.cd-gallery ul').mixItUp('filter', 'all');
				$(filterstohide).each(function(i,filtertohide) {
					$('.cd-filters.'+filtertohide+' li').show();
				});	
				$(".cd-filter form").removeClass("active");
				$('.cd-gallery li').show();
			}
				
	});	
	
	$(".cd-filter-content input[type='search']").keyup(function(){
	  	// Delay function invoked to make sure user stopped typing
	  	delay(function(){
	    	inputText = $(".cd-filter-content input[type='search']").val().toLowerCase();
	   		// Check to see if input field is empty
	    	if ((inputText.length) > 0) {            
	      		$('.mix').each(function() {
		        	var $this = $(this);
		        
		        	// add item to be filtered out if input text matches items inside the title   
		        	if($this.attr('class').toLowerCase().match(inputText)) {
		          		$matching = $matching.add(this);
		        	} else {
		          		// removes any previously matched item
		          		$matching = $matching.not(this);
		        	}
	      		});
	      		$('.cd-gallery ul').mixItUp('filter', $matching);
	    	} else {
	      		// resets the filter to show all item if input is empty
	      		$('.cd-gallery ul').mixItUp('filter', 'all');
	    	}
	  	}, 200 );
	});
});
window.pmwoodwindsAllPossibleCases = function(arr) {
  if (arr.length == 1) {
    return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = pmwoodwindsAllPossibleCases(arr.slice(1));  // recur with the rest of array
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        result.push(arr[0][j] +' '+ allCasesOfRest[i]);
      }
    }
    return result;
  }

}