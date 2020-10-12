<?php
  $dsn = 'mysql:host=mysql;dbname=schedule';
  $user = 'root';
  $password = 'root';

  try{
    $dbh = new PDO($dsn, $user, $password);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $dbh = new PDO($dsn, $user, $password);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    $update_id = '25'; 
    $userid = '1';
    $date = '2020-10-29';
    $start_time = '09:00:00';
    $end_time = '18:00:00';

    $stmt = $dbh->prepare("UPDATE work_time SET date = :date, start_time = :start_time, end_time = :end_time WHERE id = :id");

    $stmt->bindValue(':id', $update_id, PDO::PARAM_INT);
    $stmt->bindValue(':date', $date);
    $stmt->bindValue(':start_time', $start_time);
    $stmt->bindValue(':end_time', $end_time);

    $stmt->execute();
    $restxt = [
      "state"=>"update OK",
      "update_id"=>$update_id,
      "userid"=>$userid,
      "date"=>$date,
      "start_time"=>$start_time,
      "end_time"=>$end_time
    ];
    echo json_encode($restxt,JSON_UNESCAPED_UNICODE);

    //データベース接続切断
    $dbh = null;
    
  }catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
  }
?>