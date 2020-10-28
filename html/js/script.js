
// user_list
// userid,user_name
// 0: (2) ["1", "なぎささん"]
// 1: (2) ["2", "ゆうきさん"]
// 2: (2) ["3", "ちなつさん"]
// 3: (2) ["4", "ゆかさん"]
// 4: (2) ["5", "りこさん"]

// work_time_list
// id,userid,yyyymmdd,start_time,end_time
// 0: (4) [1, "1", "2020-10-06", "09:00:00", "18:00:00"]
// 1: (4) [2, "2", "2020-10-06", "09:00:00", "18:00:00"]
// 2: (4) [3, "3", "2020-10-06", "09:00:00", "18:00:00"]
// 3: (4) [4, "4", "2020-10-06", "09:00:00", "18:00:00"]
// 4: (4) [5, "5", "2020-10-06", "09:00:00", "18:00:00"]

// users = [obj,obj,obj]
// id: "1"
// name: "なぎささん"
// work_time_list: [Array(5)]

// user_list = [];
// user_list = [
//     ["1", "なぎささん"],
//     ["2", "ゆうきさん"],
//     ["3", "ちなつさん"],
//     ["4", "ゆかさん"],
//     ["5", "りこさん"]
// ];

// work_time_list = [];
// work_time_list = [
//     [1, "1", "2020-10-06", "09:00:00", "18:00:00"],
//     [2, "2", "2020-10-07", "09:00:00", "18:00:00"],
//     [3, "3", "2020-10-08", "09:00:00", "18:00:00"],
//     [4, "4", "2020-10-09", "09:00:00", "18:00:00"],
//     [5, "5", "2020-10-10", "09:00:00", "18:00:00"],
//     [1, "1", "2020-10-08", "09:00:00", "18:00:00"],
//     [1, "1", "2020-10-09", "09:00:00", "18:00:00"]
// ];

class db_users{
    constructor(user_list){
        this.list = user_list;
    }
    reload(user_list){
        this.list = user_list;
    }
}

class db_work_time{
    constructor(work_time_list){
        this.list = work_time_list;
    }
    reload(work_time_list){
        this.list = work_time_list;
    }
}

class Calendar {
    constructor(yyyy=new Date().getFullYear(),mm=(
        new Date().getMonth() + 1),userid="1") {
        const youbi_list_monstart = [1,2,3,4,5,6,0];
        const youbi_list_sunstart = [0,1,2,3,4,5,6];
        this.calendar_config = {};
        this.calendar_config.youbi_list_start = youbi_list_monstart;
        // this.calendar_config.youbi_list_start = youbi_list_sunstart;
        this.calendar_config.youbi_list_lang = "ja";// "ja" or "en"
        this.calendar_config.youbi_name = ["日","月","火","水","木","金","土"];
        this.makeCalendar();
    }
    reload(){
        const heading_yyyymm = document.querySelectorAll('[data-heading-yyyymm]')[0];
        const yyyy = new Date(heading_yyyymm.dataset.headingYyyymm).getFullYear();
        const mm = new Date(heading_yyyymm.dataset.headingYyyymm).getMonth() + 1;
        const user = users[active_user_number];
        user.reload_work_time_list(work_time_list);
        this.makeCalendar(yyyy,mm,user);
        this.makeUserWorktimeCalendar(user);
    }

