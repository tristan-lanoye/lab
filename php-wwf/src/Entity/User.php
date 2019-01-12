<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface, \Serializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=155, unique=true)
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=155)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=155, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="integer")
     */
    private $score;





    public function getId()
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(int $score): self
    {
        $this->score = $score;

        return $this;
    }


    public function getRoles () {
        return [
            'ROLE_USER'
        ];
    }

    public function getSalt() { }

    public function eraseCredentials() { }

    public function serialize() {
        return serialize([
            $this->id,
            $this->username,
            $this->email,
            $this->password,
        ]);
    }

    public function unserialize($string) {
        list (
            $this->id,
            $this->username,
            $this->email,
            $this->password
            ) = unserialize($string, ['allowed_classes' => false]);
    }
}
