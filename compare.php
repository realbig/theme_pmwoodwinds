<?php
/**
 * Template name:Compare
 */
 get_header();

global $post;

?>

 	<div id="blog" class="blog-home container hover-section">
		<div class="category-head">
			<h4>Compare</h4>
			<div class="bars-animation">
				<img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/hicon.png" alt="PM">
			</div>
			<p>Your Compare Lists </p>
			<p><a href="#" style="font-size:30px;" onclick="javascript:PrintElem('comparelist');"><i class="fa fa-print"></i></a></p>
			
		</div>
		
	<div class="comparelist" id="comparelist" style="margin-bottom:40px;">
	 <style>
	  table img{
		  width:120px;
	  }
	  table {
		  font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
	  }
	   table th, table td{
		 text-align:center;
		 padding: .625em;		 
	   }   
	   
		@media print {
		  .remove{display:none;}
		}

	 </style>
	<?php 
		
		$list = array();
		
		if ( class_exists( 'WC_Products_Compare_Frontend' ) ) {
		
			$list = WC_Products_Compare_Frontend::get_compared_products();
			
			if ( is_array( $list ) ) {
			
				$list = array_filter( $list, function( $item ) {
					return $item !== 'false';
				} );
				
			}
			
		}
						
		if ( ! is_array( $list ) ) $list = array();
		
		$instruments = array();
		$mouthpieces = array();
		$accessories = array();
		
		foreach ( $list as $product_id ) {
			
			if ( pmwoodwind_is_instrument( $product_id ) ) {
				$instruments[] = $product_id;
			}

			if ( pmwoodwind_is_mouthpiece( $product_id ) ) {
				$mouthpieces[] = $product_id;
			}

			if ( pmwoodwind_is_accessory( $product_id ) ) {
				$accessories[] = $product_id;
			}
			
		}
		
		$type = 'instruments';
		
		if ( isset( $_GET['list'] ) && 
			$_GET['list'] ) {
			$type = strtolower( esc_attr( $_GET['list'] ) );
		}
		
		?>
		
		<?php if ( ! empty( $instruments ) && 
				 $type == 'instruments' ) : ?>
		
			<h3 class="section-title">Instruments list:</h2>
		
			<table style="font-size: 15px;width:100%;">
				<thead>
					<tr style="background: #1e1e1e;color: #fff;">
						<th>Image</th>
						<th>Product</th>
						<th>Price</th>
						<th>Inventory</th>
						<th>Brand</th>
						<th>Serial</th>
						<th>Year</th>
						<th class="remove"></th>
					</tr>	
				</thead>
				<tbody>
					<?php foreach($instruments as $item): setup_postdata( $item );
						$price = pmwoodwind_product_main_price($item);
						$status = $price;
						if(is_numeric($price)){
							$status = 'sale';
						}
							$isnew = 'used';
						if(pmwoodwind_is_new_product($item)){
							$isnew = 'new';
						}
						$types = wp_get_post_terms($item, 'product_type');
						$lastcat = $types[count($types)-1];
					?>
						<tr>
							<td><a href="<?php echo get_permalink($item);?>" title="<?php echo get_the_title($item);?>">
								<?php echo woocommerce_get_product_thumbnail( 'main_image' ); ?></a></td>
							<td><a style="color: #0e0b0b;" href="<?php echo get_permalink($item);?>"><?php echo get_the_title($item);?></a></td>
							<td style="text-transform:uppercase;"><?php
						if(is_numeric($price)){
							echo money_format("$ %i",$price);
						} else {
							echo $price;
						}
						?></td>
							<td><?php echo pmwoodwind_get_inventory($item);?></td>
							<td><?php
								$brand = pmwoodwind_product_get_brand($item);
								echo $brand[0]->name;
							?></td>
							<td><?php echo pmwoodwind_product_get_serial($item);?></td>
							<td><?php echo pmwoodwind_product_get_year($item);?></td>
							
							<td class="remove woocommerce-products-compare-compare-button">
								
								<label>
							
									<input type="checkbox" class="woocommerce-products-compare-checkbox" data-product-id="<?php echo esc_attr( $item ); ?>" checked id="woocommerce-products-compare-checkbox-<?php echo esc_attr( $item );?>" />

									<span class="checkmark remove" style="color: #ed492e">
										<i class="fa fa-times"></i> remove 
									</span>

								</label>
								
							</td>
				
						</tr>
					<?php 
					
					wp_reset_postdata();
					
					endforeach;?>
					<tfoot>
						<tr style="background: #1e1e1e;color: #fff;">
						<th>Image</th>
						<th>Product</th>
						<th>Price</th>
						<th>Inventory</th>
						<th>Brand</th>
						<th>Serial</th>
						<th>Year</th>
						<th class="remove"></th>
						</tr>
					
				</tfoot>
				</tbody>
			</table>
		
		<?php endif; ?>
		
		<?php if ( ! empty( $mouthpieces ) && 
				 $type == 'mouthpieces' ) : ?>
		
			<h3 class="section-title">Mouthpieces list:</h2>
		
			<table style="font-size: 15px;width:100%;">
				<thead>
					<tr style="background: #1e1e1e;color: #fff;">
						<th>Image</th>
						<th>Product</th>
						<th>Price</th>
						<th>Inventory</th>
						<th>Brand</th>
						<th>Serial</th>
						<th>Year</th>
						<th class="remove"></th>
					</tr>	
				</thead>
				<tbody>
					<?php foreach($mouthpieces as $item): setup_postdata( $item );
						$price = pmwoodwind_product_main_price($item);
						$status = $price;
						if(is_numeric($price)){
							$status = 'sale';
						}
							$isnew = 'used';
						if(pmwoodwind_is_new_product($item)){
							$isnew = 'new';
						}
						$types = wp_get_post_terms($item, 'product_type');
						$lastcat = $types[count($types)-1];
					?>
						<tr>
							<td><a href="<?php echo get_permalink($item);?>" title="<?php echo get_the_title($item);?>">
								<?php echo woocommerce_get_product_thumbnail( 'main_image' ); ?></a></td>
							<td><a style="color: #0e0b0b;" href="<?php echo get_permalink($item);?>"><?php echo get_the_title($item);?></a></td>
							<td style="text-transform:uppercase;"><?php
						if(is_numeric($price)){
							echo money_format("$ %i",$price);
						} else {
							echo $price;
						}
						?></td>
							<td><?php echo pmwoodwind_get_inventory($item);?></td>
							<td><?php
								$brand = pmwoodwind_product_get_brand($item);
								echo $brand[0]->name;
							?></td>
							<td><?php echo pmwoodwind_product_get_serial($item);?></td>
							<td><?php echo pmwoodwind_product_get_year($item);?></td>
							
							<td class="remove woocommerce-products-compare-compare-button">
								
								<label>
							
									<input type="checkbox" class="woocommerce-products-compare-checkbox" data-product-id="<?php echo esc_attr( $item ); ?>" checked id="woocommerce-products-compare-checkbox-<?php echo esc_attr( $item );?>" />

									<span class="checkmark remove" style="color: #ed492e">
										<i class="fa fa-times"></i> remove 
									</span>

								</label>
								
							</td>
				
						</tr>
					<?php 
					
					wp_reset_postdata();
					
					endforeach;?>
					<tfoot>
						<tr style="background: #1e1e1e;color: #fff;">
						<th>Image</th>
						<th>Product</th>
						<th>Price</th>
						<th>Inventory</th>
						<th>Brand</th>
						<th>Serial</th>
						<th>Year</th>
						<th class="remove"></th>
						</tr>
					
				</tfoot>
				</tbody>
			</table>
		
		<?php endif; ?>

		<?php if ( ! empty( $accessories ) && 
				 $type == 'accessories' ) : ?>
	
			<h3 class="section-title">Accessories list:</h2>
		
			<table style="font-size: 15px;width:100%;">
				<thead>
					<tr style="background: #1e1e1e;color: #fff;">
						<th>Image</th>
						<th>Product</th>
						<th>Price</th>
						<th>Inventory</th>
						<th>Brand</th>
						<th class="remove"></th>
					</tr>	
				</thead>
				<tbody>
					<?php foreach($accessories as $item): setup_postdata( $item );
						$price = pmwoodwind_product_main_price($item);
						$status = $price;
						if(is_numeric($price)){
							$status = 'sale';
						}
							$isnew = 'used';
						if(pmwoodwind_is_new_product($item)){
							$isnew = 'new';
						}
						$types = wp_get_post_terms($item, 'product_type');
						$lastcat = $types[count($types)-1];
					?>
						<tr>
							<td><a href="<?php echo get_permalink($item);?>" title="<?php echo get_the_title($item);?>">
								<?php echo woocommerce_get_product_thumbnail( 'main_image' ); ?></a></td>
							<td><a style="color: #0e0b0b;" href="<?php echo get_permalink($item);?>"><?php echo get_the_title($item);?></a></td>
							<td style="text-transform:uppercase;"><?php
						if(is_numeric($price)){
							echo money_format("$ %i",$price);
						} else {
							echo $price;
						}
						?></td>
							<td><?php echo pmwoodwind_get_inventory($item);?></td>
							<td><?php
								$brand = pmwoodwind_product_get_brand($item);
								echo $brand[0]->name;
							?></td>
							
							<td class="remove woocommerce-products-compare-compare-button">
								
								<label>
							
									<input type="checkbox" class="woocommerce-products-compare-checkbox" data-product-id="<?php echo esc_attr( $item ); ?>" checked id="woocommerce-products-compare-checkbox-<?php echo esc_attr( $item );?>" />

									<span class="checkmark remove" style="color: #ed492e">
										<i class="fa fa-times"></i> remove 
									</span>

								</label>
								
							</td>
				
						</tr>
					<?php 
					
					wp_reset_postdata();
					
					endforeach;?>
					<tfoot>
						<tr style="background: #1e1e1e;color: #fff;">
						<th>Image</th>
						<th>Product</th>
						<th>Price</th>
						<th>Inventory</th>
						<th>Brand</th>
						<th class="remove"></th>
						</tr>
					
				</tfoot>
				</tbody>
			</table>
		
		<?php endif; ?>
		
	</div>

		<h3 id="site-url-for-print" class="show-for-print" aria-hidden="true"><?php echo site_url(); ?></h3>

	</div>
	<script>
		
		var pmwoodwindPrint = function( mywindow ) {
			
			setTimeout( function() { // This runs ever so slightly too fast
				mywindow.print();
				mywindow.close();
			}, 10 );
			
		}
		
		function PrintElem(elem)
	{
		
		pmwoodwindPrint( window );

		return true;
	}
	</script>
	<?php get_footer();