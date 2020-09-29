<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
</head>
<body>
<div class="container">
  <div class="table-responsive">
  <table id="result_table" class="table fixed">
  </table>
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
      // echo "接続成功";
      
      $sql = 'SELECT * FROM work_time';
      $statement = $dbh -> query($sql);
      // $work_time_array = $statement -> fetchAll(PDO::FETCH_NUM);

      //レコード件数取得
      $row_count = $statement->rowCount();
      
      while($row = $statement->fetch()){
        $rows[] = $row;
      }
      
      foreach ($statement as $row) {
        $rows[] = $row;
      }
      
      
      //データベース接続切断
      $dbh = null;
        
    }catch (PDOException $e){
      print('Error:'.$e->getMessage());
      die();
    }
  ?>

<!-- <table class="table">
<tr><td>userid</td><td>date</td><td>start_time</td><td>end_time</td></tr>
 
<?php 
foreach($rows as $row){
?> 
<tr> 
	<td><?php echo htmlspecialchars($row['userid'],ENT_QUOTES,'UTF-8'); ?></td> 
  <td><?php echo htmlspecialchars($row['date'],ENT_QUOTES,'UTF-8'); ?></td>
	<td><?php echo htmlspecialchars($row['start_time'],ENT_QUOTES,'UTF-8'); ?></td>
  <td><?php echo htmlspecialchars($row['end_time'],ENT_QUOTES,'UTF-8'); ?></td> 
</tr> 
<?php 
} 
?> -->
<script>
  let user_list = <?php echo '["user1","user2"];' ?>;
  let work_time_list = <?php echo '[["user1","2020-10-01","09:00:00","18:00:00"],["user2","2020-10-01","09:00:00","14:00:00"]];' ?>;
  console.log(user_list,work_time_list);
  user_list.forEach(user => {
    const table = document.getElementById("result_table");
    const tr = document.createElement('tr');
    tr.id = user;
    table.appendChild(tr);
    const td = document.createElement('td');
    const contents = document.createTextNode(user);
    td.appendChild(contents);
    tr.appendChild(td);
  });
</script>



<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js" integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous"></script>

</body>
</html>