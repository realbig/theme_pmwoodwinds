<?php
/**
 * Template name:Home
 */
 get_header();?>


   <?php 

	$homesections = get_posts(array(
		'numberposts'	=> -1,
		'post_type'		=> 'homesection',
		'orderby' => 'menu_order',
		'order'   => 'ASC',

	));


	echo do_shortcode( '[rev_slider alias="home"]' );

	?>

	<?php 
	
	$event = pmwoodwind_get_featured_event();

	if ( $event ) : ?>

	<div id="featured-event">

		<?php echo get_the_post_thumbnail( $event->ID, 'full' ); ?>

		<h3><?php echo get_the_title( $event->ID ); ?></h3>

		<?php if ( $event->post_type !== 'product' ) : 

			$date_format = get_option( 'date_format', 'F j, Y' );
			$time_format = get_option( 'time_format', 'g:i a' );
			$start_datetime = strtotime( get_post_meta( $event->ID, '_EventStartDate', true ) );
					
			if ( function_exists( 'tribe_get_option' ) ) : ?>
			
				<p class="event-start-date"><?php echo date( $date_format, $start_datetime ) . tribe_get_option( 'dateTimeSeparator', ' @ ' ) . date( $time_format, $start_datetime ); ?></p>
				
			<?php endif; 

			$organizers = array();
				
			if ( function_exists( 'tribe_get_organizer_ids' ) ) {

				$organizers = tribe_get_organizer_ids( $event->ID );

			}

			$organizer = false;

			if ( is_array( $organizers ) && 
				isset( $organizers[0] ) && 
				$organizers[0] ) {
				
				$organizer = $organizers[0];
				
			}

			if ( function_exists( 'tribe_get_organizer_phone' ) ) : ?>

				<p class="event-organizer-phone"><?php echo 'for reservations call ' . tribe_get_organizer_phone( $organizer ); ?></p>
		
			<?php endif;

			else : 

				echo apply_filters( 'the_content', get_post_meta( $event->ID, '_rbm_featured_text', true ) );

		endif; ?>

		<a href="<?php echo get_permalink( $event->ID ); ?>" class="btn">
			<?php if ( $event->post_type !== 'product' ) : ?> 
				Event Details
			<?php else : ?>
				Details
			<?php endif; ?>
		</a>

	</div>

	<?php endif; ?>

	</div>
	<div class="fullbg">
	<!-- New Releases -->
	<div id="new-releases" class="new-releases article container">
		<div class="row">

			<div class="col-md-12 info" style="text-align:center;">
				<?php
				global $wp_query;
				$front = get_post(2);
				echo $front->post_content;
				?>
				
			</div>


		</div>
	</div>
	</div>
	<?php foreach($homesections as $homesection):
			$sectionproducts = get_post_meta($homesection->ID,'_section_product',true);
			$sectionorder = get_post_meta($homesection->ID,'_section_order',true);
			$order = explode(',',$sectionorder);
		
	?>
		<div class="homesection">
			<div class="category-head">
				<h4><?php echo $homesection->post_title;?></h4>
				<div class="bars-animation">
					<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
				</div>
				<p><?php echo $homesection->post_content;?><p>
			</div>
			<div id="gallery" class="gallery-home clearfix">
				<?php 

			foreach($sectionproducts as $i=>$sectionproduct):
				$image = $order[$i];
				
				$gallery_images = explode( ',', get_post_meta( $sectionproduct, '_product_image_gallery', true ) );
			
			$types = wp_get_post_terms($sectionproduct, 'product_cat');
			foreach($types as $type){
				if($type->parent == 0){
					$main = $type->term_id;
				}
			}	
			foreach($types as $type){
				if($type->parent == $main){
					$lastcat = $type;
				}
			}

			?>
			<a href="<?php echo get_term_link( $lastcat->term_id, 'product_cat' ); ?>">
				<?php echo wp_get_attachment_image( $gallery_images[ $image - 1 ], 'home_grid', false, array( 'class' => 'img-responsive' ) ); ?>
				<p><?php echo $lastcat->name;?></p>
			</a>
			<?php endforeach;?>
			</div>	
		</div>	
