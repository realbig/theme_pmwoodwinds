<?php
get_header(); 
$show = 'used';
if(isset($_GET['show'])){
	$show = $_GET['show'];
}

// ...How was this expected to work before?
if ( ! isset( $_GET['category'] ) ) {
	$_GET['category'] = '';
}

$_GET['category'] = explode( ',', $_GET['category'] );

if ( ! isset( $_GET['brand'] ) ) {
	$_GET['brand'] = '';
}

$_GET['brand'] = explode( ',', $_GET['brand'] );

if ( ! isset( $_GET['level'] ) ) {
	$_GET['level'] = '';
}

$_GET['level'] = explode( ',', $_GET['level'] );

$term = get_queried_object();
$currentlink = get_category_link($term->term_id);

$navid  = get_queried_object()->term_id;

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
					<li class="placeholder"> 
						<a data-type="used" hr	ef="#used">Used</a> <!-- selected option on mobile -->
					</li> 


					<li class="filtertype"><a <?php if($show=='used'):?>class="selected"<?php endif;?> href="<?php echo $currentlink;?>?show=used">Used</a></li>
					<li class="filtertype"><a <?php if($show=='new'):?>class="selected"<?php endif;?>href="<?php echo $currentlink;?>?show=new">New</a></li>
					<li class="filtertype"><a <?php if($show=='all'):?>class="selected"<?php endif;?>href="<?php echo $currentlink;?>?show=all">All</a></li>
				
				</ul> <!-- cd-filters -->
			</div> <!-- cd-tab-filter -->
		</div> <!-- cd-tab-filter-wrapper -->

		<section class="cd-gallery filter-is-visible">
			<ul class="productsfilter" id="filteredproducts">
			<?php
			$productsbrands = array();
			$productslevels = array();
			$productcategories = array();
			$the_query = new WP_Query( array(
				'post_type' => 'product',
				'numberposts' => '-1',
				'posts_per_page' => '-1',
				'tax_query' => array(
					array (
						'taxonomy' => 'product_cat',
						'field' => 'term_id',
						'orderby' => 'term_order',
						'terms' => $navid,
					)
				),
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
				$showprods = array();
			while ( $the_query->have_posts() ) :
			$the_query->the_post();
			$sorttypes = pmwoodwind_list_hierarchical_terms(get_the_id(), 'product_cat');
			$sorttypesb = pmwoodwind_list_hierarchical_terms(get_the_id(), 'pwb-brand');
			$isnew = pmwoodwind_is_new_product(get_the_id());
		
			if($isnew && ($isnew == 'yes')){
				$products['new'][$sorttypes.$sorttypesb.get_the_id()] = get_the_id();
				$showprods['new'][get_the_id()] = get_the_id();

			} else {
				$products['used'][$sorttypes.$sorttypesb.get_the_id()] = get_the_id();
				$showprods['used'][get_the_id()] = get_the_id();
			}
			$products['all'][$sorttypes.$sorttypesb.get_the_id()] = get_the_id();
			$showprods['all'][get_the_id()] = get_the_id();
			endwhile;
			
			
			ksort($products[$show]);
	
			$sortedp = $products[$show];
			$sortedproductsbyside = array();
		
			foreach($sortedp as $p=>$product):


			$types = wp_get_post_terms($product, 'product_cat',array( 'orderby' => 'term_order' ));
			$pbrands = wp_get_post_terms($product, 'pwb-brand',array( 'orderby' => 'term_order' ));
			$plevels = wp_get_post_terms($product, 'level',array( 'orderby' => 'term_order' ));
			$filters = '';
			$filtersbrands = '';
			$filterslevels = '';
			$productcats[$product] = $types;
			$productpbrands[$product] = $pbrands[0];
			foreach($types as $type){
				$filters .= ' filter'.$type->term_id;
				$unsortedcats[$type->term_id] = $type;
				
			
				$productcategories[$type->term_id][] = $product;
			}	
				
			if($plevels):
			foreach($plevels as $plevel){
				$filterslevels .= ' filter'.$plevel->term_id;
				$levels[$plevel->term_id] = $plevel;
				$productslevels[$plevel->term_id][] = $product;
			}	
			endif;			
			foreach($pbrands as $brand){
		
				$filtersbrands .= ' filter'.$brand->term_id;
				$brands[$brand->term_id] = $brand;
				$brandname = $brand->name;
				$productsbrands[$brand->term_id][] = $product;
			}		
			$globalfilters[$product] = $filters;
			$globalbrands[$product] = $filtersbrands;
			$globallevels[$product] = $filterslevels;
			
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
										'tax_query' => array(
											array(
												'taxonomy' => 'product_cat',
												'field' => 'term_id',
												'terms' => $child->term_id,
											)
										)
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
										'tax_query' => array(
											array(
												'taxonomy' => 'product_cat',
												'field' => 'term_id',
												'terms' => $cat->term_id,
											)
										)
									)
								);
					
							foreach($posts_array as $post_array){
								
								$sortedproductsbyside[$xx.'-'.basename(get_permalink($post_array->ID))] = $post_array->ID;
							}
					endif;
				}
				ksort($sortedproductsbyside, SORT_NATURAL | SORT_FLAG_CASE);
				$todisplay = array_unique($sortedproductsbyside);
				foreach($todisplay as $p=>$product):

					$isnew = pmwoodwind_is_new_product($product);
					$price = pmwoodwind_product_main_price($product);
					$status = $price;
					if(is_numeric($price)){
						$status = 'sale';
					}
			
				
				if(in_array($product, $showprods[$show])):
				
				?>
			
				<li id="<?php echo $product;?>" class="mix <?php echo $isnew;?> <?php echo $status;?><?php echo $globalfilters[$product];?><?php echo $globalbrands[$product];?> <?php echo $globallevels[$product];?> <?php echo pmwoodwind_product_get_serial($product);?> <?php echo get_the_title($product);?>">
					<a href="<?php echo get_permalink($product);?>" title="<?php echo get_the_title($product);?>">
						<?php echo get_the_post_thumbnail( $product, 'product_grid', array( 'class' => 'main-image zoom' ) ); ?>
					</a>
						
							<h5>
							
						<a href="<?php echo get_permalink($product);?>"><?php echo get_the_title($product);?></a>
						
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
				endif;
				
				endforeach;
				?>
				


	<li class="gap"></li>
