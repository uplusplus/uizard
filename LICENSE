<?php

	/**
     * @author Chonghyun Lee
     * @last update   2011/03/07 
     **/
	
	include "./for_product/dbconn.inc";

    header("Content-type: text/xml;charset=utf-8");
	header("Cache-Control: no-cache, must-revalidate");
	header("Pragma: no-cache");

  	$barcode = $_GET['barcode'];
  	$productSrl = $_GET['product_srl'];
  	$stockCnt = $_GET['stock_count'];
  	$memberSrl = $_GET['member_srl'];
  	
  	$currentTime = date("ymdh");
  	  	
  	$transmitResult = 0;
  	  	
  	$checkQuery = "select * from `dbsolcreation` . `xe_shopxe_stock` where `xe_shopxe_stock` . `product_srl`=$productSrl and `xe_shopxe_stock` . `member_srl`=$memberSrl;";
		  	   	  	
  	$result = mysql_query($checkQuery, $conn);
  	
  	if (mysql_num_rows($result) != 0) {
  	  	$row = mysql_fetch_array($result);
		
		if($row['total_stock'] != 0) {
			$row['total_stock'] = 0;
		}
		
  		$newTotalStock = $row['total_stock'] + $stockCnt;
		
  		$updateQuery = "update `dbsolcreation` . `xe_shopxe_stock` 
  						set `xe_shopxe_stock` . `total_stock`=$newTotalStock 
  						where `xe_shopxe_stock` . `product_srl`=$productSrl and `xe_shopxe_stock` . `member_srl`=$memberSrl;";
  		$updateResult = mysql_query($updateQuery, $conn);
  		if ($updateResult){
  			$transmitResult = 1;
  		}
  	}else {
  		$insertQuery = "insert into `dbsolcreation` . `xe_shopxe_stock` (`xe_shopxe_stock` . `member_srl`, 
  																		 `xe_shopxe_stock` . `product_srl`,  
  																		 `xe_shopxe_stock` . `total_stock`,
  																		 `xe_shopxe_stock` . `regdate`)    
  						values ( $memberSrl, $productSrl, $stockCnt, $currentTime);";
  		
  		$insertResult = mysql_query($insertQuery, $conn);
  		if ($insertResult) {
  			$transmitResult = 1;
  		}
  	}
  	
  	 mysql_close($conn);
  	 
  	 $resultXML = <<<EOD
<?xml version="1.0" encoding="UTF-8"?>
<product>
<barcode>$barcode</barcode>
<result>$transmitResult</result>
</product>
EOD;

  	echo $resultXML;
	    
?>
