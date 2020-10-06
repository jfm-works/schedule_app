DROP DATABASE IF EXISTS schedule;
CREATE DATABASE schedule;
USE schedule;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
userid varchar(20) NOT NULL PRIMARY KEY,
name varchar(20),
pw varchar(48) NOT NULL DEFAULT (left(md5(((rand() * 100) + 1)),8)),
created timestamp NOT NULL DEFAULT (now()),
isdelete tinyint(1) NOT NULL DEFAULT false
)DEFAULT CHARACTER SET=utf8;
INSERT INTO users (userid,name) VALUES (1,"なぎささん"),(2,"ゆうきさん"),(3,"ちなつさん"),(4,"ゆかさん"),(5,"りこさん");
DROP TABLE IF EXISTS work_time;
CREATE TABLE work_time (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
userid varchar(20) NOT NULL,
date date,
start_time time,
end_time time
)DEFAULT CHARACTER SET=utf8;
 
INSERT INTO work_time (id,userid, date, start_time, end_time) VALUES (0,"1",CURDATE(),"09:00:00","18:00:00"),(0,"2",CURDATE(),"09:00:00","18:00:00"),(0,"3",CURDATE(),"09:00:00","18:00:00"),(0,"4",CURDATE(),"09:00:00","18:00:00"),(0,"5",CURDATE(),"09:00:00","18:00:00");

DROP TABLE IF EXISTS changed;
CREATE TABLE changed (

id INT NOT NULL PRIMARY KEY,
userid varchar(20) NOT NULL,
time timestamp NOT NULL DEFAULT (now()),
update_contents varchar(255) NOT NULL
)DEFAULT CHARACTER SET=utf8;