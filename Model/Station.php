<?php
class Station
{
    public $id, $name, $region, $gouvernorat, $created_at, $isEnabled;

    function __construct(
        $id,
        $name,
        $region,
        $gouvernorat,
        $created_at,
        $isEnabled
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->region = $region;
        $this->gouvernorat = $gouvernorat;
        $this->created_at = $created_at;
        $this->isEnabled = $isEnabled;
    }
}
?>
