<?php
class Sensor
{
    public $ref, $type, $created_at, $idStation;

    function __construct($ref, $type)
    {
        $this->ref = $ref;
        $this->type = $type;
        $this->created_at = date('Y-m-d H:i:s');
    }
}
?>
