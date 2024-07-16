ALTER TABLE `app_logintable` MODIFY COLUMN `email` varchar(256);
ALTER TABLE `app_logintable` MODIFY COLUMN `categories` json NOT NULL DEFAULT ('[]');
ALTER TABLE `app_place` MODIFY COLUMN `place` varchar(300) NOT NULL;
ALTER TABLE `app_place` MODIFY COLUMN `panchayat_id` int;
ALTER TABLE `app_place` MODIFY COLUMN `ward_no` int;
ALTER TABLE `app_place` MODIFY COLUMN `website` varchar(100);
ALTER TABLE `app_place` MODIFY COLUMN `working_days` json;
ALTER TABLE `app_place` MODIFY COLUMN `opening_time` json;