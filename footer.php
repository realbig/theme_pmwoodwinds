<!-- Footer -->
	<div class="footer">
		<div class="container">
			<div class="row">
				<div class="col-sm-3 contact">
					<h4>Contact</h4>
					<p>PM Woodwind Repair, Inc.<br>
					822 Custer Ave.<br>
					Evanston, IL 60202<br>
					Phone: (847) 869-7049<br>
					<a href="mailto:contact@pmwoodwind.com" style="color:#ffffff">contact@pmwoodwind.com</a>
					</p>
					<p>
					<a class="" target="_blank" style="font-size: 24px;" href="https://www.facebook.com/pmwoodwind/"><i class="fa fa-facebook" aria-hidden="true"></i></a>
					<a class="" target="_blank" style="font-size: 24px;" href="https://twitter.com/PM_Woodwind"><i class="fa fa-twitter" aria-hidden="true"></i></a>
					<a class="" target="_blank" style="font-size: 24px;" href="https://www.instagram.com/pmwoodwind/"><i class="fa fa-instagram" aria-hidden="true"></i></a>
					</p>
				</div>

				<div class="col-sm-3 ">
					<h4>Services</h4>
					
						<?php wp_nav_menu( array(
							'container' => false,
							'menu_class' => 'clearfix menubottom',
							'theme_location' => 'footer_services',
						) ); ?>
					
					<h4>Products</h4>
					
						<?php wp_nav_menu( array(
							'container' => false,
							'menu_class' => 'clearfix menubottom',
							'theme_location' => 'footer_products',
						) ); ?>
					
				</div>
				
				<div class="col-sm-3 instagram">
					<h4>Facebook</h4>
					<iframe style="margin-top:20px;position:relative;" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpmwoodwind&amp;tabs&amp;width=240&amp;height=154&amp;small_header=true&amp;adapt_container_width=true&amp;hide_cover=true&amp;show_facepile=true&amp;appId" scrolling="no" allowtransparency="true" width="240" height="154" frameborder="0"></iframe>
				</div>

				<div class="col-sm-3 subscribe">
					<h4>Stay Connected</h4>
					<p>Connect with me and get latest offers</p>
					<!-- Begin MailChimp Signup Form -->
					<div id="mc_embed_signup">
						<form action="#" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate="novalidate">
						    <div id="mc_embed_signup_scroll">
								<div class="mc-field-group">
									<input value="" name="EMAIL" class="required email emailinput" id="mce-EMAIL" placeholder="Your email" aria-required="true" type="email">
								</div>
								<div id="mce-responses" class="clear">
									<div class="response" id="mce-error-response" style="display:none"></div>
									<div class="response" id="mce-success-response" style="display:none"></div>
								</div>
								<div class="clear"><button type="submit" name="subscribe" id="mc-embedded-subscribe" class="button"><i class="flaticon-envelope32"></i> <span>Subscribe to PM</span></button></div><!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
						    	<div style="position: absolute; left: -5000px;"><input name="b_94c004fbd08face605b799ad9_60beb53d8e" tabindex="-1" value="" type="text"></div>
						    </div>
						</form>
					</div>
					<!--End mc_embed_signup-->
				</div>
			</div>
			<!-- Footer Bottom -->
			<div class="row footer-bottom">
				<div class="col-sm-5 copyright">
					<p>© <?php echo date('Y');?> by <a href="http://pmwoodwind.com">pmwoodwind.com</a>. Designed by <a title="web development" href="http://www.softicious.com">Softicious</a></p>
				</div>
				<div class="col-sm-5 col-sm-push-2 menu-footer">
					
					<?php wp_nav_menu( array(
						'container' => false,
						'menu_class' => 'clearfix',
						'theme_location' => 'footer_bottom',
					) ); ?>
					
				</div>
				<div class="col-sm-2 col-sm-pull-5 logo-footer">
					<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/logo-2.png" alt="Logo">
				</div>
			</div>
		</div>
	</div>

	<!-- ======== JavaScript ======== -->
	<?php wp_footer();?>

	<?php if ( get_post_type() == 'media' ) : 

		if ( function_exists( 'woocommerce_photoswipe' ) ) : 
			woocommerce_photoswipe();
		endif;

	endif; ?>

</body></html>