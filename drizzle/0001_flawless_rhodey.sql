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