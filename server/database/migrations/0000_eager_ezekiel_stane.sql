CREATE TABLE `dogs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`breed` text NOT NULL,
	`age` integer NOT NULL,
	`gender` text NOT NULL,
	`size` text NOT NULL,
	`neutered` integer NOT NULL,
	`health_status` text NOT NULL,
	`adoption_status` text NOT NULL,
	`description` text NOT NULL,
	`preview_photo_url` text NOT NULL,
	`date_added` integer NOT NULL,
	`last_updated` integer NOT NULL,
	`vaccination_status` text NOT NULL,
	`special_needs` text
);
--> statement-breakpoint
CREATE TABLE `photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dog_id` integer NOT NULL,
	`url` text NOT NULL,
	FOREIGN KEY (`dog_id`) REFERENCES `dogs`(`id`) ON UPDATE no action ON DELETE no action
);