    makeCalendar(yyyy=new Date().getFullYear(),mm=(
        new Date().getMonth() + 1),user=users[active_user_number]) {

        const yyyymm01 = new Date(yyyy+"-"+("0"+String(mm)).slice(-2)+"-01");
        let next_month_yyyymm01;
        if (mm == "12") {
            next_month_yyyymm01 = new Date((Number(yyyy)+1)+"-"+"01"+"-01");
        }else{
            next_month_yyyymm01 = new Date(yyyy+"-"+("0"+String(Number(mm)+1)).slice(-2)+"-01");
        }
        let prev_month_yyyymm01;
        if (mm == "1") {
            prev_month_yyyymm01 = new Date((Number(yyyy)-1)+"-"+"12"+"-01");
        }else{
            prev_month_yyyymm01 = new Date(yyyy+"-"+("0"+String(Number(mm)-1)).slice(-2)+"-01");
        }

        const yyyymmend = new Date(yyyy,mm,0);
        const first_weekday = yyyymm01.getDay();
        const heading_yyyymm = document.querySelectorAll('[data-heading-yyyymm]')[0];
        // console.log("old data-heading-yyyymm:",heading_yyyymm.dataset.headingYyyymm);
        // console.log("new data-heading-yyyymm:",yyyymm01);
        heading_yyyymm.dataset.headingYyyymm = yyyymm01;
        const next_month = document.querySelectorAll('[data-next-month]')[0];
        next_month.dataset.onclickyyyy = next_month_yyyymm01.getFullYear();
        next_month.dataset.onclickmm = next_month_yyyymm01.getMonth()+1;
        // next_month.innerHTML = "<button onClick='calendar.makeCalendar(this.parentNode.dataset.onclickyyyy,this.parentNode.dataset.onclickmm)'>"+next_month_yyyymm01.getFullYear()+(next_month_yyyymm01.getMonth()+1)+"</button>";
        next_month.innerHTML = "<button onClick='calendar.makeCalendar(this.parentNode.dataset.onclickyyyy,this.parentNode.dataset.onclickmm)'>"+"→"+"</button>";
        const prev_month = document.querySelectorAll('[data-prev-month]')[0];
        prev_month.dataset.onclickyyyy = prev_month_yyyymm01.getFullYear();
        prev_month.dataset.onclickmm = prev_month_yyyymm01.getMonth()+1;

        // prev_month.innerHTML = "<button onClick='calendar.makeCalendar(this.parentNode.dataset.onclickyyyy,this.parentNode.dataset.onclickmm)'>"+prev_month_yyyymm01.getFullYear()+(prev_month_yyyymm01.getMonth()+1)+"</button>";
        prev_month.innerHTML = "<button onClick='calendar.makeCalendar(this.parentNode.dataset.onclickyyyy,this.parentNode.dataset.onclickmm)'>"+"←"+"</button>";

        heading_yyyymm.innerText = yyyy+"年"+mm+"月";
        //first_weekday = 日:0,月:1...土:6
        const first = (v => {
            for (let i = 0; i < this.calendar_config.youbi_list_start.length; i++) {
                const element = this.calendar_config.youbi_list_start[i];
                    if (element === first_weekday) {
                        return i+1;
                    }
                }   
        })();
        for (let i = first,j = 1,youbi = first; j < yyyymmend.getDate()+1; i++,j++,youbi++) {
            if (youbi >= 7) {
                youbi = 0;
            }
            // console.log("!!!",'[data-calendar-date-'+yyyy+("0" + mm).slice(-2)+("0" + j).slice(-2)+']');
            // console.log('[data-calendar-position-day-'+i+']');
            const cell_td = document.querySelectorAll('[data-calendar-position-'+i+']')[0];
            cell_td.classList.remove("schedule-exist","sun","sat");
            cell_td.dataset.youbi = youbi;
            const cell_day = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
            const cell_work = document.querySelectorAll('[data-calendar-position-inner-'+i+']')[0];
            cell_day.innerText = j;
            cell_work.innerHTML = "";
            cell_day.dataset.outerdate = yyyy+"-"+("0" + mm).slice(-2)+"-"+("0" + j).slice(-2);
            cell_work.dataset.innerdate = yyyy+"-"+("0" + mm).slice(-2)+"-"+("0" + j).slice(-2);
            const new_inner =  document.createElement('div');
            new_inner.dataset.calendarPositionIcon = "";       
        }
        //先月分
        for (let i = 1,j = 1; j < first; i++, j++) {
            //console.log('[data-calendar-position-'+i+']');
            //console.log('[data-calendar-position-day-'+i+']');
            const cell_td = document.querySelectorAll('[data-calendar-position-'+i+']')[0];
            cell_td.classList.remove("schedule-exist","sun","sat");
            cell_td.dataset.youbi = "";
            // const cell_td_p = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
            // cell_td_p.innerText = (yyyymm01)+"!!";
            const cell_day = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
            const cell_work = document.querySelectorAll('[data-calendar-position-inner-'+i+']')[0];
            cell_day.innerText = "";
            cell_work.innerHTML = "";
            cell_day.dataset.outerdate = "";
            cell_work.dataset.innerdate = "";
        }
        //来月分
        for (let i = yyyymmend.getDate()+first,j = 1; i < 43; i++, j++) {
            const cell_td = document.querySelectorAll('[data-calendar-position-'+i+']')[0];
            cell_td.dataset.youbi = "";
            cell_td.classList.remove("schedule-exist","sun","sat");
            // const cell_td_p = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
            // cell_td_p.innerText = (yyyymm01)+"!!";
            const cell_day = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
            const cell_work = document.querySelectorAll('[data-calendar-position-inner-'+i+']')[0];
            cell_day.innerText = "";
            cell_work.innerHTML = "";
            cell_day.dataset.outerdate = "";
            cell_work.dataset.innerdate = "";
        }
        //曜日class付与
        const domlist_sun = document.querySelectorAll('[data-youbi="0"]');
        const domlist_sat = document.querySelectorAll('[data-youbi="6"]');
        for (let i = 0; i < domlist_sun.length; i++) {
            domlist_sun[i].classList.add("sun");
            
        }
        for (let i = 0; i < domlist_sat.length; i++) {
            domlist_sat[i].classList.add("sat");
            
        }
        document.querySelectorAll(".calendar-td").forEach(dom => {
            dom.classList.remove("checked");
        });
        document.querySelectorAll('[data-message-header]')[0].innerHTML="";
        document.querySelectorAll('[data-message-worklist]')[0].innerHTML="カレンダーの日付をタップすると、スケジュールを登録できます。<br>「複数選択」にチェックを入れると複数の日付を選択してスケジュールを登録できます。";
        this.makeUserWorktimeCalendar(user); 
    }

