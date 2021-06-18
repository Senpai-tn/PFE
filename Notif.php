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
<input type=hidden id=ref value="<?php echo $_GET['ref']; ?>" />
<input type=hidden id=value value="<?php echo $_GET['value']; ?>" />
<input type=hidden id=idStation value="<?php echo $_GET['idStation']; ?>" />
<?php
include_once 'Controller/ConnectionController.php';
$c = new ConnectionController();
$conn = $c->Connect();
$ref = $_GET['ref'];
$value = $_GET['value'];
$type = '';
if ($ref[strlen($ref) - 1] == 1) {
    $type = 'temp';
} elseif ($ref[strlen($ref) - 1] == 2) {
    $type = 'press';
} else {
    $type = 'debit';
}

$sql = "INSERT INTO data (ref	,value) VALUES ('$ref',$value)";
if ($conn->query($sql) === true) {
    echo 'success';
} else {
    echo 'error';
}
?>
		<script type="text/javascript">
        var ref = $("#ref").val();
        var value = $("#value").val();
        var idStation = $("#idStation").val();
        var type = "<?php echo $type; ?>";
        var conn;
        var msg = JSON.stringify({ref:ref,value:value,idStation:idStation,type:type});
        console.log('====================================');
        console.log(msg);
        console.log('====================================');
		jQuery(function($){
			// Websocket
			conn = new WebSocket('ws://localhost:8080');
            conn.onopen = function(e) {
                console.log("Connection established!");
                conn.send(
                JSON.stringify({
                  type: 'chat',
                  chat_msg: msg ,
                }),
              )
              document.write(" Data saved");
            };
            conn.onmessage = function(e) {
                console.log(e.data);
            };

            



		});
		</script>
	</div>
</body>
</html>