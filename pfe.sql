-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 18 juin 2021 à 11:48
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

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
  `value` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ref` (`ref`)
) ENGINE=InnoDB AUTO_INCREMENT=4602 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `data`
--

INSERT INTO `data` (`id`, `ref`, `value`, `created_at`) VALUES
(68, 'ref11', 15, '2021-06-16 07:02:48'),
(69, 'ref11', 18, '2021-06-16 08:02:48'),
(70, 'ref11', 15, '2021-06-16 09:02:48'),
(71, 'ref11', 17, '2021-06-16 10:02:48'),
(72, 'ref12', 14, '2021-06-16 07:03:41'),
(73, 'ref12', 16, '2021-06-16 08:03:41'),
(74, 'ref12', 8, '2021-06-16 09:16:00'),
(75, 'ref12', 12, '2021-06-16 10:03:41'),
(76, 'ref13', 17, '2021-06-16 07:04:35'),
(77, 'ref13', 23, '2021-06-16 08:04:35'),
(78, 'ref13', 8, '2021-06-16 09:04:35'),
(79, 'ref13', 17, '2021-06-16 10:04:35'),
(80, 'ref21', 21, '2021-06-16 07:06:06'),
(81, 'ref21', 13, '2021-06-16 08:06:06'),
(82, 'ref21', 23, '2021-06-16 09:06:06'),
(84, 'ref22', 10, '2021-06-16 07:18:02'),
(85, 'ref22', 28, '2021-06-16 08:06:06'),
(86, 'ref22', 30, '2021-06-16 09:06:06'),
(87, 'ref22', 10, '2021-06-16 10:06:06'),
(88, 'ref23', 8, '2021-06-16 07:06:06'),
(89, 'ref23', 29, '2021-06-16 08:06:06'),
(90, 'ref23', 15, '2021-06-16 09:06:06'),
(91, 'ref23', 9, '2021-06-16 10:06:06'),
(92, 'ref31', 9, '2021-06-16 07:07:13'),
(93, 'ref31', 14, '2021-06-16 08:07:13'),
(94, 'ref31', 11, '2021-06-16 09:07:13'),
(95, 'ref31', 7, '2021-06-16 10:07:13'),
(96, 'ref32', 24, '2021-06-16 07:07:13'),
(97, 'ref32', 17, '2021-06-16 08:07:13'),
(98, 'ref32', 8, '2021-06-16 09:07:13'),
(99, 'ref32', 10, '2021-06-16 10:07:13'),
(100, 'ref33', 21, '2021-06-16 07:07:13'),
(101, 'ref33', 20, '2021-06-16 08:07:13'),
(102, 'ref33', 7, '2021-06-16 09:07:13'),
(103, 'ref33', 19, '2021-06-16 10:07:13'),
(104, 'ref41', 13, '2021-06-16 07:08:13'),
(105, 'ref41', 6, '2021-06-16 08:08:13'),
(106, 'ref41', 9, '2021-06-16 09:08:13'),
(107, 'ref41', 21, '2021-06-16 10:08:13'),
(108, 'ref42', 25, '2021-06-16 07:08:13'),
(109, 'ref42', 9, '2021-06-16 08:08:13'),
(110, 'ref42', 11, '2021-06-16 09:08:13'),
(111, 'ref42', 26, '2021-06-16 10:08:13'),
(112, 'ref43', 16, '2021-06-16 07:08:13'),
(113, 'ref43', 20, '2021-06-16 08:08:13'),
(114, 'ref43', 24, '2021-06-16 09:08:13'),
(115, 'ref43', 30, '2021-06-16 10:08:13'),
(116, 'ref51', 29, '2021-06-16 07:08:45'),
(117, 'ref51', 16, '2021-06-16 08:08:45'),
(118, 'ref51', 13, '2021-06-16 09:08:45'),
(119, 'ref51', 11, '2021-06-16 10:08:45'),
(120, 'ref52', 12, '2021-06-16 07:08:45'),
(121, 'ref52', 21, '2021-06-16 08:08:45'),
(122, 'ref52', 15, '2021-06-16 09:08:45'),
(123, 'ref52', 6, '2021-06-16 10:08:45'),
(124, 'ref53', 5, '2021-06-16 07:08:45'),
(125, 'ref53', 27, '2021-06-16 08:08:45'),
(126, 'ref53', 17, '2021-06-16 09:08:45'),
(127, 'ref53', 24, '2021-06-16 10:08:45'),
(128, 'ref21', 102, '2021-06-16 10:45:08'),
(4599, 'ref51', 28, '2021-06-16 22:37:12'),
(4600, 'ref52', 30, '2021-06-16 22:37:21'),
(4601, 'ref53', 13, '2021-06-16 22:37:35');

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
('ref11', 'temp', '2021-06-16 13:38:48', 1, 1),
('ref12', 'press', '2021-06-16 13:39:02', 1, 1),
('ref13', 'debit', '2021-06-16 13:39:13', 1, 1),
('ref21', 'temp', '2021-06-16 13:38:48', 2, 1),
('ref22', 'press', '2021-06-16 13:39:02', 2, 1),
('ref23', 'debit', '2021-06-16 13:39:13', 2, 1),
('ref31', 'temp', '2021-06-16 13:38:48', 3, 1),
('ref32', 'press', '2021-06-16 13:39:02', 3, 1),
('ref33', 'debit', '2021-06-16 13:39:13', 3, 1),
('ref41', 'temp', '2021-06-16 13:38:48', 4, 1),
('ref42', 'press', '2021-06-16 13:39:02', 4, 1),
('ref43', 'debit', '2021-06-16 13:39:13', 4, 1),
('ref51', 'temp', '2021-06-16 13:38:48', 5, 1),
('ref52', 'press', '2021-06-16 13:39:02', 5, 1),
('ref53', 'debit', '2021-06-16 13:39:13', 5, 1);

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
(6, 'khaledsahli@gmail.com', 'Test', 'Senpai', 'c4ca4238a0b923820dcc509a6f75849b', '1144', '2021-06-01 18:11:02', 1, 'user', 2),
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
