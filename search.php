<?php
get_header(); 
$show = 'used';
if(isset($_GET['show'])){
	$show = esc_attr( $_GET['show'] );
}
$term = get_queried_object();

if ( $term ) {

	$currentlink = get_category_link($term->term_id);
	
}

$navid  = ( $term ) ? $term->term_id : 0;

$apply = false;

?>
		<div class="category-head">
			<h4><?php echo single_cat_title();?></h4>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
		</div><!-- Category Head -->
	<main class="cd-main-content">
		<div class="cd-tab-filter-wrapper">
			<div class="cd-tab-filter">
				<ul class="cd-filters">


					<li class="filtertype"><a <?php if($show=='used'):?>class="selected"<?php endif;?> href="<?php echo $currentlink;?>?show=used">Used</a></li>
					<li class="filtertype"><a <?php if($show=='new'):?>class="selected"<?php endif;?>href="<?php echo $currentlink;?>?show=new">New</a></li>
					<li class="filtertype"><a <?php if($show=='all'):?>class="selected"<?php endif;?>href="<?php echo $currentlink;?>?show=all">All</a></li>
				
				</ul> <!-- cd-filters -->
			</div> <!-- cd-tab-filter -->
		</div> <!-- cd-tab-filter-wrapper -->

		<section class="cd-gallery filter-is-visible">
			<ul class="productsfilter">
			<?php
			$productsbrands = array();
			$productslevels = array();
			$productcategories = array();
			$the_query = new WP_Query( array(
				'post_type' => 'product',
				'numberposts' => '-1',
				'posts_per_page' => '-1',
				's' => esc_attr( $_GET['s'] ),
			) );
			
			$brands = array();
			$levels = array();
			$products = array();
			$unsortedcats = array();
			$productcats = array();
			$productpbrands = array();
			$globalfilters = array();
			$globalbrands = array();
			$globallevels = array();
			
			$cats = array();
			while ( $the_query->have_posts() ) :
			$the_query->the_post();
			$sorttypes = pmwoodwind_list_hierarchical_terms(get_the_id(), 'product_cat');
			$sorttypesb = pmwoodwind_list_hierarchical_terms(get_the_id(), 'pwb-brand');
			$isnew = pmwoodwind_is_new_product(get_the_id());
			if($isnew && ($isnew == 'yes')){
				$products['new'][$sorttypes.$sorttypesb.get_the_id()] = get_the_id();

			} else {
				$products['used'][$sorttypes.$sorttypesb.get_the_id()] = get_the_id();
			}
			$products['all'][$sorttypes.$sorttypesb.get_the_id()] = get_the_id();
			endwhile;
				wp_reset_postdata();
			
			ksort($products[$show]);
			$sortedp = $products[$show];
			$sortedproductsbyside = array();
			
			
			foreach($sortedp as $p=>$product_id):


			$types = wp_get_post_terms($product_id, 'product_cat',array( 'orderby' => 'term_order' ));
			$pbrands = wp_get_post_terms($product_id, 'pwb-brand',array( 'orderby' => 'term_order' ));
			$plevels = wp_get_post_terms($product_id, 'level',array( 'orderby' => 'term_order' ));
			$filters = '';
			$filtersbrands = '';
			$filterslevels = '';
			$productcats[$product_id] = $types;
			$productpbrands[$product_id] = $pbrands[0];
			foreach($types as $type){
				$filters .= ' filter'.$type->term_id;
				$unsortedcats[$type->term_id] = $type;
				
			
				$productcategories[$type->term_id][] = $product_id;
			}	
				
			if($plevels):
			foreach($plevels as $plevel){
				$filterslevels .= ' filter'.$plevel->term_id;
				$levels[$plevel->term_id] = $plevel;
				$productslevels[$plevel->term_id][] = $product_id;
			}	
			endif;			
			foreach($pbrands as $brand){
		
				$filtersbrands .= ' filter'.$brand->term_id;
				$brands[$brand->term_id] = $brand;
				$brandname = $brand->name;
				$productsbrands[$brand->term_id][] = $product_id;
			}		
			$globalfilters[$product_id] = $filters;
			$globalbrands[$product_id] = $filtersbrands;
			$globallevels[$product_id] = $filterslevels;
			
			$sortedbrands = array();
			$sortedlevels = array();
	
			foreach($brands as $brand){
				$sortedbrands[$brand->term_order] = $brand;
			}		
			foreach($levels as $level){
				$sortedlevels[$level->term_order] = $level;
			}	
		
			foreach($unsortedcats as $unsortedcat){
		
				if($unsortedcat->parent == $navid){
					$cats[$unsortedcat->term_order.'_'.$unsortedcat->term_id] = $unsortedcat;
				} 		
				if($unsortedcat->term_id == $navid){
					$cats[$unsortedcat->term_order.'_'.$unsortedcat->term_id] = $unsortedcat;
				} 
				
			}
		
			ksort($sortedbrands);
			ksort($cats);
			ksort($sortedlevels);

				

		 endforeach;
				
				foreach($cats as $cat){
					$xx = $cat->term_order;
					if($cat->parent == $navid):
					
					$childs = get_terms( array( 
						'taxonomy' => 'product_cat', 
						'orderby' => 'name',
						'hide_empty' => 0,
						'parent' => $cat->term_id,
						
					) );
				
					endif;
					if($childs):
					
					foreach($childs as $child):
					
							$xx .= '_'.$child->term_order;
						$posts_array = get_posts(
									array(
										'posts_per_page' => -1,
										'post_type' => 'product',
										's' => esc_attr( $_GET['s'] ),
									)
								);
							foreach($posts_array as $post_array){
								
								$sortedproductsbyside[$xx.'-'.basename(get_permalink($post_array->ID))] = $post_array->ID;
							}
							
							
						
						
					endforeach;
					else:
					
					$posts_array = get_posts(
							array(
										'posts_per_page' => -1,
										'post_type' => 'product',
										's' => esc_attr( $_GET['s'] ),
									)
								);
					
							foreach($posts_array as $post_array){
								
								$sortedproductsbyside[$xx.'-'.basename(get_permalink($post_array->ID))] = $post_array->ID;
							}
					endif;
				}
				ksort($sortedproductsbyside, SORT_NATURAL | SORT_FLAG_CASE);
				
				foreach($sortedproductsbyside as $p=>$product_id):

					$isnew = pmwoodwind_is_new_product($product_id);
					$price = pmwoodwind_product_main_price($product_id);
					$status = $price;
					if(is_numeric($price)){
						$status = 'sale';
					}
			
				
				?>
			
				<li id="<?php echo $product_id;?>" class="mix <?php echo $isnew;?> <?php echo $status;?> <?php echo ( isset( $globalfilters[$product_id] ) ? esc_attr( $globalfilters[$product_id] ) : '');?> <?php echo ( isset( $globalbrands[$product_id] ) ? esc_attr( $globalbrands[$product_id] ) : '' );?> <?php echo ( isset( $globallevels[$product_id] ) ? esc_attr( $globallevels[$product_id] ) : '' );?> <?php echo pmwoodwind_product_get_serial($product_id);?> <?php echo get_the_title($product_id);?>">
					<a href="<?php echo get_permalink($product_id);?>" title="<?php echo get_the_title($product_id);?>">
						<?php 
						
							global $product;
						
							$product = new WC_Product( $product_id );
						
							echo woocommerce_get_product_thumbnail( 'main_image' ); 
						
						?>
						
					</a>
						
							<h5>
							
						<a href="<?php echo get_permalink($product_id);?>"><?php echo get_the_title($product_id);?></a>
						
						<br/>
						<?php if($price):?><span class="price <?php echo $price;?>"><?php
						if(is_numeric($price)){
							echo money_format("$ %i",$price);
						} else {
							echo $price;
						}
						?></span><?php endif;?>
							</h5>
				</li>
				
				<?php
				
				endforeach;
				?>
				


	<li class="gap"></li>
