<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class SearchController extends Controller
{
    /**
     * @Route("/search", name="search")
     */
    public function index()
    {
		$user = $this->getUser();
		$username = $user ? $user->getUsername() : "";
		$notifications = [];

        return $this->render('search/search.html.twig', [
            'username' => $username,
			'notifications' => $notifications
        ]);
    }
}
