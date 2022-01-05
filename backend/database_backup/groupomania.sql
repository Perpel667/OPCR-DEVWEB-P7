-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 05 jan. 2022 à 11:21
-- Version du serveur : 8.0.27
-- Version de PHP : 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `message` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `message`, `date`) VALUES
(16, 188, 17, 'tu es pas un peu petit pour jouer avec un glock 17 toi ? 🤔', '2021-12-29 18:14:39'),
(17, 192, 34, 'Alerte generaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaale !!!', '2021-12-30 10:33:52'),
(46, 87, 34, 'a quand la sortie ? 😮', '2022-01-03 15:25:55'),
(47, 133, 34, 'Ah ouais , en effet oui 🥵', '2022-01-03 15:28:17'),
(52, 87, 45, 'Waw ce casting vous êtes trop beaux... surtout toi Mayombo  😍.', '2022-01-04 10:42:19'),
(53, 9, 33, 'Petit hacker va !', '2022-01-04 11:16:32'),
(54, 133, 33, 'Je valide avec validation certifiée !', '2022-01-04 11:17:58'),
(55, 192, 33, 'Et voila Violet qui nous parle en Murloc 😂', '2022-01-04 11:20:44'),
(56, 9, 17, 'Ah je pensais être le seul survivant ! Encore désolé pour ton post, en même temps fallait pas mettre ton nom en mot de passe 🙄...', '2022-01-04 11:23:48'),
(57, 10, 17, '😁', '2022-01-04 11:25:15'),
(58, 87, 17, 'soi sérieuse Ayisha, le plus beau il est en haut a droite 😘.', '2022-01-04 11:26:44'),
(74, 10, 148, 'Je peux vous assurer que ça ne se reproduira plus. Nos plus sincères excuses !', '2022-01-04 11:57:12');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id` int NOT NULL,
  `post_id` int NOT NULL,
  `image_url` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `user_id`) VALUES
(4, 87, 45),
(19, 87, 17),
(125, 133, 33),
(129, 131, 17),
(137, 9, 34),
(138, 133, 34),
(141, 197, 148),
(142, 131, 45),
(143, 133, 45),
(144, 197, 45),
(145, 188, 33),
(146, 87, 33),
(147, 197, 33),
(148, 197, 17);

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `image_url` text,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `user_id`, `message`, `image_url`, `date`) VALUES
(9, 17, 'Coucou c\'est perpel l\'unique et le vrai', NULL, '2021-11-29 13:56:14'),
(10, 33, 'comment est ce que Perpel a pu modifier mon post? serieux le dev reveille toi 🤬', NULL, '2021-11-18 10:51:53'),
(87, 34, 'la plus belle des affiches by perpel', '1639678790677.jpg', '2021-11-29 14:20:52'),
(131, 34, 'Perpel en mode fighter 🥊', '1638353862492.png', '2021-12-01 11:14:01'),
(133, 45, 'Téma cte photo de ouf 😮', '1639733384051.jpg', '2021-12-17 10:29:44'),
(188, 17, 'BANG BANG', '1640714354905.png', '2021-12-28 16:55:02'),
(192, 17, 'arrglluuaahhglglgl !! *Murloc Voice*', NULL, '2021-12-29 16:26:35'),
(197, 148, 'Bonjour a tous et a toutes, merci pour vos publications \"béta\". Maintenant tenez vous a carreau car je suis là pour vous surveiller 🧐', NULL, '2022-01-03 19:11:09');

-- --------------------------------------------------------

--
-- Structure de la table `tutorials`
--

CREATE TABLE `tutorials` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `firstname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` text,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `firstname`, `name`, `image`, `password`, `admin`) VALUES
(17, 'perpel@perpel.com', 'Violet', 'Perpel', './images/profiles/1640776036399.png', '$2b$10$46FCl18VBS0fgwVfxI9wsul/csvVxSjuGLEaSxvZEcf/DxOXpG0hS', 0),
(33, 'perpel2@perpel.com', 'Lucas', 'Monom', './images/profiles/1641291322945.png', '$2b$10$67JN4/epyIfhF0LL05BsnO5a/KLSCU0rTHoB6ROGJFZFskG6W18wq', 0),
(34, 'perpel3@perpel.com', 'Antoine', 'Monom', './images/profiles/1640856800976.png', '$2b$10$iAze.yMASXHqf/QZXMur9.EC8FvPSZMhADdmNpr9/2823HCgswxLq', 0),
(45, 'perpel5@perpel.com', 'Ayisha', 'Diaz', './images/profiles/1639748605230.jpg', '$2b$10$ieZ20xQGVLUCQSe5WLLsaO8TZ..4XviCl3maoCQS5CBWbYtPs1SnG', 0),
(148, 'admin@groupomania.com', 'Administrateur', 'Groupomania', './images/profiles/1641206329722.png', '$2b$10$QRi1fI/4p/THlE361V9JZeBpc.HmOGp6vH0ny7hE1WLwF.Y7gtxae', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_comment` (`post_id`),
  ADD KEY `comment_uid` (`user_id`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postid` (`post_id`),
  ADD KEY `user` (`user_id`);

--
-- Index pour la table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user_id`);

--
-- Index pour la table `tutorials`
--
ALTER TABLE `tutorials`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT pour la table `tutorials`
--
ALTER TABLE `tutorials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comment_uid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_comment` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `postid` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `userId` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
