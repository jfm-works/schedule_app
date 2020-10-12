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

    $userid = preg_replace("/[^0-9]/","",$_POST['userid']);
    $date = preg_replace("/[^0-9\-]/","",$_POST['date']);
    $start_time = timeConvert($_POST['start_time']);
    $end_time = timeConvert($_POST['end_time']);

    $stmt = $dbh->prepare("INSERT INTO work_time (id, userid, date, start_time, end_time) VALUES (0, :userid, :date, :start_time, :end_time)");

    $stmt->bindValue(':userid', $userid, PDO::PARAM_INT);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':start_time', $start_time);
    $stmt->bindParam(':end_time', $end_time);

    $stmt->execute();
    $id = $dbh->lastInsertId();
    //$restxt = '{"state":OK, "userid":"' . $userid . '", "date":"' . $date . '", "start_time":"' . $start_time . '", "end_time":"' . $end_time . '"}';
    $restxt = [
      "state"=>"OK",
      "id"=>$id,
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