<li class="gap"></li>
<li class="gap"></li>
			</ul>
			<?php if ( $term ) : ?>
				<div class="cd-fail-message" <?php if($sortedproductsbyside < 1):?> style="display:block;" <?php endif;?>>No <?php echo $term->name;?> found</div>
			<?php endif; ?>
		</section> <!-- cd-gallery -->

		<div class="cd-filter filter-is-visible">
			<form>
				<div class="cd-filter-block">
					<h4>Search</h4>
					
					<div class="cd-filter-content">
						<input type="search" id="searchs" value="<?php echo esc_attr( $_GET['s'] );?>" name="s" placeholder="Serial or Name...">
					</div> <!-- cd-filter-content -->
				</div> <!-- cd-filter-block -->
				<?php if($levels):?>
				<div class="cd-filter-block levels">
					<h4>Levels</h4>
					
					<ul class="cd-filter-content cd-filters list levels">
						<?php foreach($sortedlevels as $level):?>
						<li class="<?php echo implode(' ', $productslevels[$level->term_id]);?>">
							<input class="filter" type="checkbox" name="radioButton" id="filter<?php echo $level->term_id;?>">
							<label class="checkbox-label" for="filter<?php echo $level->term_id;?>"><?php echo $level->name;?></label>
						</li>		
						<?php endforeach;?>
					</ul> <!-- cd-filter-content -->
				</div> <!-- cd-filter-block -->
				<?php endif;?>
				<?php if($cats && $term):?>
				<div class="cd-filter-block categories">
					<h4><?php echo $term->name;?></h4>

					<ul class="cd-filter-content cd-filters list categories">
					<?php foreach($cats as $term):
					if($term->parent == $navid):
					$childs = get_terms( array( 
						'taxonomy' => 'product_cat', 
						'orderby' => 'name',
						'hide_empty' => 0,
						'parent' => $term->term_id,
						
					) );
					?>
					<li class="<?php echo implode(' ', $productcategories[$term->term_id]);?>">
					<input class="filter" <?php if($apply == $term->term_id):?>checked="checked"<?php endif;?> data-filter=".filter<?php echo $term->term_id;?>" type="checkbox" id="filter<?php echo $term->term_id;?>">
					<label class="checkbox-label" for="filter<?php echo $term->term_id;?>"><?php echo $term->name;?></label>
						<?php if($childs): ?>
						<ul class="cd-filter-content cd-filters list child">
						<?php foreach($childs as $child):?>
							<?php if(isset($productcategories[$child->term_id])):?>
							<li class="<?php echo implode(' ', $productcategories[$child->term_id]);?>">
							<input class="filter"  type="checkbox" id="filter<?php echo $child->term_id;?>">
							<label class="checkbox-label" for="filter<?php echo $child->term_id;?>"><?php echo $child->name;?></label>
							</li>
						<?php endif;?>
						<?php endforeach;?>
							</ul>
						<?php endif;?>
					</li>
					<?php endif; endforeach;?>	
						
					</ul> <!-- cd-filter-content -->
				</div> <!-- cd-filter-block -->
				<?php endif;?>
				<?php if($sortedbrands):?>
				<div class="cd-filter-block brands">
					<h4>Brands</h4>
					
					<ul class="cd-filter-content cd-filters list brands">
						<?php foreach($sortedbrands as $brand):?>
						<li class="<?php echo implode(' ', $productsbrands[$brand->term_id]);?>">
						
							<input class="filter" type="checkbox" name="radioButton" id="filter<?php echo $brand->term_id;?>">
							<label class="checkbox-label" for="filter<?php echo $brand->term_id;?>"><?php echo $brand->name;?></label>
						</li>		
						<?php endforeach;?>
					</ul> <!-- cd-filter-content -->
				</div> <!-- cd-filter-block -->		
				<?php endif;?>
			
			</form>

			<a href="#0" class="cd-close">Close</a>
		</div> <!-- cd-filter -->

		<a href="#0" class="cd-filter-trigger">Filters</a>
	</main> <!-- cd-main-content -->
<?php if($apply):
$apply = '.filter'.$apply;
?>
<?php endif;?>
<script>
jQuery(function(){
  jQuery('.productsfilter').mixItUp();
});
</script>


<?php get_footer();
