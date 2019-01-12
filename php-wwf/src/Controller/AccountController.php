<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AccountController extends Controller
{
    /**
     * @Route("/profile", name="profile")
     */
    public function profile()
    {
        $user = $this->getUser();
		$username = $user ? $user->getUsername() : "";
		$notifications = [];

        return $this->render('account/profile.html.twig', [
            'username' => $username,
            'notifications' => $notifications
        ]);
    }
}
