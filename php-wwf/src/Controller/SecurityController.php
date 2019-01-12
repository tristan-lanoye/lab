<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class SecurityController extends Controller
{
    /**
     * @Route("/login", name="login")
     */
    public function login(SessionInterface $session, Request $request, AuthenticationUtils $utils)
    {
        $user = $this->getUser();
		$username = $user ? $user->getUsername() : "";
		$notifications = [];

        if(!$user) {
            $session->set('loggedIn', false);
            $session->set('username', '');
        };

        $error = $utils->getLastAuthenticationError();
        $lastUsername = $utils->getLastUsername();

        return $this->render('security/login.html.twig', [
            'error' => $error,
            'username' => $username,
            'last_username' => $lastUsername,
			'notifications' => $notifications
        ]);
    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logout(SessionInterface $session)
    {
        $session->set('loggedIn', false);
        $session->set('username', '');
    }
}
