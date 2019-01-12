<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProjectRepository")
 */
class Project
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=250)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=250)
     */
    private $author;

    /**
     * @ORM\Column(type="integer")
     */
    private $likes;

    /**
     * @ORM\Column(type="float")
     */
    private $currentMoney;

    /**
     * @ORM\Column(type="integer")
     */
    private $neededMoney;

    /**
     * @ORM\Column(type="integer")
     */
    private $donations;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateCreation;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateDeadline;

    /**
     * @ORM\Column(type="string", length=250)
     */
    private $image;

    /**
     * @ORM\Column(type="string", length=250)
     */
    private $category;

    public function getId()
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getLikes(): ?int
    {
        return $this->likes;
    }

    public function setLikes(int $likes): self
    {
        $this->likes = $likes;

        return $this;
    }

    public function getCurrentMoney(): ?float
    {
        return $this->currentMoney;
    }

    public function setCurrentMoney(float $currentMoney): self
    {
        $this->currentMoney = $currentMoney;

        return $this;
    }

    public function getNeededMoney(): ?int
    {
        return $this->neededMoney;
    }

    public function setNeededMoney(int $neededMoney): self
    {
        $this->neededMoney = $neededMoney;

        return $this;
    }

    public function getDonations(): ?int
    {
        return $this->donations;
    }

    public function setDonations(int $donations): self
    {
        $this->donations = $donations;

        return $this;
    }

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTimeInterface $dateCreation): self
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    public function getDateDeadline(): ?\DateTimeInterface
    {
        return $this->dateDeadline;
    }

    public function setDateDeadline(\DateTimeInterface $dateDeadline): self
    {
        $this->dateDeadline = $dateDeadline;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): self
    {
        $this->category = $category;

        return $this;
    }
}