    makeUserWorktimeCalendar(user){
        // user.id
        // user.name
        // user.work_time_list = [id,userid,yyyymmdd,start_time,end_time]
        console.log("★makeUserWorktimeCalendar");
        user.work_time_list.forEach(work_time_list => {
            const write_dom = document.querySelectorAll('[data-innerdate="'+work_time_list[2]+'"] ')[0];
            if (!write_dom) {
                console.log("write_dom undefined");
                return;
            }
            write_dom.innerHTML = "";
            const td = write_dom.parentNode;
            td.classList.add("schedule-exist");
            const schedule_btn = document.createElement('div');
            schedule_btn.dataset.user_id = user.id;
            schedule_btn.dataset.user_name = user.name;
            schedule_btn.dataset.work_time_list_id = work_time_list[0];
            schedule_btn.dataset.date = work_time_list[2];
            schedule_btn.dataset.start_time = work_time_list[3];
            schedule_btn.dataset.end_time = work_time_list[4];
            schedule_btn.classList.add("schedule-btn");
            schedule_btn.innerHTML = work_time_list[3].slice(0,2) +"-"+work_time_list[4].slice(0,2);
            write_dom.style = "font-size:12px";
            write_dom.appendChild(schedule_btn);

        });
    }
    clickSchedule(innerdiv){
        if (!innerdiv.dataset.innerdate) {
            return;
        }
        document.querySelectorAll(".calendar-td").forEach(dom => {
            dom.classList.remove("checked");
        });
        innerdiv.parentNode.classList.add("checked");
        const message_header = document.querySelectorAll('[data-message-header]')[0];
        console.log(new Date(innerdiv.dataset.innerdate));
        
        const weekday = new Date(innerdiv.dataset.innerdate).getDay();
        message_header.innerHTML= innerdiv.dataset.innerdate + "(" + calendar.calendar_config.youbi_name[weekday] + ")の予定";
        const message_worklist = document.querySelectorAll('[data-message-worklist]')[0];
        if (!innerdiv.firstElementChild) {
            console.log("なし");
            message_worklist.innerHTML = "予定なし";
            message_worklist.innerHTML += panel.single_task_registration(innerdiv); 
        }else{
            console.log("あり");
            message_worklist.innerHTML = "出勤"+innerdiv.firstElementChild.dataset.start_time.slice(0,5) + " 退勤" + innerdiv.firstElementChild.dataset.end_time.slice(0,5);
            message_worklist.innerHTML += panel.single_task_changed(innerdiv.firstElementChild);
        }
        // 複数選択モード
        // 変更する     
        // 削除する
        // キャンセル

        // 複数選択モード
        // 登録する
        // キャンセル
    }
    multiClickSchedule(){

    }
    createSchedule(){
        
    }
    readSchedule(){

    }
    updateSchedule(){

    }
    deleteSchedule(){

    }

