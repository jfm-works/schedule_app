<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<?php
    $userid = $_POST['userid'];
    $date = $_POST['date'];
    $start_time = timeConvert($_POST['start_time']);
    $end_time = timeConvert($_POST['end_time']);

    

    //start_time補正
    function timeConvert($input){
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
        default:
          return "";
      endswitch;
    }
  
  echo $userid;
  echo "<br>";
  echo $date;
  echo "<br>";
  echo $start_time;
  echo "<br>";
  echo $end_time;
  echo "<br>";
?>
</body>
</html>

