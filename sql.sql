CREATE TABLE `lawbook`.`blog_shelf` ( `blog_id` VARCHAR(40) NOT NULL ,
`user_id` INT NOT NULL , `favorite` BOOLEAN NOT NULL DEFAULT FALSE ,
`likes` TINYINT(1) NOT NULL DEFAULT '0' , 
PRIMARY KEY (`blog_id`, `user_id`))