# スケジュールアプリ
docker公式のphp:7.4.10-apacheにpdoを追加したものと、docker公式のmysql:8のセットです。  
phpとmysqlの開発・実行環境として使います。  

## Docker
- php  
  - pdoドライバ使用可能  
- mysql  
  - 日本語使用可能  

## 使い方  
- スケジュール登録  
  セルをクリックすると出勤・退勤時間の入力画面がポップアップされる。  
  (入力内容がpost.phpに送信され、DBに登録される)  
- スケジュール修正(未実装)  
- スケジュール一括登録(未実装)  
- 祝日データ取り込み(未実装)  
- スケジュール変更を管理者に通知(未実装)  

## API  
- post/php に userid,date,start_time,end_time をpostするとDBに登録される  
- 例　userid=1&date=2020-09-05&start_time=09:00:00&end_time=18:00:00