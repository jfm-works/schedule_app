<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
<div class="container">
  <div class="table-responsive">
  <table id="result_table" class="table table-bordered" style="table-layout:fixed;">
  <thead id="result_thead"></thead>
  <tbody id="result_tbody"></tbody>
  </table>
  </div>
  <div id="post_result"></div>
  <button onClick='post()'>"1","2020-09-05","09:00:00","18:00:00"</button>
  <form action="/posttest.php" method="post">
    <input type="text" name="userid" value="1">
    <input type="text" name="date" value="2020-09-05">
    <input type="text" name="start_time" value="09:00:00">
    <input type="text" name="end_time" value="18:00:00">
    <input type="submit" value="送信">
  </form>
</div>
  <?php
    // phpinfo();
    
    $dsn = 'mysql:host=mysql;dbname=schedule';
    $user = 'root';
    $password = 'root';

    // try {
    //   # hostには「docker-compose.yml」で指定したコンテナ名を記載
    //   $db = new PDO($dsn, 'root', 'root');

    //   $sql = "SELECT * FROM work_time";
    //   $stmt = $db->prepare($sql);
    //   $stmt->execute();
    //   $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //   var_dump($result);
    // } catch (PDOException $e) {
    //     echo $e->getMessage();
    //     exit;
    // }
    
    try{
      $dbh = new PDO($dsn, $user, $password);
      $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
      // echo "接続成功";
      
      $sql = 'SELECT * FROM work_time';
      $statement = $dbh -> query($sql);
      $work_time_array = $statement -> fetchAll(PDO::FETCH_NUM);

      $sql = 'SELECT * FROM users';
      $statement = $dbh -> query($sql);
      $user_list_array = $statement -> fetchAll(PDO::FETCH_NUM);

      // //レコード件数取得
      // $row_count = $statement->rowCount();
      
      // while($row = $statement->fetch()){
      //   $rows[] = $row;
      // }
      
      // foreach ($statement as $row) {
      //   $rows[] = $row;
      // }
      
      
      //データベース接続切断
      $dbh = null;
        
    }catch (PDOException $e){
      print('Error:'.$e->getMessage());
      die();
    }
  ?>


<script>
let user_list = [];
let raw_user_list = (<?= json_encode($user_list_array) ?>);
raw_user_list.forEach(e => {
  user_list.push([e[0],e[1]]);
});
let work_time_list = (<?= json_encode($work_time_array) ?>);
work_time_list.forEach(e => {
  e.shift();
});
console.log(work_time_list);

</script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js" integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous"></script>
<script src="/js/script.js"></script>
<script>
  // let post_data = {userid: "1", date:"2020-09-05", start_time:"09:00:00",end_time:"18:00:00"}
// XHRの宣言
  function post() {
    //console.log(post_data);
    let post_data = "userid=1&date=2020-09-05&start_time=09:00:00&end_time=18:00:00"
    var XHR = new XMLHttpRequest();
    // openメソッドにPOSTを指定して送信先のURLを指定します
    XHR.open("POST", "/post.php", true);
    XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8' );
    // sendメソッドにデータを渡して送信を実行する
    XHR.send(post_data);

    // サーバの応答をonreadystatechangeイベントで検出して正常終了したらデータを取得する
    XHR.onreadystatechange = function(){
      if(XHR.readyState == 4 && XHR.status == 200){
        // POST送信した結果を表示する
        console.log("XHR OK");
        document.getElementById("post_result").innerHTML = XHR.responseText;
      }
    };
  }

</script>
</body>
</html>