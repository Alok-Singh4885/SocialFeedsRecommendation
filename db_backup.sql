-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: leagueX
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sport_id` int NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `events_sport_id_fk` (`sport_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`id`),
  CONSTRAINT `events_sport_id_fk` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Super Bowl',1,'1','2024-04-22 20:23:39','2024-04-22 20:23:39'),(2,'Wimbledon Championships',2,'1','2024-04-22 20:23:39','2024-04-22 20:23:39'),(3,'FIFA World Cup',1,'1','2024-04-22 20:23:39','2024-04-22 20:23:39');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `text` text NOT NULL,
  `sport_id` int NOT NULL,
  `event_id` int NOT NULL,
  `likes` int NOT NULL DEFAULT '0',
  `comments` int NOT NULL DEFAULT '0',
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `posts_user_id_fk` (`user_id`),
  KEY `posts_sport_id_fk` (`sport_id`),
  KEY `posts_event_id_fk` (`event_id`),
  CONSTRAINT `posts_event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`id`),
  CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  CONSTRAINT `posts_sport_id_fk` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5005 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'This is a sample post text.',1,1,10,5,'1','2024-04-25 12:00:00','2024-04-25 12:00:00'),(5003,1,'This is a sample post text 2.',2,1,24,9,'1','2024-04-25 12:00:00','2024-04-25 12:00:00'),(5004,1,'This is a sample post text 3.',3,1,24,9,'1','2024-04-25 12:00:00','2024-04-25 12:00:00');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20240422104805-create-testing-table.js'),('20240422110927-create-sports.js'),('20240422110934-create-events.js'),('20240422110947-create-users.js'),('20240422111001-create-post.js'),('20240422111001-create-posts.js'),('20240423081818-create-user_follow_txn.js'),('20240423081818-create-user_follow_txn1.js'),('20240423081818-create-user_follow_txns.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports`
--

DROP TABLE IF EXISTS `sports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports`
--

LOCK TABLES `sports` WRITE;
/*!40000 ALTER TABLE `sports` DISABLE KEYS */;
INSERT INTO `sports` VALUES (1,'Football','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(2,'Basketball','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(3,'Tennis','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(4,'Soccer','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(5,'Baseball','1','2024-04-22 20:18:55','2024-04-22 20:18:55');
/*!40000 ALTER TABLE `sports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_follow_txn`
--

DROP TABLE IF EXISTS `user_follow_txn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_follow_txn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int DEFAULT NULL,
  `follower_id` int DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  KEY `fk_follower_id` (`follower_id`),
  CONSTRAINT `fk_follower_id` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_follow_txn_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_follow_txn_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `user_follow_txn_ibfk_3` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follow_txn`
--

LOCK TABLES `user_follow_txn` WRITE;
/*!40000 ALTER TABLE `user_follow_txn` DISABLE KEYS */;
INSERT INTO `user_follow_txn` VALUES (1,1,NULL,3,'1','2024-04-23 16:46:48','2024-04-23 16:46:48'),(2,1,NULL,4,'1','2024-04-23 16:50:27','2024-04-23 16:50:27');
/*!40000 ALTER TABLE `user_follow_txn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Norberto.Schoen96','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(2,'Roselyn_Shanahan','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(3,'Johnnie18','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(4,'Dillan14','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(5,'Chance24','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(6,'Cooper.Kling91','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(7,'Hosea.Johnson40','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(8,'Clair.Dicki94','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(9,'Elsie_Durgan70','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(10,'Jeramy.Douglas','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(11,'Zita.Balistreri','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(12,'Layla66','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(13,'Everette_Kshlerin','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(14,'Orval_Russel44','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(15,'Cyrus.Kilback','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(16,'Jeremie.Dare84','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(17,'Alda_Prohaska','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(18,'Gisselle64','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(19,'Camylle_Jast53','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(20,'Adelia_Hermann75','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(21,'Dallas_Stracke97','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(22,'Webster_Barrows','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(23,'Helena.Cartwright','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(24,'Ike66','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(25,'Maxine_Jacobi','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(26,'Morgan.Bashirian56','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(27,'Ava_Hegmann-Pfannerstill13','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(28,'Louie2','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(29,'Johnson87','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(30,'Kiara59','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(31,'Nikko_Christiansen61','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(32,'Jasmin_Baumbach6','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(33,'Ila61','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(34,'Trystan_Kuhlman24','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(35,'Kenna93','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(36,'Noah40','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(37,'Jocelyn.Considine','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(38,'Jeramie55','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(39,'Alejandrin69','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(40,'Aurore_Stamm','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(41,'Beau_Hegmann30','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(42,'Howell.Waters','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(43,'Reba24','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(44,'Wiley.Ratke','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(45,'Clementina_Leffler19','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(46,'Micaela.Kunde','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(47,'Theresia75','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(48,'Alfonso_Buckridge','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(49,'Ally_Lakin','1','2024-04-22 20:18:55','2024-04-22 20:18:55'),(50,'Vince_Gottlieb','1','2024-04-22 20:18:55','2024-04-22 20:18:55');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 15:17:14
