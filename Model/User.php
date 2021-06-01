<?php
class User
{
    public $id,
        $username,
        $login,
        $email,
        $tel,
        $password,
        $roles,
        $created_at,
        $isEnabled;

    function __construct(
        $id,
        $username,
        $login,
        $email,
        $tel,
        $password,
        $roles
    ) {
        $this->id = $id;
        $this->username = $username;
        $this->login = $login;
        $this->email = $email;
        $this->tel = $tel;
        $this->password = $password;
        $this->roles = $roles;
        $this->created_at = date('Y-m-d H:i:s');
        $this->isEnabled = 1;
    }
}

?>
