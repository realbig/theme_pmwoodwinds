<?php
/**
 * Template name:Home
 */
 get_header();?>


   <!-- Header Revolution Slider -->
	<div id="rev-slider" class="slider-container" style="overflow: visible; height: 527.2px;">
		<div class="slider revslider-initialised tp-simpleresponsive" id="revslider-661" style="height: 548px;">
			<ul style="display: block; overflow: hidden; width: 100%; height: 100%; max-height: none;" class="tp-revslider-mainul">
			<!-- First slide -->
 <?php
	 $sliders = get_posts(array(
		'numberposts'	=> -1,
		'post_type'		=> 'slider',

	));		
	$homesections = get_posts(array(
		'numberposts'	=> -1,
		'post_type'		=> 'homesection',
		'orderby' => 'menu_order',
		'order'   => 'ASC',

	));	

	$events = get_posts(array(
		'numberposts'	=> 1,
		'category'		=> 1,
		'post_type'		=> 'post',
		'meta_key'		=> 'wpcf-on-homepage',
		'orderby'		=> 'date',
		'order'			=> 'DESC',
		'meta_value'       => '1',
		'post_status'      => 'publish',
	));


	$p=0;

	foreach($sliders as $slider):	
	$_slide_background = wp_get_attachment_url( get_post_thumbnail_id($slider->ID) );
	$_slide_product = get_post_meta($slider->ID, '_slide_product', true)[0];
	$_slider_image = wp_get_attachment_url(get_post_meta($slider->ID, '_slider_image', true));

				$class = '';
			if($p == 0):
			$class = 'active';
			endif;
			?>
			<li data-transition="boxslide" data-slotamount="7" class="tp-revslider-slidesli slide<?php echo $p;?> <?php echo $class;?>" style="width: 100%; height: 100%; overflow: hidden;">
			
			   <div class="slotholder" style="width:100%;height:100%;"><div class="tp-bgimg defaultimg" data-bgfit="cover" data-bgposition="center center" data-bgrepeat="no-repeat" src="<?php echo $_slide_background;?>" data-src="<?php echo $_slide_background;?>" style="background-color: rgba(0, 0, 0, 0); background-repeat: no-repeat; background-image: url('<?php echo $_slide_background;?>'); background-size: cover; background-position: center center; width: 100%; height: 100%; opacity: 1; visibility: visible;"></div></div>
				
			   <div class="caption sft title tp-caption start" data-x="center" data-y="290" data-speed="700" data-start="1300" data-easing="easeOutBack" style="left: -60px;top: 50px;;width: 100%;text-align: center; visibility: visible; opacity: 1; transform: translate3d(0px, 0px, 0px);">
			   		 <img src="<?php echo $_slider_image;?>" style="top: 50px;position: relative;">
			   <?php echo $slider->post_title;?><small></small></div>
				
			   <div class="caption sfb paragraph tp-caption start" data-x="center" data-y="290" data-speed="700" data-start="1500" data-easing="easeOutBack" style="min-height: 0px; min-width: 0px; line-height: initial; border-width: 0px; margin: 0px; padding: 0px; letter-spacing: 0px; font-size: 11px;width: 100%;text-align: center;top: 255px; visibility: visible; opacity: 1; transform: translate3d(0px, 0px, 0px);">
					<?php
			
				$desc = $slider->post_content;
				$desc = preg_split('/(?<=[.?!])\s+(?=[a-z])/i', $desc);
				foreach($desc as $des){
					echo $des.'</br>';
				}
				?></div>

			   <div class="caption sfl button-rev tp-resizeme tp-caption start" data-x="center" data-hoffset="0" data-y="530" data-speed="700" data-start="1700" data-easing="" style="min-height: 0px; min-width: 0px; line-height: 14px; border-width: 0px; margin: 0px; padding: 0px; letter-spacing: 0px; font-size: 9px;left:0;width: 100%;text-align: center; top: 358.09px; visibility: visible; opacity: 1; transform: translate3d(0px, 0px, 0px);"><a href="<?php echo get_permalink($_slide_product);?>" style="min-height: 0px; min-width: 0px; line-height: 8px; border-width: 0px; margin: 0px; padding: 10px 17px; letter-spacing: 0px; font-size: 8px;"><i class="flaticon-playbutton22" style="min-height: 0px; min-width: 0px; line-height: 8px; border-width: 0px; margin: 0px; padding: 0px; letter-spacing: 0px; font-size: 8px;"></i> View Instrument ($<?php echo get_post_meta($_slide_product, '_price', true);?>)</a></div>


			

			</li>
