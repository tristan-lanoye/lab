<?php

namespace App\Controller;

use App\Entity\Project;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class ProjectController extends Controller
{
    /**
     * @Route("/project/{id}", name="project")
     */
    public function project($id, SessionInterface $session)
    {
		$project = $this->getDoctrine()
			->getRepository(Project::class)
			->find($id);

		if (!$project) {
			throw $this->createNotFoundException(
				'No project found for id '.$id
			);
		}

		$date = $project->getDateDeadline();
		$now = new \DateTime();

		$diff = $date->diff($now);

		$user = $this->getUser();
		$username = $user ? $user->getUsername() : "";
		$notifications = [];

		return $this->render('project/project.html.twig', [
			'username' => $username,
			'notifications' => $notifications,
			'project' => $project,
			'daysLeft' => $diff->format('%R%d')
        ]);
    }
}
