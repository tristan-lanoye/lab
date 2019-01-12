<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixture extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder) {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $els = [
            [
                "username" => "admin",
                "password" => "0000",
                "email" => "no-reply@admin.com",
                "score" => 9999,
            ],
            [
                "username" => "user01",
                "password" => "0000",
                "email" => "no-reply@user01.com",
                "score" => 9999,
            ],
            [
                "username" => "user02",
                "password" => "0000",
                "email" => "no-reply@user02.com",
                "score" => 9999,
            ],
        ];

        foreach ($els as $el) {
            $user = new User();

            $user->setUsername($el['username']);
            $user->setPassword($this->encoder->encodePassword($user, $el['password']));
            $user->setEmail($el['email']);
            $user->setScore($el['score']);

            $manager->persist($user);
            $manager->flush();
        }
    }
}
