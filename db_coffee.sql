/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 8.0.37 : Database - db_coffee
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_coffee` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `db_coffee`;

/*Table structure for table `address` */

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '地址id',
  `name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '收货人姓名',
  `home` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '收货人地址',
  `phone` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '收货人联系电话',
  `uid` int NOT NULL COMMENT '联系用户表id的外键',
  `isDefault` int NOT NULL COMMENT '是否为默认地址',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `address` */

insert  into `address`(`id`,`name`,`home`,`phone`,`uid`,`isDefault`) values (2,'admin','浙江省杭州市浙江大学','19999999999',1,0),(5,'admin','湖北省武汉市华中科技大学','13464859752',1,0),(13,'wangmaolin','河南省洛阳市河南科技大学','17892514678',5,1),(14,'admin','北京市清华大学','13546956147',9,1),(15,'wml','河南省固始县','17890645091',10,1),(16,'zjh','河南省兰考县','120',10,0),(17,'xiaoming','河南省三门峡市','12345678910',10,0),(18,'彭昊','浙江省杭州市萧山区奥体花园','15694613752',10,0),(19,'张昊','天津市西青区天津理工大学','12345678901',10,0),(20,'彭昊','浙江省杭州市西湖区浙江大学','18468794315',11,0),(22,'gyh','河南省洛阳市','18434679184',11,0),(23,'runyu','河南省洛阳市','12345678910',11,0),(27,'xiaoming','hnly','1234',11,1),(30,'runyu','河南省信阳市','110',2,0),(31,'admin','America','111',2,1),(32,'admin','河南省郑州市郑州大学','12',6,1),(33,'runyu','hnly','1123',1,0),(34,'admin','hnly','123',1,1);

/*Table structure for table `administrator` */

DROP TABLE IF EXISTS `administrator`;

CREATE TABLE `administrator` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `name` varchar(250) NOT NULL COMMENT '管理员名称',
  `password` int DEFAULT NULL COMMENT '管理员密码',
  `status` int DEFAULT NULL COMMENT '管理员状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `administrator` */

insert  into `administrator`(`id`,`name`,`password`,`status`) values (1,'admin',123,0);

/*Table structure for table `goods` */

DROP TABLE IF EXISTS `goods`;

CREATE TABLE `goods` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `goodsname` varchar(250) NOT NULL COMMENT '商品名称',
  `price` int NOT NULL COMMENT '商品价格',
  `cover` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '商品图片信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `goods` */

insert  into `goods`(`id`,`goodsname`,`price`,`cover`) values (1,'生椰拿铁',9,'/images/menu/01.jpg'),(2,'厚乳拿铁',9,'/images/menu/01.jpg'),(3,'丝绒拿铁',9,'/images/menu/01.jpg'),(4,'生椰丝绒拿铁',12,'/images/menu/01.jpg'),(5,'标准美式',3,'/images/menu/02.jpg'),(6,'拿铁',6,'/images/menu/02.jpg'),(7,'香草拿铁',9,'/images/menu/02.jpg'),(8,'耶加雪菲-美式',9,'/images/menu/02.jpg'),(9,'樱花白巧瑞纳冰',15,'/images/menu/03.jpg'),(10,'偷偷想你茉莉鸳鸯',12,'/images/menu/03.jpg'),(11,'樱花拿铁',12,'/images/menu/03.jpg'),(12,'樱花小铁',12,'/images/menu/03.jpg'),(13,'抹茶瑞纳冰',12,'/images/menu/04.jpg'),(14,'抹茶好喝椰',12,'/images/menu/04.jpg'),(15,'茉莉轻乳茶',9,'/images/menu/04.jpg'),(16,'乌龙轻乳茶',12,'/images/menu/04.jpg');

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `uid` int NOT NULL COMMENT '用户id',
  `gid` int NOT NULL COMMENT '商品id',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `gid` (`gid`),
  CONSTRAINT `gid` FOREIGN KEY (`gid`) REFERENCES `goods` (`id`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `orders` */

insert  into `orders`(`id`,`uid`,`gid`) values (1,1,1),(2,1,3),(3,6,1),(4,9,16),(5,9,4),(6,1,3),(7,10,3),(8,10,4),(9,10,2),(10,10,11),(11,10,12),(12,10,13),(13,10,13),(14,9,9),(15,5,4),(16,5,3),(17,5,5),(18,5,4),(19,5,1),(20,5,13),(21,5,12),(22,5,8),(23,5,4),(24,5,3),(25,5,6),(26,5,8),(27,5,12),(28,5,3),(29,5,3),(30,5,12),(31,5,13),(32,5,7),(33,5,7),(34,5,7),(35,5,3),(36,11,1),(37,11,1),(38,11,3),(39,11,13),(40,1,3),(41,1,1);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(250) NOT NULL COMMENT '用户名',
  `password` int NOT NULL COMMENT '用户密码',
  `status` int NOT NULL COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`password`,`status`) values (1,'admin',123,0),(2,'zhangsan',666,0),(5,'wangmaolin',2005,0),(6,'lisi',123,0),(9,'wangwu',666,0),(10,'Tom',111,0),(11,'wml',123,0),(15,'runyu',1234,0),(17,'asd',1234,0);

/* Trigger structure for table `address` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `set_default_address` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `set_default_address` BEFORE INSERT ON `address` FOR EACH ROW BEGIN
        DECLARE default_count INT;
        DECLARE temp_uid INT;
        DECLARE temp_id INT;
        IF new.isDefault = 1 THEN
            SELECT COUNT(*) INTO default_count FROM address WHERE isDefault = 1 AND uid = new.uid;
            IF default_count > 0 THEN
                -- 存储需要更新的信息
                SELECT uid, id INTO temp_uid, temp_id FROM address WHERE isDefault = 1 AND uid = new.uid LIMIT 1;
                -- 这里只是存储信息，并不直接更新表
                SET @temp_uid = temp_uid;
                SET @temp_id = temp_id;
            END IF;
        END IF;
    END */$$


DELIMITER ;

/* Procedure structure for procedure `update_default_address` */

/*!50003 DROP PROCEDURE IF EXISTS  `update_default_address` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `update_default_address`()
BEGIN
    IF @temp_uid IS NOT NULL AND @temp_id IS NOT NULL THEN
        -- 触发器执行完后，使用存储过程来更新表
        UPDATE address SET isDefault = 0 WHERE id = @temp_id AND uid = @temp_uid;
    END IF;
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
