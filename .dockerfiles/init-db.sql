-- Adminer 4.8.0 MySQL 8.0.23 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `drones`;
CREATE DATABASE `drones` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `drones`;

DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(64) NOT NULL,
  `zip` mediumint NOT NULL,
  `streetaddr` varchar(128) NOT NULL,
  `token` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `drone`;
CREATE TABLE `drone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `brand` varchar(64) DEFAULT NULL,
  `model` varchar(64) DEFAULT NULL,
  `description` text,
  `user_id` int DEFAULT NULL,
  `last_used` int DEFAULT NULL,
  `last_user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `last_user_id` (`last_user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `drone_ibfk_4` FOREIGN KEY (`last_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `drone_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `drone` (`id`, `name`, `brand`, `model`, `description`, `user_id`, `last_used`, `last_user_id`) VALUES
(1,	'uusjahieno',	'drooni',	'mk1',	'Uusin ja hienoin drone valikoimassa :)',	NULL,	NULL,	NULL),
(2,	'vanhajahuono',	'drooni',	'mk0',	'Hidas ja ei lennä enää ku on nii vanha :(',	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `drone_usage`;
CREATE TABLE `drone_usage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `drone_id` int NOT NULL,
  `start_time` int NOT NULL,
  `end_time` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `drone_id` (`drone_id`),
  CONSTRAINT `drone_usage_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `drone_usage_ibfk_2` FOREIGN KEY (`drone_id`) REFERENCES `drone` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `drone_usage` (`id`, `user_id`, `drone_id`, `start_time`, `end_time`) VALUES
(1,	1,	1,	1618094912,	1618094912),
(2,	1,	2,	1618094912,	1618094912),
(3,	2,	1,	1618094912,	1618094912),
(4,	2,	2,	1618094912,	1618094912);

DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `description` text,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL,
  `timestamp` int unsigned NOT NULL,
  `usage_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usage_id` (`usage_id`),
  CONSTRAINT `image_ibfk_2` FOREIGN KEY (`usage_id`) REFERENCES `drone_usage` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `image` (`id`, `name`, `description`, `longitude`, `latitude`, `timestamp`, `usage_id`) VALUES
(1,	'hasukuva',	'on se hauska',	34.4,	54.4,	1618094912,	1),
(2,	'niion',	'joskus ottanu joskus en tie missä :D',	54.3,	32.3,	1618094912,	2),
(3,	'asdfasdf',	'asdfsadfasdf',	43.3,	32.5,	1618094912,	1),
(4,	'asdfasdf',	'asdfsdfaasdfsadfasdf',	56.5,	45.54,	1618094912,	1);

DROP TABLE IF EXISTS `image_of`;
CREATE TABLE `image_of` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address_id` int NOT NULL,
  `image_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `image_of_ibfk_4` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `image_of_ibfk_5` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(64) NOT NULL,
  `lname` varchar(64) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `token` varchar(64) NOT NULL,
  `droning` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`id`, `fname`, `lname`, `username`, `password`, `token`, `droning`) VALUES
(1,	'Aaro',	'Toivonen',	'aarotoiv',	'ce4c5d1376a6f6293d94468bd1e8ba10c02fc735',	'asdfasdf',	0),
(2,	'On',	'Se',	'seon',	'ce4c5d1376a6f6293d94468bd1e8ba10c02fc735',	'asdfeasdfe',	0);

-- 2021-04-10 23:34:50
