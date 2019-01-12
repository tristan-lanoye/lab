<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class SucceedFormController extends Controller
{
    /**
     * @Route("/upload/confirm", name="succeedForm")
     */
    public function upload(SessionInterface $session) {
    	$user = $this->getUser();
    	$username = $user ? $user->getUsername() : "";
		$notifications = [];

        return $this->render('succeedForm/succeedForm.html.twig', [
            'username' => $username,
            'notifications' => $notifications
        ]);
    }
}
