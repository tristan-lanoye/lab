<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class UploadController extends Controller
{
    /**
     * @Route("/upload", name="upload")
     */
    public function upload(SessionInterface $session) {
    	$user = $this->getUser();
    	$username = $user ? $user->getUsername() : "";
        $notifications = [];

        return $this->render('upload/upload.html.twig', [
            'username' => $username,
            'notifications' => $notifications
        ]);
    }
}