<?php
$p++;
 endforeach;?>  
			</ul>
		<div class="tp-loader spinner0" style="display: none;"><div class="dot1"></div><div class="dot2"></div><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div><div class="tp-bannertimer" style="visibility: hidden; width: 0%;"></div></div>
		<?php if($events):?>
		<div id="eventsbg" style="border-bottom: 527.2px solid;"></div>
		<div id="events" style="width:25%;">
		<?php
			$event = $events[0];
		?>
			<h3 style="color: #6195e0;padding: 5px 0px;font-size: 16px;line-height: 16px;"><?php echo $event->post_title;?></h3>
			<h4><i class="fa fa-calendar" aria-hidden="true"></i> <?php echo strftime("%A, %d %B", get_post_meta($event->ID, 'wpcf-date', true));?></h4>
			<h5><i class="fa fa-user" aria-hidden="true"></i> <?php echo get_post_meta($event->ID, 'wpcf-event-author', true);?></h5>
			<p style="font-size: 16px;">for reservations call <?php echo get_post_meta($event->ID, 'wpcf-phone', true);?></p>
			 <div class="caption sfl button-rev tp-resizeme" style="top: -20px;position: relative;" data-x="center" data-hoffset="0" data-y="530" data-speed="700" data-start="1700" data-easing=""><a class="btn" style="font-size: 15px;padding: 10px 25px;" href="<?php echo get_permalink($events[0]);?>"><i class="flaticon-playbutton22"></i>Event Details</a></div>
		</div>
		<?php endif;?>
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
			<a href="/products/<?php echo $lastcat->slug;?>">
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
					<a class="case" href="/products/accessories/reeds/?show=new">
						<div class="disk-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/disk.png" alt="Disk">
						</div>
						<div class="case-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/case.png" alt="Case">
						</div>
						<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/rico.jpg" alt="Cover" class="img-responsive cover">
					</a>
					<h5>Rico Reserve Classic (<a href="/products/accessories/reeds/?show=new">reeds</a>)</h5>
				</div>
			</div>
			<div class="col-sm-3">
				<div class="album">
					<a class="case" href="/products/accessories/cases/?show=new">
						<div class="disk-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/disk.png" alt="Disk">
						</div>
						<div class="case-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/case.png" alt="Case">
						</div>
						<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hiscox.jpg" alt="Cover" class="img-responsive cover">
					</a>
					<h5>Hiscox Case (<a href="/products/accessories/cases/?show=new">Cases</a>)</h5>
				</div>
			</div>
			<div class="col-sm-3">
				<div class="album">
					<a class="case" href="/products/accessories/stands/?show=new">
						<div class="disk-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/disk.png" alt="Disk">
						</div>
						<div class="case-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/case.png" alt="Case">
						</div>
						<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/stand.jpg" alt="Cover" class="img-responsive cover">
						
					</a>
					<h5>Belmonte Stand (<a href="/products/accessories/stands/?show=new">Stands</a>)</h5>
				</div>
			</div>
			<div class="col-sm-3">
				<div class="album">
					<a class="case" href="/products/accessories/resonators/?show=new">
						<div class="disk-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/disk.png" alt="Disk">
						</div>
						<div class="case-wrapper">
							<img src="<?php echo THEME_URL; ?>/dist/assets/img/albums/case.png" alt="Case">
						</div>
						<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/brass.jpg" alt="Cover" class="img-responsive cover">
					</a>
					<h5>Screw-In Brass Domed (<a href="/products/accessories/resonators/?show=new">Resonators</a>)</h5>
				</div>
			</div>
		</div>
		<p style="margin:50px;text-align:center;"><a href="/products/accessories/?show=new" class="btnbluebig">Browse Accessories by Category</a></p>
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

     <div id="trd-testimonial" class="trd-testimonial">
	 <?php
	 $posts = get_posts(array(
		'numberposts'	=> 6,
		'post_type'		=> 'clients',
		'meta_key'		=> 'wpcf-show-in-home',
		'meta_value'	=> 'yes'
	));
	foreach($posts as $post):?>
	<div class="trd-testimonial-slides">
		<div class="trd-testimonial-text">
			<p><?php echo get_post_meta($post->ID, 'wpcf-testimonial', true);?></p>
		</div>
		<div class="trd-satisfied-user-info">
			<div class="trd-user-img-wrapper">
				<img src="<?php echo get_post_meta($post->ID, 'wpcf-image', true);?>" alt="<?php echo $post->post_title;?>">
			</div>           
			<h3><a href="<?php echo get_post_meta($post->ID, 'wpcf-link', true);?>" target="_blank"><?php echo $post->post_title;?></a></h3>
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
