CREATE TABLE `AdminLoginTable` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`permission` boolean NOT NULL DEFAULT true,
	`status` varchar(50) NOT NULL DEFAULT 'offline',
	`password` varchar(256) NOT NULL,
	CONSTRAINT `AdminLoginTable_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `admissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_name` varchar(256) NOT NULL,
	`mobile` varchar(100) NOT NULL,
	`email` varchar(150) NOT NULL,
	`address` varchar(3250) NOT NULL,
	`course` varchar(1250) NOT NULL,
	`submitted_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `mobile_idx` UNIQUE(`mobile`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `app_share` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(400) NOT NULL,
	`page_id` int NOT NULL,
	`share_name` varchar(250) NOT NULL,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `app_share_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Centres` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`image` varchar(1250),
	`type` varchar(20),
	CONSTRAINT `Centres_id` PRIMARY KEY(`id`),
	CONSTRAINT `title_idx` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `ClientResponses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`generated_id` varchar(300) NOT NULL,
	`admin_id` varchar(300) NOT NULL,
	`status` varchar(20),
	`responses` json NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ClientResponses_id` PRIMARY KEY(`id`),
	CONSTRAINT `gen_idx` UNIQUE(`generated_id`)
);
--> statement-breakpoint
CREATE TABLE `Courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` text NOT NULL,
	`term` text NOT NULL,
	`name` varchar(256),
	`startedYear` year,
	`eligibility` varchar(256),
	`image` varchar(256),
	`level` varchar(30),
	CONSTRAINT `Courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `Events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` varchar(500),
	`date` date,
	`images` varchar(1250),
	`eventType` enum('Upcoming Event','Announcement','Events','NSS Event'),
	`link` varchar(256),
	CONSTRAINT `Events_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `HomeCarousel` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`image` varchar(1250),
	`subtitle` varchar(256),
	CONSTRAINT `HomeCarousel_id` PRIMARY KEY(`id`),
	CONSTRAINT `title_idx` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `QuestionsDb` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question_no` int NOT NULL,
	`title` varchar(256) NOT NULL,
	`option_len` int,
	`type` varchar(20),
	`options_list` json,
	`required` boolean NOT NULL,
	`date` date,
	CONSTRAINT `QuestionsDb_id` PRIMARY KEY(`id`),
	CONSTRAINT `title_idx` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `app_review_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`place_id` int NOT NULL,
	`review` varchar(3000) NOT NULL,
	`rating` decimal(2,1) NOT NULL DEFAULT 0,
	`status` text,
	`added_at` timestamp DEFAULT (now()),
	CONSTRAINT `app_review_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `webcode_enquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tname` varchar(200) NOT NULL,
	`tphone` varchar(200) NOT NULL,
	`tmail` varchar(200) NOT NULL,
	`t_type` varchar(300) NOT NULL,
	`tmessage` varchar(5000) NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `webcode_enquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `app_activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`activity_type` text,
	`activity_value` varchar(500),
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `app_activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `app_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` json NOT NULL,
	`name` varchar(300),
	`image` varchar(600) NOT NULL,
	`sub_categories` json NOT NULL DEFAULT ('[]'),
	CONSTRAINT `app_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `app_logintable` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(256),
	`mobile` varchar(100) NOT NULL,
	`device_name` varchar(256) NOT NULL,
	`categories` json NOT NULL DEFAULT ('[]'),
	`login_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `app_logintable_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `app_place` (
	`id` int AUTO_INCREMENT NOT NULL,
	`paid` boolean NOT NULL DEFAULT false,
	`period` int NOT NULL DEFAULT 0,
	`end_date` date DEFAULT '2024-12-21',
	`google_location` varchar(1000) NOT NULL,
	`app_category_id` int NOT NULL,
	`app_sub_suggestions` json NOT NULL DEFAULT ('[]'),
	`name` varchar(300) NOT NULL,
	`place` varchar(300) NOT NULL,
	`sub_place` varchar(300) NOT NULL,
	`panchayat_id` int,
	`ward_no` int,
	`rating` decimal(2,1) NOT NULL DEFAULT 0,
	`pincode` int,
	`address` varchar(5000) NOT NULL,
	`phone` json NOT NULL DEFAULT ('[]'),
	`email` varchar(300),
	`website` varchar(100),
	`social` json NOT NULL DEFAULT ('[]'),
	`description` varchar(1000),
	`additional_data` varchar(1000),
	`images` json NOT NULL DEFAULT ('[]'),
	`videos` json NOT NULL DEFAULT ('[]'),
	`facilities` json NOT NULL DEFAULT ('[]'),
	`activities` json NOT NULL DEFAULT ('[]'),
	`working_days` json,
	`opening_time` json,
	`nearest_places` json NOT NULL DEFAULT ('[]'),
	`latitude` varchar(100) NOT NULL DEFAULT '0.00',
	`longitude` varchar(100) NOT NULL DEFAULT '0.00',
	`added_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `app_place_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
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
ALTER TABLE `app_review_table` ADD CONSTRAINT `app_review_table_user_id_app_logintable_id_fk` FOREIGN KEY (`user_id`) REFERENCES `app_logintable`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `app_activities` ADD CONSTRAINT `app_activities_user_id_app_logintable_id_fk` FOREIGN KEY (`user_id`) REFERENCES `app_logintable`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `app_place` ADD CONSTRAINT `app_place_app_category_id_app_categories_id_fk` FOREIGN KEY (`app_category_id`) REFERENCES `app_categories`(`id`) ON DELETE no action ON UPDATE no action;