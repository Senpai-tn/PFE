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
                var userStation = <?php echo $u->idStation; ?>;
                var d = JSON.parse(e.data);
                var msg = JSON.parse(d.msg);
                if(msg.idStation == userStation)
                {
                    $("#alert").removeClass("hidden");
                    $("#alert").text(userStation);
                    var audioElement = document.createElement('audio');
                    audioElement.setAttribute('src', 'assets/audio/moonless-591.mp3');
                    audioElement.play();
                    addData(myChart,'55',(msg.value));
                }         
            };
		});
		</script>
</body>

</html>