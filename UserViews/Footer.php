</div>
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <!-- ============================================================== -->
   
    <!-- Bootstrap tether Core JavaScript -->
    <script src="assets/plugins/bootstrap/js/popper.min.js"></script>
    <script src="assets/plugins/bootstrap/js/bootstrap.min.js"></script>
    <!-- slimscrollbar scrollbar JavaScript -->
    <script src="assets/UserAssets/js/jquery.slimscroll.js"></script>
    <!--Wave Effects -->
    <script src="assets/UserAssets/js/waves.js"></script>
    <!--Menu sidebar -->
    <script src="assets/UserAssets/js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="assets/plugins/sticky-kit-master/dist/sticky-kit.min.js"></script>
    <!--Custom JavaScript -->
    <script src="assets/UserAssets/js/custom.min.js"></script>
    <!-- ============================================================== -->
    <!-- This page plugins -->
    <!-- ============================================================== -->
    <!--sparkline JavaScript -->
    <script src="assets/plugins/sparkline/jquery.sparkline.min.js"></script>

    <!-- ============================================================== -->
    <!-- Style switcher -->
    <!-- ============================================================== -->
    <script src="assets/plugins/styleswitcher/jQuery.style.switcher.js"></script>
    <script type="text/javascript">
        var conn;
		jQuery(function($){
			// Websocket
			conn = new WebSocket('ws://localhost:8080');
            conn.onopen = function(e) {
                console.log("Connection established!"); 
            };

            conn.onmessage = function(e) {
                conn.onmessage = function(e) {
                var userStation = <?php echo $u->idStation; ?>;
                var d = JSON.parse(e.data);
                var msg = JSON.parse(d.msg);
                console.log('========Footer=============');
                console.log(msg);
                console.log('====================================');
                console.log('');
                console.log('');
             
                var checkInterval=false;
                if((msg.type == "temp")&&((msg.value > 40 )||(msg.value < 20 ))) 
                {
                    checkInterval = true;
                }   
                

                if((msg.type == "press")&&((msg.value > 40 )||(msg.value < 20 ))) 
                {
                    checkInterval = true;
                }

                if((msg.type == "debit")&&((msg.value > 40 )||(msg.value < 20 ))) 
                {
                    checkInterval = true;
                }
                
                if(checkInterval)
                {
                    if(msg.idStation == userStation)
                {
                    $("#alert").removeClass("hidden");
                    $("#alert").text(" the sensor "+msg.ref+" of type "+msg.type+" in the station "+msg.idStation+" has value "+msg.value);
                    var audioElement = document.createElement('audio');
                    audioElement.setAttribute('src', 'assets/audio/moonless-591.mp3');
                    audioElement.play();
                    var indice ; 
                    switch (msg.type) {
                        case "temp":
                            indice=0;
                            break;
                        case "press":
                            indice=1;
                            break;
                        case "debit":
                            indice=2;
                            break;
                        default:
                            break;
                    }
                    addData(myChart,new Date().getHours(),indice,msg.value);
                }   
                }
                
                      
            };   
            };
		});
		</script>
</body>

</html>