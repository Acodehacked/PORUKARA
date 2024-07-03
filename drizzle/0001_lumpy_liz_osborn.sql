DROP TABLE `app_panchayats`;--> statement-breakpoint
DROP TABLE `app_type_categories`;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `place` int NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `panchayat_id` int;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `ward_no` int;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `website` varchar(100);--> statement-breakpoint
ALTER TABLE `app_categories` ADD `sub_categories` json DEFAULT ('[]') NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `paid` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `end_date` date DEFAULT '2024-07-03';--> statement-breakpoint
ALTER TABLE `app_place` ADD `google_location` varchar(1000) NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` ADD `pincode` int;