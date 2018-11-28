<?php
get_header(); 
$show = 'used';
if(isset($_GET['show'])){
	$show = $_GET['show'];
}
$term = get_queried_object();
$currentlink = get_category_link($term->term_id);

$navid  = get_queried_object()->term_id;
if($term->parent > 0){
	$parent = get_term( $term->parent, 'mediatype' );
}
if ($term->parent > 0){
?>
		<div class="category-head">
			<h4>Media</h4>
			
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
		</div><!-- Category Head -->
	<main class="cd-main-content">
		<div class="cd-tab-filter-wrapper">
			<div class="cd-tab-filter">
				<ul class="cd-filters">
					<li class="placeholder"> 
						<a data-type="used" href="#used">Used</a> <!-- selected option on mobile -->
					</li> 


					
					<li class="filtertype"><a href="/mediatype/<?php echo $parent->slug;?>"><i class="fa fa-angle-left" aria-hidden="true"></i> Back</a></li>
					<li class="filtertype"><a class="selected"href="../<?php echo $term->slug;?>"><?php echo $term->name;?></a></li>
				
				</ul> <!-- cd-filters -->
			</div> <!-- cd-tab-filter -->
		</div> <!-- cd-tab-filter-wrapper -->

		<section class="cd-gallery">
			<ul class="productsfilter">
			<?php
			
			while ( have_posts() ) : the_post();

				$products[get_the_id()] = get_the_id();
			endwhile;
			
			

	
	
	
				
			
				ksort($products, SORT_NATURAL | SORT_FLAG_CASE);
			
				foreach($products as $p=>$product):
					$content_post = get_post($product);
					$content = $content_post->post_content;
				
				if($parent->term_id == 553){
					preg_match('~(?:https?://)?(?:www.)?(?:youtube.com|youtu.be)/(?:watch\?v=)?([^\s]+)~',$content, $vids);
					if(count($vids)){
						$img = 'https://img.youtube.com/vi/'.$vids[1].'/hqdefault.jpg';
					} else {
						$img = '/wp-content/themes/pmwoodwind/dist/assets/img/elements/logo.png';
					}
				}		
				if($parent->term_id == 529){
					preg_match('/<img\s+.*?src=[\"\']?([^\"\' >]*)[\"\']?[^>]*>/i',$content, $imgs);
	
					if(count($imgs)){
						
						$doc = new DOMDocument();
						$doc->loadHTML($imgs[0]);
						$xpath = new DOMXPath($doc);
						$img = $xpath->evaluate("string(//img/@src)");
					} else {
						$img = '/wp-content/themes/pmwoodwind/dist/assets/img/elements/logo.png';
					}
			
				}
		
				
				?>
			
				<li id="<?php echo $product;?>" class="mix <?php echo get_the_title($product);?>" style="display: inline-block;text-align: center;background: #0000004d;padding: 10px;">
					<a href="<?php echo get_permalink($product);?>" title="<?php echo get_the_title($product);?>">
						<img src="<?php echo $img;?>&w=442&h=331" class="main-image zoom" alt="<?php echo get_the_title($product);?>">
						
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
		
				endforeach;
				?>
				


	<li class="gap"></li>
<li class="gap"></li>
<li class="gap"></li>
			</ul>
			<div class="cd-fail-message" <?php if($products < 1):?> style="display:block;" <?php endif;?>>No <?php echo $term->name;?> found</div>
		</section> <!-- cd-gallery -->

		

	</main> <!-- cd-main-content -->
<?php } else { ?>
<div class="category-head">
			<h4>Media</h4>
			
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
		</div><!-- Category Head -->
	<main class="cd-main-content">
		<div class="cd-tab-filter-wrapper">
			<div class="cd-tab-filter">
				<ul class="cd-filters">
					<li class="placeholder"> 
						<a data-type="used" href="#used">Used</a> <!-- selected option on mobile -->
					</li> 


					
					<li class="filtertype"><a <?php if($navid=='529'):?>class="selected"<?php endif;?>href="/mediatype/photos/">Photos</a></li>
					<li class="filtertype"><a <?php if($navid=='553'):?>class="selected"<?php endif;?>href="/mediatype/video/">Videos</a></li>
				
				</ul> <!-- cd-filters -->
			</div> <!-- cd-tab-filter -->
		</div> <!-- cd-tab-filter-wrapper -->

		<section class="cd-gallery">
			<ul class="productsfilter">
			<?php
			$products = get_term_children( $navid, 'mediatype');
		
	

			
				foreach($products as $p=>$product):
					$term = get_term( $product, 'mediatype' );
					$term_image = get_term_meta( $product, 'wpcf-typeimage',true);
			
				?>
			
				<li id="<?php echo $term->term_id;?>" class="mix" style="display: inline-block;text-align: center;background: #0000004d;padding: 10px;">
					<a href="<?php echo $term->slug;?>" title="<?php echo $term->name;?>">
						<img src="<?php echo $term_image;?>&w=442&h=331" class="main-image zoom" alt="<?php echo $term->name;?>">
						
					</a>
						
							<h5>
							
						<a href="<?php echo $term->slug;?>"><?php echo $term->name;?></a>
						
						<br/>
						
							</h5>
				</li>
				
				<?php
		
				endforeach;
				?>
				


	<li class="gap"></li>
<li class="gap"></li>
<li class="gap"></li>
			</ul>
			<div class="cd-fail-message" <?php if($products < 1):?> style="display:block;" <?php endif;?>>No media found</div>
		</section> <!-- cd-gallery -->

		

	</main> <!-- cd-main-content -->
<?php } ?>


<?php get_footer();
