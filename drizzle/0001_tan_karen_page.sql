ALTER TABLE `app_place` MODIFY COLUMN `place` varchar(300) NOT NULL;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `panchayat_id` int;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `ward_no` int;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `website` varchar(100);--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `working_days` json;--> statement-breakpoint
ALTER TABLE `app_place` MODIFY COLUMN `opening_time` json;--> statement-breakpoint