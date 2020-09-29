# docker-php_apache
docker公式のphp:7.4.10-apacheにpdoを追加したものと、
docker公式のmysql:8のセットです。
phpとmysqlの開発・実行環境として使います。

●php
 pdoドライバ使用可能
 
●mysql
 ○日本語使用可能
 ○初期状態として、以下が投入されている。
  CREATE DATABASE test;
  USE test;
  CREATE TABLE name (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL
  )DEFAULT CHARACTER SET=utf8;
  INSERT INTO name (name) VALUES ("Tanaka"),("鈴木"),("ＫＡＴＯ");
