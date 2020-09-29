<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <?php
    phpinfo();
    
    $dsn = 'mysql:host=mysql;dbname=test';
    $user = 'root';
    $password = 'root';

    try {
      # hostには「docker-compose.yml」で指定したコンテナ名を記載
      $dsn = "mysql:host=mysql;dbname=test;";
      $db = new PDO($dsn, 'root', 'root');

      $sql = "SELECT * FROM name";
      $stmt = $db->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      var_dump($result);
    } catch (PDOException $e) {
        echo $e->getMessage();
        exit;
    }
  ?>
</body>
</html>