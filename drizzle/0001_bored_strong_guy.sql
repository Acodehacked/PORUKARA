CREATE TABLE `app_sub_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tname` varchar(200),
	CONSTRAINT `app_sub_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`tname`)
);
--> statement-breakpoint
CREATE TABLE `app_top_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tname` varchar(100),
	`timage` varchar(600) NOT NULL,
	`sub_categories` json NOT NULL DEFAULT ('[]'),
	CONSTRAINT `app_top_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`tname`)
);
--> statement-breakpoint
ALTER TABLE `app_type_categories` ADD `sub_categories` json DEFAULT ('[]') NOT NULL;