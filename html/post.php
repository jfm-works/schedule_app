<?php
  $dsn = 'mysql:host=mysql;dbname=schedule';
  $user = 'root';
  $password = 'root';

  try{
    $dbh = new PDO($dsn, $user, $password);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    $userid = $_POST['userid'];
    $date = $_POST['date'];
    $start_time = $_POST['start_time'];
    $end_time = $_POST['end_time'];

    

    $stmt = $dbh->prepare("INSERT INTO work_time (id, userid, date, start_time, end_time) VALUES (0, :userid, :date, :start_time, :end_time)");

    $stmt->bindValue(':userid', $userid, PDO::PARAM_INT);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':start_time', $start_time);
    $stmt->bindParam(':end_time', $end_time);

    $stmt->execute();

    //データベース接続切断
    $dbh = null;
      
  }catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
  }
?>