<?php

namespace App\Controller;

use App\Entity\Project;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DonateController extends Controller
{
    /**
     * @Route("/donate/{id}", name="donate")
     */
    public function index($id)
    {
		$project = $this->getDoctrine()
			->getRepository(Project::class)
			->find($id);

		$user = $this->getUser();
		$username = $user ? $user->getUsername() : "";
		$notifications = [];

        return $this->render('donate/donate.html.twig', [
			'username' => $username,
			'notifications' => $notifications,
			'project' => $project
        ]);
    }

	/**
	 * @Route("/donate/{id}/confirm", name="confirm-donation")
	 */
	public function confirm($id)
	{
		$this->denyAccessUnlessGranted('ROLE_USER', null, 'Unable to access this page!');

		$project = $this->getDoctrine()
			->getRepository(Project::class)
			->find($id);

		$user = $this->getUser();
		$username = $user ? $user->getUsername() : "";
		$notifications = [];

		return $this->render('donate/confirm.html.twig', [
			'username' => $username,
			'notifications' => $notifications,
			'project' => $project
		]);
	}
}
