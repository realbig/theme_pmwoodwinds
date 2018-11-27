<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<base href="">
	<title>PM Woodwind Repair: Saxophone Repair,Used Saxophones,Selmer,Mark VI,Paul Maslin,Conn,Alto Saxophone,Tenor Saxophone,Instruments,Soprano Saxophone,Bari Saxophone</title>
	<!-- CSS -->
	<link rel="stylesheet" href="<?php bloginfo( 'template_url' ); ?>/assets/css/bootstrap.css">
	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo( 'template_url' ); ?>/assets/lightGallery/css/lightgallery.css">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo( 'template_url' ); ?>/assets/rs-plugin/css/settings.css">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo( 'template_url' ); ?>/assets/css/style.css">
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css">
	
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
	<?php wp_head();?>
</head>
<body data-spy="scroll" data-target=".nav-container" data-offset="80" class="<?php echo get_the_id();?>">
	
	<!-- Header Bar -->
	<div id="home" class="navigation-bar scroll-BG">
		<div class="container">
			<div class="row">
				<div class="col-xs-8 col-sm-10 col-md-2 logo-container">
					<a href="<?php bloginfo( 'url' ); ?>" title="Saxophone Repair,Used Saxophones,Selmer,Mark VI,Paul Maslin,Conn,Alto Saxophone,Tenor Saxophone,Instruments,Soprano Saxophone,Bari Saxophone">
						<img src="<?php bloginfo( 'template_url' ); ?>/assets/img/elements/logo.png" alt="Saxophone Repair,Used Saxophones,Selmer,Mark VI,Paul Maslin,Conn,Alto Saxophone,Tenor Saxophone,Instruments,Soprano Saxophone,Bari Saxophone">
					</a>
				</div>
				
				<div class="col-sm-0 col-md-9 nav-container">
				<?php
					wp_nav_menu( array(
					'theme_location' => 'primary',
					 'container' => 'ul',
					 'menu_class'     => 'main-nav nav',
					 'menu_id'     => 'main-nav',
					) );
					   global $woocommerce;
						$items = count($woocommerce->cart->get_cart());

					?>
				</div>

				<div class="col-xs-4 col-sm-2 col-md-1 cloud-container">
				<ul class="rightnav">
						<li><a class="" href="javascript:opensearch()"><i class="fa fa-search" aria-hidden="true"></i></a></li>
						<li class="hassubs"><a class="" href="/shopping-cart"><?php if($items > 0):?><span class="cartcount"><?php echo $items;?></span><?php endif;?><i class="fa fa-shopping-basket" aria-hidden="true"></i></a>
							
						</li>

					</ul>
					
					<i id="menu-button" class="flaticon-menu51 menu-btn"></i>
				</div>
			</div>
		</div>
	</div>
	<div id="search">
		<img src="/wp-content/themes/pmwoodwind/assets/img/elements/logo-2.png"/>
		<?php echo do_shortcode("[wcas-search-form]");?>
		<span onclick="closesearch();" class="close">x</span>
	</div>
