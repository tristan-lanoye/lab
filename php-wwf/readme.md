# WWF

### Récupérer le projet

##### Nécessite d'avoir installé : 

- PHP 7.1 ou +
- Composer
- Node.js
- Yarn
- MAMP / XAMP / Autre

##### Étapes à suivre : 

- Cloner le projet : `git clone https://github.com/tristan-lanoye/bt-project.git`
- Se placer dans le projet : `cd bt-project`
- Installer dépendences PHP : `composer install`
- Installer dépendences JS : `yarn install`
- Lancer serveur Apache / MySQL : Ouvrir MAMP / XAMP / Autre
- Créer base de donnée : Sur PhpMyAdmin / Autre
- Connecter la BDD : Modifier le fichier .env (ligne 16) avec vos identifiants
- Préparer les tables : `npm run migrate_diff`
- Créer les tables : `npm run migrate`
- Charger les fixtures (éléments des tables) : `npm run load_fixtures`
- Lancer le serveur Symfony : `npm run start_server`
- Lancer la compilation des fichiers par Webpack : `npm run start_watch`
- ssébon