<li class="gap"></li>
<li class="gap"></li>
			</ul>
			<div class="cd-fail-message" <?php if($sortedproductsbyside < 1):?> style="display:block;" <?php endif;?>>No <?php echo $term->name;?> found</div>
		</section> <!-- cd-gallery -->

		<div class="cd-filter filter-is-visible">
			<form id="filterform" method="get">
				
				<div class="cd-filter-block">
					<h4>Search</h4>
					
					<div class="cd-filter-content">
						<input type="search" name="s" placeholder="Serial or Name...">
					</div> <!-- cd-filter-content -->
				</div> <!-- cd-filter-block -->
				<?php if($levels):?>
				<div class="cd-filter-block levels">
					<h4>Levels</h4>
					
					<ul class="cd-filter-content cd-filters list levels">
						<?php foreach($sortedlevels as $level):?>
						<li class="<?php echo implode(' ', $productslevels[$level->term_id]);?>">
							<input  class="filter"  type="checkbox" <?php if(in_array($brand->term_id,$_GET['level'])):?>checked="checked"<?php endif;?> value="<?php echo $level->term_id;?>" name="level[]" id="filter<?php echo $level->term_id;?>">
							<label class="checkbox-label" for="filter<?php echo $level->term_id;?>"><?php echo $level->name;?></label>
						</li>		
						<?php endforeach;?>
					</ul> <!-- cd-filter-content -->
				</div> <!-- cd-filter-block -->
				<?php endif;?>
				<?php if($cats):?>
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
					<?php if($childs): ?>
					<li class="parentcat <?php echo implode(' ', $productcategories[$term->term_id]);?>">
					<!--<input class="filter" <?php if($apply == $term->term_id):?>checked="checked"<?php endif;?> data-filter=".filter<?php echo $term->term_id;?>" type="checkbox" id="filter<?php echo $term->term_id;?>">
					<label class="parent checkbox-label" for="filter<?php echo $term->term_id;?>"><?php echo $term->name;?></label>-->
					<?php
					$open = 'closed';
					$display = 'none';
					$cids = array();
					foreach($childs as $child):
					$cids[] = $child->term_id;  
					endforeach;
				
					if(count(array_intersect($cids,$_GET['category'])) > 0):
						$open = 'open';
						$display = 'block';
					endif;?>
					<h4 class="parentcat <?php echo $open;?>"><?php echo $term->name;?></h4>
					
		
						
						<ul class="cd-filter-content cd-filters list child" style="display:<?php echo $display;?>">
						<?php foreach($childs as $child):?>
							<?php if(isset($productcategories[$child->term_id])):?>
							<li class="childcat <?php echo implode(' ', $productcategories[$child->term_id]);?>">
							<input  class="filter"  name="category[]" <?php if(in_array($child->term_id,$_GET['category'])):?>checked="checked"<?php endif;?> type="checkbox" id="filter<?php echo $child->term_id;?>" value="<?php echo $child->term_id;?>">
							<label class="checkbox-label" for="filter<?php echo $child->term_id;?>"><?php echo $child->name;?></label>
							</li>
						<?php endif;?>
						<?php endforeach;?>
							</ul>
					
					</li>
						<?php else:?>
					<li class="parentcat nochilds <?php echo implode(' ', $productcategories[$term->term_id]);?>">
					<input class="filter" name="category[]" <?php if(in_array($term->term_id,$_GET['category'])):?>checked="checked"<?php endif;?> data-filter=".filter<?php echo $term->term_id;?>" type="checkbox" id="filter<?php echo $term->term_id;?>" value="<?php echo $term->term_id;?>">
					<label class="parent checkbox-label" for="filter<?php echo $term->term_id;?>"><?php echo $term->name;?></label>
		
					
		
						
		
					
					</li>
						<?php endif;?>
					<?php endif; endforeach;?>	
						
					</ul> <!-- cd-filter-content -->
				</div> <!-- cd-filter-block -->
				<?php endif;?>
				<?php if($sortedbrands):?>
				<div class="cd-filter-block brands">
					<h4>Brands</h4>
					
					<ul class="cd-filter-content cd-filters list brands">
						<?php
						
						foreach($sortedbrands as $brand):?>
						<li class="<?php echo implode(' ', $productsbrands[$brand->term_id]);?>">
						
							<input class="filter" <?php if(in_array($brand->term_id,$_GET['brand'])):?>checked="checked"<?php endif;?> type="checkbox" name="brand[]" value="<?php echo $brand->term_id;?>" id="filter<?php echo $brand->term_id;?>">
							<label class="checkbox-label" for="filter<?php echo $brand->term_id;?>"><?php echo $brand->name;?></label>
						</li>		
						<?php endforeach;?>
					</ul> <!-- cd-filter-content -->
				</div> <!-- cd-filter-block -->		
				<?php endif;?>
			
			</form>

			<a href="#0" class="cd-close"><i class="fa fa-times" aria-hidden="true"></i></a>
		</div> <!-- cd-filter -->

		<a href="#0" class="cd-filter-trigger"><i class="fa fa-filter" aria-hidden="true"></i> Filters</a>
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
