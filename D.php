<?php
$session = mt_rand(1, 999); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
<div id="wrapper">
		<div id="chat_output"></div>
        
		<img id="chat_input" onload="$(this).data('loaded', 'loaded');" src="assets/img/custom-select.png" />
		<script type="text/javascript">
        var conn;
		jQuery(function($){
			// Websocket
			conn = new WebSocket('ws://localhost:8080');
            conn.onopen = function(e) {
                console.log("Connection established!");
                conn.send(
                JSON.stringify({
                  type: 'chat',
                  user_id: 15151,
                  chat_msg: "test",
                }),
              )
              window.location.href = 'index.php';
            };

            conn.onmessage = function(e) {
                console.log(e.data);
            };

            



		});
		</script>
	</div>
</body>
</html>