CREATE TABLE `app_panchayats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tname` varchar(200),
	CONSTRAINT `app_panchayats_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`tname`)
); --> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `description` varchar(1000);--> statement-breakpoint
ALTER TABLE `app_place` ADD `place` varchar(300) NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `sub_place` varchar(300);--> statement-breakpoint
ALTER TABLE `app_place` ADD `panchayat_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `ward_no` int NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `address` varchar(5000) NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `social` json DEFAULT ('[]') NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `additional_data` varchar(1000);--> statement-breakpoint
ALTER TABLE `app_place` ADD `working_days` json DEFAULT ('{"from":"Monday","to":"Friday"}') NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `opening_time` json DEFAULT ('{"from":"9:00am","to":"5:00pm"}') NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `added_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `app_place` ADD `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `app_place` ADD CONSTRAINT `app_place_panchayat_id_app_panchayats_id_fk` FOREIGN KEY (`panchayat_id`) REFERENCES `app_panchayats`(`id`) ON DELETE no action ON UPDATE no action;