    updateCalendar(yyyymm,user){

    }
}

class User {
    constructor(userid, user_list, alluser_work_time_list) {
        //this.work_time_list = work_time_list;
        this.id = userid;
        this.name = user_list.filter(user => user[0] === userid)[0][1];
        this.work_time_list = alluser_work_time_list.filter(list => list[1] === userid);
        console.log(this.name,this.work_time_list);     
    }
   reload_work_time_list(alluser_work_time_list){
        this.work_time_list = alluser_work_time_list.filter(list => list[1] === this.id);
   }
}

class Db_connector{
    db_work_time_insert(userid,date,start_time,end_time){
        var XHR = new XMLHttpRequest();
        let post_data = "userid="+userid+"&date="+date+"&start_time="+start_time+"&end_time="+end_time;
        XHR.open("POST", "/post-insert.php", true);
        XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8' );
        XHR.send(post_data);
        XHR.onreadystatechange = function(){
          if(XHR.readyState == 4 && XHR.status == 200){
            console.log("XHR OK");
            document.getElementById("post_result").innerHTML = XHR.responseText;
            console.log(XHR.responseText);
            const raw_res_status = XHR.responseText;
            const res_status = JSON.parse(raw_res_status);
            if (res_status.state === "OK") {
              console.log("OK");
            //   calendar_data = addCalendar(res_status,calendar_data);
            console.log(res_status.id,res_status.userid,res_status.date,res_status.start_time,res_status,end_time);
            work_time_list.push([Number(res_status.id),res_status.userid,res_status.date,res_status.start_time,res_status.end_time]);
            users.filter(list => list.id === res_status.userid)[0].reload_work_time_list(work_time_list);
            // calendar.makeUserWorktimeCalendar(users[active_user_number]);
            calendar.reload();
            }else{
              console.log("NG");
            }
          }
        };
    }
    db_work_time_delete(work_time_id,user_id){
        console.log("delete work_time_id",work_time_id);
        var XHR = new XMLHttpRequest();
        let post_data = "delete_id="+work_time_id;
        XHR.open("POST", "/post-delete.php", true);
        XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8' );
        XHR.send(post_data);
        XHR.onreadystatechange = function(){
          if(XHR.readyState == 4 && XHR.status == 200){
            console.log("XHR OK");
            document.getElementById("post_result").innerHTML = XHR.responseText;
            console.log(XHR.responseText);
            const raw_res_status = XHR.responseText;
            const res_status = JSON.parse(raw_res_status);
            if (res_status.state === "delete OK") {
              console.log("delete OK");
              console.log("oldlist:",work_time_list);
              work_time_list = work_time_list.filter(work_time_list => work_time_list[0] !== Number(work_time_id));
              console.log("newlist:",work_time_list);
              calendar.reload();
            //   calendar_data = addCalendar(res_status,calendar_data);
            // work_time_list.push([Number(res_status.id),res_status.userid,res_status.date,res_status.start_time,res_status.end_time]);
            // users.filter(list => list.id === res_status.userid)[0].reload_work_time_list(work_time_list);
            // calendar.makeUserWorktimeCalendar(users[active_user_number]);
            }else{
              console.log("NG");
            }
          }
        };
    }
    db_work_time_update(update_id,userid,date,start_time,end_time){
        console.log("db_work_time_update");
        var XHR = new XMLHttpRequest();
        let post_data = "update_id="+update_id+"&userid="+userid+"&date="+date+"&start_time="+start_time+"&end_time="+end_time;
        XHR.open("POST", "/post-update.php", true);
        XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8' );
        XHR.send(post_data);
        XHR.onreadystatechange = function(){
          if(XHR.readyState == 4 && XHR.status == 200){
            console.log("XHR OK");
            document.getElementById("post_result").innerHTML = XHR.responseText;
            console.log(XHR.responseText);
            const raw_res_status = XHR.responseText;
            const res_status = JSON.parse(raw_res_status);
            if (res_status.state === "update OK") {
              console.log("OK");
            //   calendar_data = addCalendar(res_status,calendar_data);
            console.log(res_status.id,res_status.userid,res_status.date,res_status.start_time,res_status,end_time);
            work_time_list.push([Number(res_status.update_id),res_status.userid,res_status.date,res_status.start_time,res_status.end_time]);
            users.filter(list => list.id === res_status.userid)[0].reload_work_time_list(work_time_list);
            // calendar.makeUserWorktimeCalendar(users[active_user_number]);
            calendar.reload();
            }else{
              console.log("NG");
            }
          }
        };
    }
}

