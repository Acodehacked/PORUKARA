CREATE TABLE `app_share` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(400) NOT NULL,
	`page_id` int NOT NULL,
	`share_name` varchar(250) NOT NULL,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `app_share_id` PRIMARY KEY(`id`)
);