<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Project;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class ListController extends Controller {
    /**
     * @Route("/category/{cat}", name="list")
     */
    public function list($cat, SessionInterface $session) {
    	$user = $this->getUser();
    	$username = $user ? $user->getUsername() : "";
		$notifications = [];

		$category = $cat;

		$themeProjects = $this->getDoctrine()
			->getRepository(Project::class)
			->findBy(
				['category' => $category]
			);

		$bestProjects = $this->getDoctrine()
			->getRepository(Project::class)
			->findBest();

		$newProjects = $this->getDoctrine()
			->getRepository(Project::class)
			->findNew();

		$endingProjects = $this->getDoctrine()
			->getRepository(Project::class)
			->findEnding();

		$projects = $this->getDoctrine()
			->getRepository(Project::class)
			->findAll();

		if($category === "all") {
			$this->listProjects = [
				$projects[0]
			];
		} else if($category === "best") {
			$this->listProjects = $bestProjects;
		} else if($category === "ending") {
			$this->listProjects = $endingProjects;
		} else if($category === "new") {
			$this->listProjects = $newProjects;
		} else if($category === "ocean" || "food" || "climate" || "forest" || "wildlife") {
			$this->listProjects = $themeProjects;
		}

		if($this->listProjects) {
			$this->headProject = $this->listProjects[0];
			array_shift($this->listProjects);
		} else {
			$this->listProjects = [];
			$this->headProject = false;
		}

		$projects = $this->getDoctrine()
			->getRepository(Project::class)
			->findAll();

		if (!$projects) {
			throw $this->createNotFoundException(
				'No projects found'
			);
		}

		return $this->render('list/list.html.twig', [
			'username' => $username,
			'notifications' => $notifications,
			'category' => $category,
			'projects' => $projects,
			'headProject' => $this->headProject,
			'listProjects' => $this->listProjects
		]);
	}
}
