CREATE TABLE `app_review_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`place_id` int NOT NULL,
	`review` varchar(3000) NOT NULL,
	`rating` decimal(2,1) NOT NULL DEFAULT 0,
	`status` text,
	`added_at` timestamp DEFAULT (now()),
	CONSTRAINT `app_review_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `app_review_table` ADD CONSTRAINT `app_review_table_user_id_app_logintable_id_fk` FOREIGN KEY (`user_id`) REFERENCES `app_logintable`(`id`) ON DELETE no action ON UPDATE no action;