users = [];
user_list.forEach(array => {
    console.log("makeuser",array[0],user_list, work_time_list);
    users.push(new User(array[0],user_list, work_time_list));
});
console.log(users);

console.log(users[0].id);
users[0].reload_work_time_list(work_time_list);

//★
active_user_id = "1";
active_user_number = 0;
//

calendar = new Calendar();
console.log("★");


for (let i = 0; i < users.length; i++) {
    console.log("active_user_number",i,users[i]);
    if (active_user_id === users[i].id) {
        console.log("active_user_number",active_user_id,"i",i,users[i]);
        active_user_number = i;
        if (users[active_user_number].name.slice(-2) !== "さん") {
            document.querySelectorAll('[data-heading-active-user]')[0].innerHTML = users[active_user_number].name+"さんの予定";
        } else {
            document.querySelectorAll('[data-heading-active-user]')[0].innerHTML = users[active_user_number].name+"の予定";
        }
        break;
    }   
}
console.log(users[active_user_number]);
calendar.makeUserWorktimeCalendar(users[active_user_number]);
const db = new Db_connector();

const calendarClick = document.querySelectorAll('.calendar-td');
for(var i = 0; i < calendarClick.length; i++){
    calendarClick[i].addEventListener('click',function(){
        if (this.classList.contains("schedule-exist")) {
            console.log("work exist");
            console.log(this.children[1].firstElementChild);
            calendar.clickSchedule(this.children[1])
        }else{
            console.log("work none");
            console.log(this.children[1]);
            calendar.clickSchedule(this.children[1])
        }
    });
}

function updateDbView(list,target_table) {
    if (document.getElementById(target_table)) {
      const tbody = document.getElementById(target_table).children[1];
      list.forEach(elements => {
        const tr = document.createElement("tr");
        elements.forEach(element => {
          const td = document.createElement("td");
          const contents = document.createTextNode(element);
          td.appendChild(contents);
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    }
  }

  updateDbView(raw_user_list,"users_db");
  // updateDbView(user_list,"users_db");
  updateDbView(work_time_list,"work_time_db");
  // updateDbView(work_time_list,"work_time_db");

//calendar create
//カレンダーを作成
//userid,date

//calendar update
//カレンダーの一部だけ変更
//

//calendar click
//クリックしてパネルを呼び出す
//userid,date -> data -> panel
//

