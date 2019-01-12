<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class ExploreController extends Controller
{
    /**
     * @Route("/explore", name="explore")
     */
    public function explore(SessionInterface $session) {
    	$user = $this->getUser();
    	$username = $user ? $user->getUsername() : "";
        $notifications = [];

        return $this->render('explore/explore.html.twig', [
            'username' => $username,
            'notifications' => $notifications
        ]);
    }
}







