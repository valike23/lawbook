ALTER TABLE `book` ADD 
`type` VARCHAR(10) NOT NULL DEFAULT 'book' AFTER `picture`,
ADD `content` VARCHAR(100) NOT NULL AFTER `type`;


CREATE TABLE `lawbook`.`book_shelf` ( `book_id` INT NOT NULL , `user_id` INT NOT NULL ,
`like` BIT(1) NOT NULL DEFAULT b'0' , 
`favorite` BOOLEAN NOT NULL DEFAULT FALSE , PRIMARY KEY (`book_id`, `user_id`))

ALTER TABLE `book_shelf` CHANGE `like` `likes` BIT(1) NOT NULL DEFAULT b'0';