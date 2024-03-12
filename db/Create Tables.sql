DROP SCHEMA S10P22C108;
CREATE SCHEMA S10P22C108 CHARACTER SET utf8mb4;

USE S10P22C108;

CREATE TABLE `users` (
	`user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`kakao_id` BIGINT NOT NULL,
	`nickname` VARCHAR(255) NOT NULL,
	`profile_url` VARCHAR(255),
	`thumbnail_url` VARCHAR(255),
	`birthday` VARCHAR(4),
	`phonenumber` VARCHAR(20),
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `parties` (
	`party_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`access_code` CHAR(6) NOT NULL,
	`party_name` VARCHAR(32) NOT NULL,
	`start_time` TIMESTAMP,
	`end_time` TIMESTAMP,
	`deleted` BOOLEAN NOT NULL,
	`user_id` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`party_id`)
);

CREATE TABLE `missions` (
	`mission_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`mission_content` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`mission_id`)
);

CREATE TABLE `messages` (
	`message_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`message_type` BOOLEAN NOT NULL,
	`content` VARCHAR(255),
	`created_time` TIMESTAMP NOT NULL,
	`sender_id` INT UNSIGNED NOT NULL,
	`chat_id` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`message_id`)
);

CREATE TABLE `mission_status` (
	`mission_status_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`get_time` TIMESTAMP NOT NULL,
	`confirm_time` TIMESTAMP,
	`success_time` TIMESTAMP,
	`mission_image_url` VARCHAR(255),
	`mission_id` INT UNSIGNED NOT NULL,
	`guest_id` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`mission_status_id`)
);

CREATE TABLE `hints` (
	`hint_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`hint_content` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`hint_id`)
);

CREATE TABLE `hint_status` (
	`hint_status_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`hint_status_answer` VARCHAR(255),
	`hint_id` INT UNSIGNED NOT NULL,
	`guest_id` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`hint_status_id`)
);

CREATE TABLE `chats` (
	`chat_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`maniti_id` INT UNSIGNED,
	`created_time` TIMESTAMP NOT NULL,
	`party_id` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`chat_id`)
);

CREATE TABLE `guests` (
	`guest_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`maniti_id` INT UNSIGNED,
	`voted_id` INT UNSIGNED,
	`party_id` INT UNSIGNED,
	`chat_id` INT UNSIGNED NOT NULL,
	`user_id` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`guest_id`)
);

CREATE TABLE `topics` (
	`topic_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`topic_content` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`topic_id`)
);

CREATE TABLE `results` (
	`result_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`manito_favorability` INT,
	`maniti_favorability` INT,
	`manito_wordcount` VARCHAR(255),
	`maniti_wordcount` VARCHAR(255),
	`manito_ratio` INT,
	`maniti_ratio` INT,
	`guest_id` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`result_id`)
);
