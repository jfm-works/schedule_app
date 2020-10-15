<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>スケジュールアプリ</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="container p-0">
        <div class="mockup-outer mx-auto d-flex flex-column">
          <div class="mockup-inner d-flex flex-column justify-content-between" style="max-width:100%">
            <div id="calendar_area"class="col-auto"  style="max-width:100%;height:420px">
              <div class="table-responsive">
                <div class="m-0 text-center" data-heading-active-user></div>
                <div class="d-flex justify-content-around">
                  <div data-prev-month class="col-2 text-center"></div>
                  <div data-heading-yyyymm="" class="m-0 text-center col-6"></div>
                  <div data-next-month class="col-2 text-center"></div>
                </div>
                <table class="table table-bordered" style="table-layout:fixed;">
                  <tr>
                    <th class="p-0 text-center">月</th>
                    <th class="p-0 text-center">火</th>
                    <th class="p-0 text-center">水</th>
                    <th class="p-0 text-center">木</th>
                    <th class="p-0 text-center">金</th>
                    <th class="p-0 text-center">土</th>
                    <th class="p-0 text-center">日</th>
                  </tr>
                  <tr>
                    <td data-calendar-position-1 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-1></div><div data-calendar-position-inner-1></div></td>
                    <td data-calendar-position-2 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-2></div><div data-calendar-position-inner-2></div></td>
                    <td data-calendar-position-3 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-3></div><div data-calendar-position-inner-3></div></td>
                    <td data-calendar-position-4 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-4></div><div data-calendar-position-inner-4></div></td>
                    <td data-calendar-position-5 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-5></div><div data-calendar-position-inner-5></div></td>
                    <td data-calendar-position-6 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-6></div><div data-calendar-position-inner-6></div></td>
                    <td data-calendar-position-7 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-7></div><div data-calendar-position-inner-7></div></td>
                  </tr>
                  <tr>
                    <td data-calendar-position-8 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-8></div><div data-calendar-position-inner-8></div></td>
                    <td data-calendar-position-9 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-9></div><div data-calendar-position-inner-9></div></td>
                    <td data-calendar-position-10 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-10></div><div data-calendar-position-inner-10></div></td>
                    <td data-calendar-position-11 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-11></div><div data-calendar-position-inner-11></div></td>
                    <td data-calendar-position-12 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-12></div><div data-calendar-position-inner-12></div></td>
                    <td data-calendar-position-13 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-13></div><div data-calendar-position-inner-13></div></td>
                    <td data-calendar-position-14 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-14></div><div data-calendar-position-inner-14></div></td>
                  </tr>
                  <tr>
                    <td data-calendar-position-15 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-15></div><div data-calendar-position-inner-15></div></td>
                    <td data-calendar-position-16 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-16></div><div data-calendar-position-inner-16></div></td>
                    <td data-calendar-position-17 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-17></div><div data-calendar-position-inner-17></div></td>
                    <td data-calendar-position-18 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-18></div><div data-calendar-position-inner-18></div></td>
                    <td data-calendar-position-19 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-19></div><div data-calendar-position-inner-19></div></td>
                    <td data-calendar-position-20 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-20></div><div data-calendar-position-inner-20></div></td>
                    <td data-calendar-position-21 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-21></div><div data-calendar-position-inner-21></div></td>
                  </tr>
                  <tr>
                    <td data-calendar-position-22 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-22></div><div data-calendar-position-inner-22></div></td>
                    <td data-calendar-position-23 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-23></div><div data-calendar-position-inner-23></div></td>
                    <td data-calendar-position-24 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-24></div><div data-calendar-position-inner-24></div></td>
                    <td data-calendar-position-25 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-25></div><div data-calendar-position-inner-25></div></td>
                    <td data-calendar-position-26 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-26></div><div data-calendar-position-inner-26></div></td>
                    <td data-calendar-position-27 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-27></div><div data-calendar-position-inner-27></div></td>
                    <td data-calendar-position-28 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-28></div><div data-calendar-position-inner-28></div></td>
                  </tr>
                  <tr>
                    <td data-calendar-position-29 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-29></div><div data-calendar-position-inner-29></div></td>
                    <td data-calendar-position-30 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-30></div><div data-calendar-position-inner-30></div></td>
                    <td data-calendar-position-31 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-31></div><div data-calendar-position-inner-31></div></td>
                    <td data-calendar-position-32 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-32></div><div data-calendar-position-inner-32></div></td>
                    <td data-calendar-position-33 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-33></div><div data-calendar-position-inner-33></div></td>
                    <td data-calendar-position-34 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-34></div><div data-calendar-position-inner-34></div></td>
                    <td data-calendar-position-35 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-35></div><div data-calendar-position-inner-35></div></td>
                  </tr>
                  <tr>
                    <td data-calendar-position-36 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-36></div><div data-calendar-position-inner-36></div></td>
                    <td data-calendar-position-37 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-37></div><div data-calendar-position-inner-37></div></td>
                    <td data-calendar-position-38 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-38></div><div data-calendar-position-inner-38></div></td>
                    <td data-calendar-position-39 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-39></div><div data-calendar-position-inner-39></div></td>
                    <td data-calendar-position-40 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-40></div><div data-calendar-position-inner-40></div></td>
                    <td data-calendar-position-41 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-41></div><div data-calendar-position-inner-41></div></td>
                    <td data-calendar-position-42 class="calendar-td text-center" style="font-size:16px;height:57px"><div data-calendar-position-day-42></div><div data-calendar-position-inner-42></div></td>
                  </tr>
                  
                </table>
              </div>
            </div>
            <div id="message_area" class="col mx-1 d-flex flex-column justify-content-between">
              <div>
                <div data-message-header></div>
                <div data-message-worklist>カレンダーの日付をタップすると、スケジュールを登録できます。<br>「複数選択」にチェックを入れると複数の日付を選択してスケジュールを登録できます。
                </div>
              </div>

              <div class=""><label for="select"><input type="checkbox" name="select" id="select">複数選択<span class=text-danger>※未実装</span></label></div>
          </div>
        </div>
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
<hr>

  <div class=container>
  <h4>デバッグ情報</h4>
  <div><button onClick="db.db_work_time_insert('1','2020-10-29','09:00:00','14:00:00');">db.db_work_time_insert('1','2020-10-29','09:00:00','14:00:00'</button></div>
      <div><button onClick="console.log(work_time_list)">work_time_list</button></div>
      <div><button onClick="calendar.reload()">calendar.reload()</button></div>
      <div><button onClick="db.db_work_time_update('25','1','2020-10-29','09:00','18:00');">work_time_update(25,1,2020-10-29,09:00,18:00)</button></div>
      <div><button onClick="db.db_work_time_update('25','1','2020-10-29','09:00','14:00');">work_time_update(25,1,2020-10-29,09:00,14:00)</button></div>
  <hr>
    <h5>post結果</h5>
    <div id="post_result">...</div>
  </div>
<div class="container">
<h5>DB_users</h5>
<table id="users_db" class="table table-bordered">
  <thead>
    <tr>
      <th>userid</th><th>name</th><th>pw</th><th>created</th><th>isdelete</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<h5>DB_work_time</h5>
<table id="work_time_db" class="table table-bordered">
  <thead>
    <tr>
      <th>id</th><th>userid</th><th>date</th><th>start_time</th><th>end_time</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</div>
    <script>
        user_list = [];
        let raw_user_list = (<?= json_encode($user_list_array) ?>);
        raw_user_list.forEach(e => {
          user_list.push([e[0],e[1]]);
        });
        console.log("user_list",user_list);
        work_time_list = [];
        let raw_work_time_list = (<?= json_encode($work_time_array) ?>);
        // raw_work_time_list.forEach(e => {
        //   work_time_list.push([e[1],e[2],e[3],e[4]]);
        // });
        work_time_list = raw_work_time_list;
        console.log("work_time_list",work_time_list);
    </script>
    <script src="/js/script.js"></script>
    <script src="/js/panel_schedule_input.js"></script>
</body>
</html>
