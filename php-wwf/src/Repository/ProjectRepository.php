<?php

namespace App\Repository;

use App\Entity\Project;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Project|null find($id, $lockMode = null, $lockVersion = null)
 * @method Project|null findOneBy(array $criteria, array $orderBy = null)
 * @method Project[]    findAll()
 * @method Project[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProjectRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Project::class);
    }

	public function findFeatured(): ?Project
	{
		return $this->createQueryBuilder('p')
			->orderBy('p.currentMoney', 'DESC')
			->setMaxResults(1)
			->getQuery()
			->getOneOrNullResult();
	}

	public function findBest(): array
	{
		$qb = $this->createQueryBuilder('p')
			->orderBy('p.currentMoney', 'DESC')
			->setMaxResults(5)
			->getQuery();

		return $qb->execute();
	}

	public function findRecommended($max): array
	{
		$qb = $this->createQueryBuilder('p')
			->andWhere('p.currentMoney <' . $max)
			->orderBy('p.currentMoney', 'DESC')
			->setMaxResults(3)
			->getQuery();

		return $qb->execute();
	}

	public function findPopular(): array
	{
		$qb = $this->createQueryBuilder('p')
			->orderBy('p.donations', 'DESC')
			->setMaxResults(4)
			->getQuery();

		return $qb->execute();
	}

	public function findNew(): array
	{
		$qb = $this->createQueryBuilder('p')
			->orderBy('p.dateCreation', 'DESC')
			->setMaxResults(4)
			->getQuery();

		return $qb->execute();
	}

	public function findEnding(): array
	{
		$qb = $this->createQueryBuilder('p')
			->orderBy('p.dateDeadline', 'ASC')
			->setMaxResults(4)
			->getQuery();

		return $qb->execute();
	}
}
