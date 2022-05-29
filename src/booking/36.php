<?php
$array = file_get_contents('php://input');
$headers = stream_context_create(
	array(
		'http' => array(
			'method'  => 'POST',

			'content' => http_build_query(json_decode($array)),
		)
	)
);

echo file_get_contents('http://questreality.ru/api/order/36', false, $headers);

