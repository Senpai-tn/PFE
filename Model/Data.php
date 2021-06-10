<?php
class Data
{
    public $id, $ref, $value, $created_at;

    function __construct($ref, $value)
    {
        $this->ref = $ref;
        $this->value = $value;
    }
}
?>
