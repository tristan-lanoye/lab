<?php

namespace App\Controller;

use App\Entity\Project;
use App\Repository\ProjectRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class HomeController extends Controller {
    /**
     * @Route("/", name="home")
     */
    public function home(SessionInterface $session) {
    	$user = $this->getUser();
    	$username = $user ? $user->getUsername() : "";
		$notifications = [];

//		$featuredProject;
//		$popularProjects;

		$featuredProject = $this->getDoctrine()
			->getRepository(Project::class)
			->findFeatured();

		$recommendedProjects = $this->getDoctrine()
			->getRepository(Project::class)
			->findRecommended($featuredProject->getCurrentMoney());

		$popularProjects = $this->getDoctrine()
			->getRepository(Project::class)
			->findPopular();

		$newProjects = $this->getDoctrine()
			->getRepository(Project::class)
			->findNew();

		$endingProjects = $this->getDoctrine()
			->getRepository(Project::class)
			->findEnding();

		$projects = $this->getDoctrine()
			->getRepository(Project::class)
			->findAll();

		if (!$projects) {
			throw $this->createNotFoundException(
				'No projects found'
			);
		}

        return $this->render('home/index.html.twig', [
            'username' => $username,
            'notifications' => $notifications,
			'projects' => $projects,
			'featuredProject' => $featuredProject,
			'recommendedProjects' => $recommendedProjects,
			'popularProjects' => $popularProjects,
			'newProjects' => $newProjects,
			'endingProjects' => $endingProjects
        ]);
    }
}
