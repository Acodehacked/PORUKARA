ALTER TABLE `app_place` MODIFY COLUMN `place` varchar(300) NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `panchayat_id` int;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `ward_no` int;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `website` varchar(100);--> statement-breakpoint
-- ALTER TABLE `app_categories` ADD `sub_categories` json DEFAULT ('[]') NOT NULL;--> statement-breakpoint
-- ALTER TABLE `app_place` MODIFY COLUMN `working_days` json;--> statement-breakpoint
-- ALTER TABLE `app_place` MODIFY COLUMN `opening_time` json;--> statement-breakpoint
-- ALTER TABLE `app_place` ADD `period` int DEFAULT 0 NOT NULL;--> statement-breakpoint
-- ALTER TABLE `app_place` ADD `end_date` date DEFAULT '2024-07-10';--> statement-breakpoint
-- ALTER TABLE `app_place` ADD `google_location` varchar(1000) NOT NULL;--> statement-breakpoint
-- ALTER TABLE `app_place` ADD `pincode` int;
-- DROP TABLE `app_panchayats`;--> statement-breakpoint
-- DROP TABLE `app_type_categories`;--> statement-breakpoint
