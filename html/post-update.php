<?php
  $dsn = 'mysql:host=mysql;dbname=schedule';
  $user = 'root';
  $password = 'root';

      //start_time,end_timeをhh:mm:ssに補正
      function timeConvert($input){
        $input = preg_replace("/[^0-9]/","",$input);
        switch (strlen($input)):
          case 0:
              return "";
              break;
          case 1:
              return "0" . $input . ":00:00";
              break;
          case 2:
              return $input . ":00:00";
              break;
          case 3:
            return "0" .substr($input,0,1) . ":" . substr($input,1,2) . ":00";
            break;
          case 4:
            return substr($input,0,2) . ":" . substr($input,2,2) . ":00";
            break;
          case 5:
            return "0" . substr($input,0,1) . ":" . substr($input,1,2) . ":" . substr($input,3,2);
            break;
          case 6:
            return substr($input,0,2) . ":" . substr($input,2,2) . ":" . substr($input,4,2);
            break;
          default:
            return $input;
        endswitch;
      }

  try{
    $dbh = new PDO($dsn, $user, $password);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    $update_id = preg_replace("/[^0-9]/","",$_POST['update_id']);
    $userid = preg_replace("/[^0-9]/","",$_POST['userid']);
    $date = preg_replace("/[^0-9\-]/","",$_POST['date']);
    $start_time = timeConvert($_POST['start_time']);
    $end_time = timeConvert($_POST['end_time']);
    $title = $_POST['title'];

    $stmt = $dbh->prepare("UPDATE work_time SET date = :date, start_time = :start_time, end_time = :end_time, title = :title WHERE id = :id");

    $stmt->bindValue(':id', $update_id, PDO::PARAM_INT);
    $stmt->bindValue(':date', $date);
    $stmt->bindValue(':start_time', $start_time);
    $stmt->bindValue(':end_time', $end_time);
    $stmt->bindParam(':title', $title);

    $stmt->execute();
    //$restxt = '{"state":OK, "userid":"' . $userid . '", "date":"' . $date . '", "start_time":"' . $start_time . '", "end_time":"' . $end_time . '"}';
    $restxt = [
      "state"=>"update OK",
      "update_id"=>$update_id,
      "userid"=>$userid,
      "date"=>$date,
      "start_time"=>$start_time,
      "end_time"=>$end_time,
      "title"=>htmlspecialchars($title)
    ];
    echo json_encode($restxt,JSON_UNESCAPED_UNICODE);

    //データベース接続切断
    $dbh = null;
    
  }catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
  }
?>