<?php endforeach;?>

		<div id="latest-work" class="latest-work container hover-section">
		<div class="category-head">
			<h4>Accessories</h4>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
		<p><?php echo get_post_meta(2,'wpcf-accesories',true);?></p>
		</div><!-- Category Head -->

		<div class="row">
			<div class="col-sm-3">
				<div class="album">
					<a class="case" href="/products/accessories?_accessory_categories=reeds&_show=new">
						<div class="disk-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/disk.png" alt="Disk">
						</div>
						<div class="case-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/case.png" alt="Case">
						</div>
						<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/reeds.png" alt="Cover" class="img-responsive cover">
					</a>
					<h5>D’Addario Select Jazz Unfiled Alto Saxophone Reeds (<a href="/products/accessories?_accessory_categories=reeds&_show=new">Reeds</a>)</h5>
				</div>
			</div>
			<div class="col-sm-3">
				<div class="album">
					<a class="case" href="/products/accessories/?_accessory_categories=ligatures&_show=new">
						<div class="disk-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/disk.png" alt="Disk">
						</div>
						<div class="case-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/case.png" alt="Case">
						</div>
						<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/ligatures.png" alt="Cover" class="img-responsive cover">
					</a>
					<h5>Rovner Platinum Ligature (<a href="/products/accessories/?_accessory_categories=ligatures&_show=new">Ligatures</a>)</h5>
				</div>
			</div>
			<div class="col-sm-3">
				<div class="album">
					<a class="case" href="/products/accessories?_accessory_categories=stands&_show=new">
						<div class="disk-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/disk.png" alt="Disk">
						</div>
						<div class="case-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/case.png" alt="Case">
						</div>
						<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/stands.png" alt="Cover" class="img-responsive cover">
						
					</a>
					<h5>Hercules Alto/Tenor Stand (<a href="/products/accessories?_accessory_categories=stands&_show=new">Stands</a>)</h5>
				</div>
			</div>
			<div class="col-sm-3">
				<div class="album">
					<a class="case" href="/products/accessories?_accessory_categories=cases&_show=new">
						<div class="disk-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/disk.png" alt="Disk">
						</div>
						<div class="case-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/case.png" alt="Case">
						</div>
						<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hiscox.jpg" alt="Cover" class="img-responsive cover">
					</a>
					<h5>Hiscox Case (<a href="/products/accessories?_accessory_categories=cases&_show=new">Cases</a>)</h5>
				</div>
			</div>
		</div>
		<p style="margin:50px;text-align:center;"><a href="/products/accessories/?_show=new" class="btnbluebig">Browse Accessories by Category</a></p>
	</div>
	<!-- Tour Dates -->
	
	<!-- Gallery -->


	<!-- About -->
	
	<!-- Twitter Feed -->
	<div class="twitter-feed parallaxBG">
		<div class="container">
			<!-- Here will be added automatically the tweet -->
			<div id="tweet-example-1"><h3 style="color: #fff;text-align: center;">Please feel free to ask questions<br> about any of the used instruments or repair.</h3>
			<p style="text-align: center;"><a href="/contact" style="background:#ffffff;color:#000000;" class="btn">Send us a message</a></p>
			</div>
		</div>
	</div>


	<div id="blog" class="blog-home container hover-section">
		<div class="category-head">
			<h4>Testimonials</h4>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
			<p>Our Partners Testimonials. </p>
		</div>

     <div id="trd-testimonial" class="trd-testimonial row">
	 <?php
	 $posts = get_posts(array(
		'numberposts'	=> 6,
		'post_type'		=> 'clients',
		'meta_key'		=> 'wpcf-show-in-home',
		'meta_value'	=> 'yes',
		'orderby' => 'menu_order',
		'order' => 'ASC',
	));
	foreach($posts as $post):?>
	<div class="trd-testimonial-slides col-sm-12 col-md-3">
		<div class="trd-testimonial-text closed">
			<div class="testimonial-content closed">
				<p><?php echo get_post_meta($post->ID, 'wpcf-testimonial', true);?></p>
				
				<div class="read-more-container text-center">
					<a class="secondary btn" href="#">
						Read More
					</a>
				</div>
			</div>
		</div>
		<div class="trd-satisfied-user-info">
			
			<div class="trd-user-img-wrapper">
				<?php if ( ! get_post_meta( $post->ID, 'wpcf-image', true ) ) : ?>
					<?php echo wc_placeholder_img( 'thumbnail' ); ?>
				<?php else : 
				
					$dir = wp_upload_dir();
					$attachment_id = pmwoodwind_media_file_exists( str_replace( trailingslashit( $dir['baseurl'] ), '', get_post_meta( get_the_ID(), 'wpcf-image', true ) ) );
					echo wp_get_attachment_image( $attachment_id, 'thumbnail' ); 
					
				endif; ?>
			</div>
			
			<h3>
			
				<?php 

				$website_url = get_post_meta($post->ID, 'wpcf-link', true);

				if ( $website_url ) : ?>
			
					<a href="<?php echo get_post_meta($post->ID, 'wpcf-link', true);?>" target="_blank">
						
				<?php endif; ?>
						
						<?php echo $post->post_title;?>
				
				<?php if ( $website_url ) : ?>
				
					</a>
			
				<?php endif; ?>
			
			</h3>
			
		</div>

	</div>
     <?php endforeach;?>      
 
	</div>
	</div>
	
	
	<div class="brand-home">
	
		<div class="container">
			<div class="item">
				<a href="http://www.selmer.fr" target="_blank"><img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/selmer.jpg" alt="selmer"></a>
			</div>
			<div class="item">
				<a href="https://www.yamaha.com/en/" target="_blank"><img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/yamaha.jpg" alt="yamaha"></a>
			</div>
			<div class="item">
				<a href="http://www.yanagisawasax.co.jp/en/ " target="_blank"><img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/yanagisawa.jpg" alt="yanagisawa"></a>
			</div>
			<div class="item">
				<a href="http://www.julius-keilwerth.com/en/" target="_blank"><img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/keilwerth.jpg" alt="keilwerth"></a>
			</div>
			<div class="item">
				<a href="http://www.pmauriatmusic.com" target="_blank"><img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/pmauriat.jpg" alt="pmauriat"></a>
			</div>
			<div class="item">
				<a href="http://www.buffet-crampon.com/en/" target="_blank"><img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/buffet.jpg" alt="buffet"></a>
			</div>
		</div>
	</div>

<?php get_footer();?>
