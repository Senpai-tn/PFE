-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 15 juin 2021 à 21:48
-- Version du serveur :  5.7.31
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pfe`
--
CREATE DATABASE IF NOT EXISTS `pfe` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `pfe`;

-- --------------------------------------------------------

--
-- Structure de la table `data`
--

DROP TABLE IF EXISTS `data`;
CREATE TABLE IF NOT EXISTS `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref` varchar(100) NOT NULL,
  `value` decimal(10,0) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ref` (`ref`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `data`
--

INSERT INTO `data` (`id`, `ref`, `value`, `created_at`) VALUES
(1, 'dfgsdfgdfsgd', '30', '2021-06-15 13:37:53'),
(2, 'rref5188er1f5', '0', '2021-06-15 13:37:53'),
(3, 'dfgsdfgdfsgd', '22', '2021-06-15 08:47:36');

-- --------------------------------------------------------

--
-- Structure de la table `sensors`
--

DROP TABLE IF EXISTS `sensors`;
CREATE TABLE IF NOT EXISTS `sensors` (
  `ref` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL,
  `idStation` int(11) DEFAULT NULL,
  `isEnabled` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ref`),
  KEY `idStation` (`idStation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sensors`
--

INSERT INTO `sensors` (`ref`, `type`, `created_at`, `idStation`, `isEnabled`) VALUES
('dfgsdfgdfsgd', 'temp', '2021-06-09 22:22:50', 5, 1),
('rref5188er1f5', 'pression', '2021-06-09 22:16:41', 5, 1);

-- --------------------------------------------------------

--
-- Structure de la table `stations`
--

DROP TABLE IF EXISTS `stations`;
CREATE TABLE IF NOT EXISTS `stations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `region` varchar(100) NOT NULL,
  `gouvernorat` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isEnabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `stations`
--

INSERT INTO `stations` (`id`, `name`, `region`, `gouvernorat`, `created_at`, `isEnabled`) VALUES
(1, 'a', 'g', 'g', '2021-06-08 17:07:16', 1),
(2, 'g', 'g', 'g', '2021-06-08 17:07:16', 1),
(3, 'g', 'g', 'g', '2021-06-08 20:43:35', 1),
(4, 'g', 'g', 'g', '2021-06-08 20:44:22', 1),
(5, 'bdfsbdfbsdfs', 'bdfsbdfsbdfsbdfsb', 'dfbdfsbfdbsdfb', '2021-06-08 20:45:18', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `login` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isEnabled` tinyint(1) DEFAULT '1',
  `roles` varchar(255) DEFAULT NULL,
  `idStation` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idStation` (`idStation`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `login`, `password`, `tel`, `created_at`, `isEnabled`, `roles`, `idStation`) VALUES
(1, 'khaled@gmail.com', 'Senpai', 'Senpai', 'c4ca4238a0b923820dcc509a6f75849b', '1144', '2021-06-01 18:11:02', 1, 'user,admin', 5),
(6, 'khaledsahli@gmail.com', 'Test', 'Senpai', 'c4ca4238a0b923820dcc509a6f75849b', '1144', '2021-06-01 18:11:02', 1, 'user', 5),
(7, 'khaled2@gmail.com', 'Khaled', 'Senpai', 'b6d767d2f8ed5d21a44b0e5886680cb9', '14', '2021-06-08 15:04:20', 0, 'user', 4),
(8, '', '', '', 'd41d8cd98f00b204e9800998ecf8427e', '', '2021-06-08 15:14:48', 1, 'user,admin', 5),
(9, 'khaled25@gmail.com', 'dsgfgdfs', 'fbfdb', '0cc175b9c0f1b6a831c399e269772661', '52572', '2021-06-08 15:26:10', 0, 'user,admin', NULL),
(10, 'a@gmail.com', 'a', 'a', '0cc175b9c0f1b6a831c399e269772661', '1', '2021-06-08 15:32:05', 1, 'user', 3);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `data`
--
ALTER TABLE `data`
  ADD CONSTRAINT `data_ibfk_1` FOREIGN KEY (`ref`) REFERENCES `sensors` (`ref`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sensors`
--
ALTER TABLE `sensors`
  ADD CONSTRAINT `sensors_ibfk_1` FOREIGN KEY (`idStation`) REFERENCES `stations` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`idStation`) REFERENCES `stations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
