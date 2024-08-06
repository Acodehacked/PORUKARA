DROP TABLE `app_panchayats`;--> statement-breakpoint
DROP TABLE `app_type_categories`;--> statement-breakpoint
ALTER TABLE `app_logintable` MODIFY COLUMN `email` varchar(256);--> statement-breakpoint
ALTER TABLE `app_logintable` MODIFY COLUMN `categories` json NOT NULL DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `place` varchar(300) NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `panchayat_id` int;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `ward_no` int;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `website` varchar(100);--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `working_days` json;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `opening_time` json;--> statement-breakpoint
ALTER TABLE `app_categories` ADD `sub_categories` json DEFAULT ('[]') NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `paid` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `period` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `end_date` date DEFAULT '2024-08-02';--> statement-breakpoint
ALTER TABLE `app_place` ADD `google_location` varchar(1000) NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `app_sub_suggestions` json DEFAULT ('[]') NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `rating` decimal(2,1) DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `pincode` int;