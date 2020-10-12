<?php
  $dsn = 'mysql:host=mysql;dbname=schedule';
  $user = 'root';
  $password = 'root';

  try{
    $dbh = new PDO($dsn, $user, $password);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    $delete_id = preg_replace("/[^0-9]/","",$_POST['delete_id']);



    $sql = 'delete from work_time where id = :delete_id';
    $stmt = $dbh->prepare($sql);


    $stmt->bindValue(':delete_id', $delete_id, PDO::PARAM_INT);

    $stmt->execute();
    $restxt = [
      "state"=>"delete OK",
      "delete_id"=>$delete_id
    ];
    echo json_encode($restxt,JSON_UNESCAPED_UNICODE);

    //データベース接続切断
    $dbh = null;
    
  }catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
  }
?>