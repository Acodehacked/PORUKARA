-- ALTER TABLE `app_place` DROP FOREIGN KEY `app_place_panchayat_id_app_panchayats_id_fk`;
--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `place` varchar(200);--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `AdminLoginTable` ADD `status` varchar(50) DEFAULT 'offline' NOT NULL;--> statement-breakpoint
-- ALTER TABLE `app_place` ADD `sub_place` varchar(300) NOT NULL;