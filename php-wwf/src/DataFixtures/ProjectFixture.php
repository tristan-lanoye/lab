<?php

namespace App\DataFixtures;

use App\Entity\Project;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ProjectFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
		$els = [
			[
				"name" => "Cleanup of the Mediterranean Sea",
				"description" => "The Mediterranean Sea is turning into a dangerous plastic trap, with record levels of pollution endangering marine species and human health. We are launching this project to help clean the ocean and save the flora and fauna.",
				"author" => "Jabari Martin",
				"likes" => 1256,
				"currentMoney" => 84000,
				"neededMoney" => 120000,
				"donations" => 215,
				"dateCreation" => \DateTime::createFromFormat('d-m-Y', "12-12-2018"),
				"dateDeadline" => \DateTime::createFromFormat('d-m-Y', "23-12-2018"),
				"image" => "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/03/21/10/plastic-pollution-beach.jpg?w968h681",
				"category" => "ocean"
			],
			[
				"name" => "Fight against deforestation in French Guiana",
				"description" => "Deforestation is a major cause of biodiversity loss and global warming. It causes the loss of livelihoods of the local people who depend on it and the loss of water resources",
				"author" => "Victor M. H.",
				"likes" => 857,
				"currentMoney" => 67000,
				"neededMoney" => 85000,
				"donations" => 152,
				"dateCreation" => \DateTime::createFromFormat('d-m-Y', "02-12-2018"),
				"dateDeadline" => \DateTime::createFromFormat('d-m-Y', "14-01-2019"),
				"image" => "https://img.purch.com/h/1000/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzAyMy84NjEvb3JpZ2luYWwvc3VtYXRyYS1kZWZvcmVzdGF0aW9uLTEyMDEyNC5qcGc=",
				"category" => "forest"
			],
			[
				"name" => "Accompany cities in their ecological transition",
				"description" => "This project focuses on the city of London. We want to support them in the ecological transition of this city that is growing.",
				"author" => "Media Diversified",
				"likes" => 45600,
				"currentMoney" => 241000,
				"neededMoney" => 212000,
				"donations" => 2512,
				"dateCreation" => \DateTime::createFromFormat('d-m-Y', "05-11-2018"),
				"dateDeadline" => \DateTime::createFromFormat('d-m-Y', "20-01-2019"),
				"image" => "https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/07/10/11/Future-London.jpg?w968",
				"category" => "climate"
			],
			[
				"name" => "Forest restoration in New Caledonia",
				"description" => "New Caledonia, one of the world's main biodiversity hotspots, has exceptional tropical forests, but also an unbelievable biological diversity. Unfortunately, by his behavior, the man strongly threatens to deteriorate these unique spaces.",
				"author" => "Maurice Ribble",
				"likes" => 451,
				"currentMoney" => 82179,
				"neededMoney" => 96000,
				"donations" => 142,
				"dateCreation" => \DateTime::createFromFormat('d-m-Y', "05-12-2018"),
				"dateDeadline" => \DateTime::createFromFormat('d-m-Y', "22-12-2018"),
				"image" => "https://asiapacificreport.nz/wp-content/uploads/2018/05/PT-Megakarya-Jaya-Raya-PT-MJR-Palm-Oil-Concession-in-Papua-GPeace-680wide.jpg",
				"category" => "forest"
			],
			[
				"name" => "Improve cohabitation between large carnivores and humans in Tanzania",
				"description" => "Large carnivors are now threatened. Indeed, the cohabitation with the man is more and more complicated. African herders are attacking their animals to defend their farms and we are left with losses on both sides",
				"author" => "Eric Stein",
				"likes" => 753,
				"currentMoney" => 159000,
				"neededMoney" => 74000,
				"donations" => 391,
				"dateCreation" => \DateTime::createFromFormat('d-m-Y', "11-11-2018"),
				"dateDeadline" => \DateTime::createFromFormat('d-m-Y', "23-12-2018"),
				"image" => "https://www.naturalworldsafaris.com/~/media/images/wildlife/african-lion/nws-st-african-lion-male.jpg",
				"category" => "wildlife"
			],
			[
				"name" => "Against the melting of Arctic glaciers",
				"description" => "The Mediterranean Sea is turning into a dangerous plastic trap, with record levels of pollution endangering marine species and human health. We are launching this project to help clean the ocean and save the flora and fauna.",
				"author" => "Jabari Martin",
				"likes" => 1256,
				"currentMoney" => 64000,
				"neededMoney" => 105000,
				"donations" => 215,
				"dateCreation" => \DateTime::createFromFormat('d-m-Y', "12-12-2018"),
				"dateDeadline" => \DateTime::createFromFormat('d-m-Y', "23-12-2018"),
				"image" => "https://www.hastalaproxima.com/wp-content/uploads/2015/06/Perito-Moreno-1-van-3-1024x683.jpg",
				"category" => "climate"
			],
			[
				"name" => "Preservation of animals natural habitat",
				"description" => "Deforestation is a major cause of biodiversity loss and global warming. It causes the loss of livelihoods of the local people who depend on it and the loss of water resources",
				"author" => "Victor M. H.",
				"likes" => 857,
				"currentMoney" => 127000,
				"neededMoney" => 105000,
				"donations" => 152,
				"dateCreation" => \DateTime::createFromFormat('d-m-Y', "02-12-2018"),
				"dateDeadline" => \DateTime::createFromFormat('d-m-Y', "14-01-2019"),
				"image" => "https://www.sciencenews.org/sites/default/files/2018/07/main/articles/080418_reviews_feat.jpg",
				"category" => "wildlife"
			],
			[
				"name" => "Advance transition to electric energy",
				"description" => "This project focuses on the city of London. We want to support them in the ecological transition of this city that is growing.",
				"author" => "Media Diversified",
				"likes" => 45600,
				"currentMoney" => 311000,
				"neededMoney" => 312000,
				"donations" => 2512,
				"dateCreation" => \DateTime::createFromFormat('d-m-Y', "05-11-2018"),
				"dateDeadline" => \DateTime::createFromFormat('d-m-Y', "20-01-2019"),
				"image" => "https://greenmotionusa.com/perch/resources/super-pollutants-1.jpeg",
				"category" => "climate"
			],
			[
				"name" => "Save people from oil exploitation",
				"description" => "New Caledonia, one of the world's main biodiversity hotspots, has exceptional tropical forests, but also an unbelievable biological diversity. Unfortunately, by his behavior, the man strongly threatens to deteriorate these unique spaces.",
				"author" => "Maurice Ribble",
				"likes" => 451,
				"currentMoney" => 210179,
				"neededMoney" => 96000,
				"donations" => 142,
				"dateCreation" => \DateTime::createFromFormat('d-m-Y', "05-12-2018"),
				"dateDeadline" => \DateTime::createFromFormat('d-m-Y', "22-12-2018"),
				"image" => "https://dothash.buzz/wp-content/uploads/2015/06/shipbreakers-opener-990-750x410.jpg",
				"category" => "climate"
			],
			[
				"name" => "Fight against greenhouse effect",
				"description" => "Large carnivors are now threatened. Indeed, the cohabitation with the man is more and more complicated. African herders are attacking their animals to defend their farms and we are left with losses on both sides",
				"author" => "Eric Stein",
				"likes" => 953,
				"currentMoney" => 269000,
				"neededMoney" => 174000,
				"donations" => 491,
				"dateCreation" => \DateTime::createFromFormat('d-m-Y', "11-11-2018"),
				"dateDeadline" => \DateTime::createFromFormat('d-m-Y', "23-12-2018"),
				"image" => "https://inhabitat.com/wp-content/blogs.dir/1/files/2014/04/earthday_pollution.jpg",
				"category" => "climate"
			],
		];

		foreach ($els as $el) {
			$project = new Project();

			$project->setName($el['name']);
			$project->setDescription($el['description']);
			$project->setAuthor($el['author']);
			$project->setLikes($el['likes']);
			$project->setCurrentMoney($el['currentMoney']);
			$project->setNeededMoney($el['neededMoney']);
			$project->setDonations($el['donations']);
			$project->setDateCreation($el['dateCreation']);
			$project->setDateDeadline($el['dateDeadline']);
			$project->setImage($el['image']);
			$project->setCategory($el['category']);

			$manager->persist($project);
			$manager->flush();
		}
    }
}
