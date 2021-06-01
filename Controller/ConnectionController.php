<?php
class ConnectionController
{
    public function __construct()
    {
    }

    public function Connect()
    {
        $servername = 'localhost';
        $username = 'root';
        $password = '';
        $dbname = 'PFE';
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die('Connection failed: ' . $conn->connect_error);
        }
        return $conn;
    }
}
?>
