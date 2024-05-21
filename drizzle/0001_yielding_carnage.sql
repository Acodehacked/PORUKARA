CREATE TABLE `webcode_enquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tname` varchar(200) NOT NULL,
	`tphone` varchar(200) NOT NULL,
	`tmail` varchar(200) NOT NULL,
	`t_type` varchar(300) NOT NULL,
	`tmessage` varchar(5000) NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `webcode_enquiries_id` PRIMARY KEY(`id`)
);
