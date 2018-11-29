<?php


 get_header();

 ?>


   <!-- Header Revolution Slider -->
	
		<div id="latest-work" class="product-page container hover-section">
		<div class="category-head">
			<h1><?php the_title();?></h1>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
		</div><!-- Category Head -->

		<div class="row">
			<div class="col-sm-12">
<?php
		$pmwoodwind_product_images = array_filter( explode( ',', get_post_meta( get_the_id(), '_product_image_gallery', true ) ) );

		// Start the loop.
		while ( have_posts() ) : the_post();
						$price = pmwoodwind_product_main_price(get_the_id());
							$status = $price;
							if(is_numeric($price)){
								$status = 'sale';
							}
				$variants = get_post_meta($post->ID, 'wpcf-variantname', false);
	
			?>
			<div class="col-sm-7">
				<div class="imgview <?php if($pmwoodwind_product_images):?>hasimages<?php endif;?>">
				<?php if($price &&!is_numeric($price)):?>
					<span class="status"><?php echo $status;?></span>
				<?php endif;?>
				<?php if($pmwoodwind_product_images):?>
				<a href="javascript:pmwoodwindsFirstview();" title="<?php the_title();?>"><?php echo get_the_post_thumbnail( get_the_ID(), 'main_image', array( 'class' => 'main-image zoom' ) ); ?></a>
					<div id="pmwoodwind_product_images">
						
							<a href="<?php echo pmwoodwind_get_product_thumbnail_src( 'full' ); ?>" title="<?php the_title();?> image main image">
								<?php echo woocommerce_get_product_thumbnail( 'product_thumbnail' ); ?>
							</a>
						
							<a href="<?php echo pmwoodwind_get_product_thumbnail_src( 'full' ); ?>" title="<?php the_title();?> image main image">
								<?php echo woocommerce_get_product_thumbnail( 'product_thumbnail' ); ?>
							</a>
						
						<?php foreach($pmwoodwind_product_images as $i=>$image):
						
							$src = wp_get_attachment_image_src( $image, 'full' );
						
						?>
				
							<a href="<?php echo $src[0];?>" title="<?php the_title();?> image <?php echo $i;?>">
							<?php echo wp_get_attachment_image( $image, 'product_thumbnail' ); ?>
							</a>
					
						<?php endforeach;?>
						
					</div>
					<?php else:?>
						<div id="product_single_image">
							<?php echo woocommerce_get_product_thumbnail( 'main_image' ); ?>
		
						
					</div>
					<?php endif;?>
				</div>
			</div>
			<div class="col-sm-5 productdetails">
			<ul class="meta">
			<?php
					
						$types = wp_get_post_terms(get_the_id(), 'product_cat');
			
						$cart = true;
					
						if(isset($_GET['remove'])){
								unset($_SESSION['comparelist'][$_GET['remove']][$_GET['item']]);
								unset($compare[$_GET['remove']][$_GET['item']]);
								
						} 
						if(isset($_GET['tocompare'])){
							$_SESSION['comparelist'][$_GET['tocompare']][get_the_id()] = get_the_id();
					
						}
						foreach($types as $type){
							
							if($type->slug == 'instruments'){
							
							
								$firsttype = $type;
							}	
					 		if($type->slug == 'mouthpieces'){
							
					
								$firsttype = $type;
							}	
							if($type->slug == 'accessories'){
								
							
								$firsttype = $type;
							} 
						
						}
						
						$lastcat = $types[count($types)-1]; ?>
						
				<?php
				$_product_attributes = get_post_meta($post->ID,'_product_attributes', true);
	
				
				
				if(pmwoodwind_is_new_product(get_the_id()) && get_post_meta($post->ID, '_msrp', true) && ( isset( $_product_attributes['is_variation'] ) && $_product_attributes['is_variation'] === 0 ) ) {
					$msrp = get_post_meta($post->ID, '_msrp', true);
				?>
				<li>MSRP: <span><?php echo money_format("$ <span price='".$msrp."' class='priceitem'>%i</span>",$msrp);?></span></li>
				<?php
				}
				
				if(is_numeric($price) && ( isset( $_product_attributes['is_variation'] ) && $_product_attributes['is_variation'] === 0 ) ) :?>
				<li>Our Price: <span><?php echo money_format("$ <span price='".$price."' class='priceitem'>%i</span>",$price);?></span></li>
				
					<?php endif;?>		
					<?php if(pmwoodwind_product_get_serial(get_the_id())):?>
					
						<?php if($firsttype->slug == 'mouthpieces'):?>
							<li>PMW # : <span><?php echo pmwoodwind_product_get_serial(get_the_id());?></span></li>
						<?php else:?>
							<?php if(pmwoodwind_is_new_product(get_the_id())):?>
							<li>Product ID : <span><?php echo pmwoodwind_product_get_serial(get_the_id());?></span></li>
							
							<?php else:?>
							<li>Serial # : <span><?php echo pmwoodwind_product_get_serial(get_the_id());?></span></li>
							<?php endif;?>
							
						<?php endif;?>
						
				
				
					<?php endif;?>
				<?php
				$brand = pmwoodwind_product_get_brand(get_the_id());
				if($brand):?>
				<li>Brand: <span><?php echo $brand[0]->name;?></span></li>
				
				<?php endif;?>	
				
						<?php
						echo '<li><a href="/product_cat/instruments/'.$lastcat->slug.'">'.$lastcat->name.'</a></li>';
					?>
		
				<?php if(pmwoodwind_product_get_year(get_the_id())):?>
				<li>Year: <span><?php echo pmwoodwind_product_get_year(get_the_id());?></span></li>
				
					
				<?php endif;?>
				
				
				<?php if(pmwoodwind_get_inventory(get_the_id())):?>
				<li>Inventory: <span><?php echo pmwoodwind_get_inventory(get_the_id());?></span></li>
				
					
				<?php endif;?>	
			</ul>
			
			<?php if(get_post_meta($post->ID, 'wpcf-description', true)):?>
			<div class="description"><i class="fa fa-align-center" aria-hidden="true"></i> <?php echo get_post_meta($post->ID, 'wpcf-description', true);?></div>		
			<?php endif;?>
		
				<div class="action cart">

				<?php if($price):?>
				<?php if($status == 'sold'):?>
					Currently, our <?php the_title();?> is sold.<br/>View our latest <a href="/product_cat/instruments/<?php echo $lastcat->slug;?>"><?php echo $lastcat->name;?></a><br/> or browse all <a href="/product_cat/instruments/<?php echo $types[0]->slug;?>"><?php echo $types[0]->name;?>.</a> 
				<?php else:?>
						
				<?php
				
					do_action( 'woocommerce_single_product_summary' );
				?>
						
				<?php endif;?>
				<?php else:?>
					Currently, our <?php the_title();?> is unavailable.<br/>View our latest <a href="/product_cat/instruments/<?php echo $lastcat->slug;?>"><?php echo $lastcat->name;?></a><br/> or browse all <a href="/product_cat/instruments/<?php echo $types[0]->slug;?>"><?php echo $types[0]->name;?>.</a>
				<?php endif;?>
			</div>
			<?php
			$isnew = 'used';
			if(pmwoodwind_is_new_product(get_the_id())){
				$isnew = 'new';
			}
			?>
			<?php if( $lastcat->name == 'Instruments'):?>
			<h5 class="contactproduct">Please <a href="/contact" target="_blank">contact PM Woodwind</a> if you are interested in buying or selling <?php $isnew;?> <?php echo $lastcat->name;?>.</h5>
			<?php else:?>
			<h5 class="contactproduct">Please <a href="/contact" target="_blank">contact PM Woodwind</a> if you are interested in buying or selling <?php echo $lastcat->name;?>.</h5>
			<?php endif;?>
			<div class="shares">
			<h3 class="share"><i class="fa fa-navicon" aria-hidden="true"></i> Compare <?php the_title();?></h3>
			<ul class="compare" style="width: auto;margin: 20px 0px;">
				
				<?php 
				if(isset($_SESSION['comparelist'][$firsttype->slug][get_the_id()])){ ?>
					<li style="width: auto;"><a class="facebook social-icon" href="<?php echo get_permalink();?>?remove=<?php echo $firsttype->slug;?>&item=<?php echo get_the_id();?>" title="compare"><i class="fa fa-minus"></i> remove from compare</a></li>
				<?php } else {?>
				<li style="width: auto;"><a class="facebook social-icon" href="<?php the_permalink();?>?tocompare=<?php echo $firsttype->slug;?>" title="compare"><i class="fa fa-plus"></i> add to compare</a></li>
				<?php  } ?>
			</ul>
			</div>	
			<div class="shares">
			<h3 class="share"><i class="fa fa-share-alt" aria-hidden="true"></i> Share <?php the_title();?></h3>
			<ul class="social-icons">
				<li><a class="facebook social-icon" href="#" onclick="javascript: window.open('https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink();?>'); return false;" title="Facebook" target="_blank"><i class="fa fa-facebook"></i></a></li>
				<li><a class="twitter social-icon" href="#" title="Twitter" onclick="javascript: window.open('https://twitter.com/home?status=Vulputate justo&nbsp;<?php the_permalink();?>'); return false;" target="_blank"><i class="fa fa-twitter"></i></a></li>
				<li><a class="pinterest social-icon" href="#" onclick="javascript: window.open('https://pinterest.com/pin/create/button/?url=<?php the_permalink();?>'); return false;" title="Pinterest" target="_blank"><i class="fa fa-pinterest"></i></a></li>
				<li><a class="gplus social-icon" href="#" onclick="javascript: window.open('https://plus.google.com/share?url=<?php the_permalink();?>'); return false;" title="Google +" target="_blank"><i class="fa fa-google-plus"></i></a></li>
				<li><a class="linkedin social-icon" href="#" onclick="javascript: window.open('https://www.linkedin.com/shareArticle?mini=true&amp;url=<?php the_permalink();?>'); return false;" title="LinkedIn" target="_blank"><i class="fa fa-linkedin"></i></a></li>
			</ul>
			</div>				
			</div>
		<?php
		endwhile;
		?>
			</div>
		

		</div>

	<div class="row" style="margin-top: 100px;">
		<div class="col-sm-12">
			<?php the_content();?>
		</div>
	</div>
	<div class="row">
			<div class="col-sm-12 cd-gallery ">
			<div class="similar">
			<h4><span>Your <?php echo $firsttype->name;?> Compare List</span></h4>
			
			<?php
	
			
			$compare = array();
				
				if ( isset( $_SESSION['comparelist'] ) ) {
					$comparelist = $_SESSION['comparelist'];

					$compare = $comparelist[$firsttype->slug];
				}
			
			echo '<ul class="comparelist">';
			if ($compare) :
			foreach ( $compare as $comp) :
			
			$price = pmwoodwind_product_main_price($comp);
			$status = $price;
			if(is_numeric($price)){
				$status = 'sale';
			}
				$isnew = 'used';
			if(pmwoodwind_is_new_product(get_the_id())){
				$isnew = 'new';
			}
			$types = wp_get_post_terms($comp, 'product_cat');
			$filters = '';
			foreach($types as $type){
				$filters .= ' filter'.$type->term_id;
			}
				?>
				<li class="mix <?php echo $isnew;?> <?php echo $status;?> <?php echo $filters;?> <?php echo pmwoodwind_product_get_serial($comp);?> <?php get_the_title($comp);?>">
					<a href="<?php echo get_permalink($comp);?>" title="<?php echo get_the_title($comp);?>"><?php echo get_the_post_thumbnail( $comp, 'main_image', array( 'class' => 'main-image zoom' ) ); ?></a>
						<h5>
						<a href="<?php  echo  get_permalink($comp);?>"><?php  echo  get_the_title($comp);?></a>
						<span class="price <?php echo $price;?>"><?php
						if(is_numeric($price)){
							echo money_format("$ %i",$price);
						} else {
							echo $price;
						}
						?></span>
							</h5>
				</li>
				<?php
			endforeach;	
			?><li class="mix all">
					<a href="/compare/?list=<?php echo $firsttype->slug;?>">
					<?php echo get_the_post_thumbnail( get_the_ID(), 'main_image', array( 'class' => 'main-image zoom' ) ); ?>
					<span class="over">
					<i class="fa fa-navicon" aria-hidden="true"></i>
			 </a>
						</span>
						<h5>
						<a href="/compare/?list=<?php echo $firsttype->slug;?>">
						compare</a>
							</h5>
				</li><?php
			
			else:
			?><li class="mix all">
					
					<?php echo get_the_post_thumbnail( get_the_ID(), 'main_image', array( 'class' => 'main-image zoom' ) ); ?>
					<span class="over">
					<i class="fa fa-navicon" aria-hidden="true"></i>
			
						</span>
						<h5>
					
						your list is empty
							</h5>
				</li><?php
			endif;

					echo '</ul>';		
			?>
			</div>
			</div>
			
	</div>

	</div>
	



	
	<script>
jQuery(function(){
  jQuery('.comparelist').mixItUp();
});
</script>

<?php get_footer();?>
