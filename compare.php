<?php
/**
 * Template name:Compare
 */
 get_header();?>

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
		$comparelist = $_SESSION['comparelist'];
		if(isset($_GET['list'])){
			$compare[$_GET['list']] = $comparelist[$_GET['list']];
		} else {
			$compare = $comparelist;
		}
		if(isset($_GET['remove'])){
			unset($_SESSION['comparelist'][$_GET['remove']][$_GET['item']]);
			unset($compare[$_GET['remove']][$_GET['item']]);
		} 
	
		foreach($compare as $l=>$list):
			if(empty($list)){
				unset($_SESSION['comparelist'][$l]);
				unset($compare[$l]);

			}
		endforeach;
		foreach($compare as $l=>$list):?>
		
		<h3 style="margin:20px 0px;"><?php echo ucfirst(strtolower($l));?> list:</h3>
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
						<th>Type</th>
						<th class="remove"></th>
					</tr>	
				</thead>
				<tbody>
					<? foreach($list as $item):
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
							<td><a href="<?php echo get_permalink($item);?>" title="<?php echo get_the_title($item);?>"><?php echo get_the_post_thumbnail( $item, 'main_image', array( 'class' => 'main-image zoom' ) ); ?></a></td>
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
							<td><?php echo $lastcat->name;?></td>
							<td class="remove"><a style="color: #ed492e; "href="<?php echo get_permalink();?>?remove=<?php echo $l;?>&item=<?php echo $item;?>"><i class="fa fa-times"></i> remove</a></td>
				
						</tr>
					<? endforeach;?>
					<tfoot>
						<tr style="background: #1e1e1e;color: #fff;">
						<th>Image</th>
						<th>Product</th>
						<th>Price</th>
						<th>Inventory</th>
						<th>Brand</th>
						<th>Serial</th>
						<th>Year</th>
						<th>Type</th>
						<th class="remove"></th>
						</tr>
					
				</tfoot>
				</tbody>
		</table>
		<? endforeach;?>
	</div>
	</div>
	<script>
		function PrintElem(elem)
	{
		var mywindow = window.open('', 'PRINT', 'height=800,width=1020');
		
		mywindow.document.write('<html><head><title>Compare Lists</title>');
		mywindow.document.write( "<link rel=\"stylesheet\" href=\"<?php echo THEME_URL; ?>/assets/css/print.css\" type=\"text/css\" media=\"print\"/>" );
		mywindow.document.write('</head><body >');
		mywindow.document.write('<center><img src="<?php echo THEME_URL; ?>/dist/assets/img/elements/logo.png" alt="Saxophone Repair,Used Saxophones,Selmer,Mark VI,Paul Maslin,Conn,Alto Saxophone,Tenor Saxophone,Instruments,Soprano Saxophone,Bari Saxophone"/></center>');
		mywindow.document.write('<h1 style="text-align:center">Compare Lists</h1>');
		
		var printhtml = document.getElementById(elem);
	

		mywindow.document.write(printhtml.innerHTML);
		mywindow.document.write('<h1 style="text-align:center"><?php bloginfo( 'url' ); ?></h1>');
		mywindow.document.write('</body></html>');

		mywindow.document.close(); // necessary for IE >= 10
		mywindow.focus(); // necessary for IE >= 10*/

		mywindow.print();
		mywindow.close();

		return true;
	}
	</script>
	<?php get_footer();?>