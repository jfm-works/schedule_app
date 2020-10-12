  console.log(user_list,work_time_list);

  calendar_data = {};
  calendar_data = initializeCalenderData(-31,31,calendar_data);
  calendar_data = calendarAddWorkTimeList(work_time_list,calendar_data);
  console.log(calendar_data);
  makeCalenderTable(calendar_data,-31,31)
  updateDbView(raw_user_list,"users_db");
  // updateDbView(user_list,"users_db");
  updateDbView(raw_work_time_list,"work_time_db");
  // updateDbView(work_time_list,"work_time_db");

  var btns = document.querySelectorAll('.calendar-cell-inner');
  for(var i = 0; i < btns.length; i++){
    btns[i].addEventListener('click',function(){
      let modal_header = document.getElementById("exampleModalLabel");
      // modal_header.innerHTML = "";
      modal_header.innerHTML = "<h5>"
      + this.dataset.date + "(" + this.dataset.youbi + ") / " + this.dataset.user_name + "の予定</h5>";
      let modal_body = document.getElementById("modalBody");
      // modal_body.innerHTML = "";
      modal_body.innerHTML = '<div><form action="/posttest.php" method="post"><input type="hidden" id="post_userid" name="userid" value="'+this.dataset.user_id+'"><input type="hidden" id="post_date" name="date" value="'+this.dataset.date+'">出勤<input type="text" id="post_start_time" name="start_time" value="'+this.dataset.start_time+'">例:9:00<br>退勤<input type="text" id="post_end_time" name="end_time" value="'+this.dataset.end_time+'">例:18:00<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" data-dismiss="modal" onClick="post()">登録</button></div>';
    },false);
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

  function makeCalendarCell(user_name,yyyymmdd,start_time="",end_time="") {
    const tr = document.getElementById(user_name[0]+user_name[1]);
    const td = document.createElement('td');
    const connainer = document.createElement('div');
    const div = document.createElement('div');
    const youbi = [ "日", "月", "火", "水", "木", "金", "土" ][new Date(yyyymmdd).getDay()];
    const contents = document.createTextNode(start_time+"-"+end_time);
    td.dataset.user_id = user_name[0];
    td.dataset.user_name = user_name[1];
    td.dataset.date = yyyymmdd;
    td.dataset.youbi = youbi;
    td.dataset.start_time = start_time;
    td.dataset.end_time = end_time;
    td.id = yyyymmdd+","+user_name[0];
    connainer.dataset.user_id = user_name[0];
    connainer.dataset.user_name = user_name[1];
    connainer.dataset.date = yyyymmdd;
    connainer.dataset.youbi = youbi;
    connainer.dataset.start_time = start_time;
    connainer.dataset.end_time = end_time;
    connainer.dataset.toggle = "modal";
    connainer.dataset.target = "#exampleModal";
    td.classList.add("calendar-cell",youbi);
    connainer.classList.add("calendar-cell-inner");
    div.appendChild(contents);
    
    if (!tr.lastChild) {
      //1列目はtr末尾にtdを追加
      connainer.appendChild(div);
      td.appendChild(connainer);
      tr.appendChild(td);
      //console.log("lastChild"+ tr.lastChild.dataset.date + "yyyymdd" + yyyymmdd);
    }else{
      //console.log("lastChild"+ tr.lastChild.dataset.date + "yyyymdd" + yyyymmdd);
      if (tr.lastChild.dataset.date === yyyymmdd) {
        //同じyyymmddのtdが存在する場合はtd内のcontainerに追加
        tr.lastChild.lastChild.appendChild(div);
      }else{
        //tdが存在しない場合はtr末尾にtdを追加
        connainer.appendChild(div);
        td.appendChild(connainer);
        tr.appendChild(td);
      }
    }  
  }

  function makeCalendarDate(yyyymmdd) {
    const tr = document.getElementById("date_tr");
    const td = document.createElement('td');
    const youbi = [ "日", "月", "火", "水", "木", "金", "土" ][new Date(yyyymmdd).getDay()];
    const contents = document.createTextNode((yyyymmdd.slice(5)).replace(/-/g, '/')+" "+youbi);
    td.dataset.name = "date_tr";
    td.dataset.date = yyyymmdd;
    td.dataset.youbi = youbi;
    td.classList.add("calendar-head-date",youbi,);
    td.appendChild(contents);
    tr.appendChild(td);
  }



  function initializeCalenderData(from,to,calendar_data) {
    for (let i = from; i < to; i++) {
      user_list.forEach(user_name => {
        //user_name[0]=unique id
        //user_name[1]=user name
        calendar_data = makeCalenderData(getAfterNdays(i),user_name[0],"","",calendar_data);
      });
    }
    return calendar_data;
  }

  function makeCalenderData(yyyymmdd,user_name,start_time,end_time,calendar_data) {
    if (!calendar_data[yyyymmdd]) {
      calendar_data[yyyymmdd] = {};
    }
    if (!calendar_data[yyyymmdd][user_name]) {
      calendar_data[yyyymmdd][user_name] = [];
    }
    if (start_time !== "" && end_time !== "") {
      calendar_data[yyyymmdd][user_name].push([start_time,end_time]);
    }
    return calendar_data;
  }

  function calendarAddWorkTimeList(work_time_list,calendar_data) {
    work_time_list.forEach(array => {
      let user_name = array[0];
      let yyyymmdd = array[1];
      let start_time = array[2];
      let end_time = array[3];
      calendar_data = makeCalenderData(yyyymmdd,user_name,start_time,end_time,calendar_data);
    });
    return calendar_data;
  }

  function formatDate(dt) {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }

  function getAfterNdays(n){
    var dt = new Date();
    dt.setDate(dt.getDate()+n);
    return formatDate(dt);
  }

  function makeCalenderTable(calendar_data,from,to){
    //make user_name header
    user_list.forEach(user_name => {
      //user_name[0]=unique id
      //user_name[1]=user name
      const table_body = document.getElementById("result_tbody");
      const tr = document.createElement('tr');
      tr.id = user_name[0]+user_name[1];
      table_body.appendChild(tr);
      const td = document.createElement('td');
      const contents = document.createTextNode(user_name[1]);
      td.appendChild(contents);
      td.classList.add("calendar-head");
      tr.appendChild(td);
    });

    //make date header
    const date_header = document.getElementById("result_thead");
    const tr = document.createElement('tr');
    tr.id = "date_tr";
    date_header.appendChild(tr);
    const td = document.createElement('td');
    const contents = document.createTextNode("名前");
    td.appendChild(contents);
    td.classList.add("calendar-head");
    tr.appendChild(td);
    for (let i = from; i < to; i++) {
      makeCalendarDate(getAfterNdays(i));
      user_list.forEach(user_name => {
        if (!calendar_data[getAfterNdays(i)][user_name[0]]) {
          calendar_data[getAfterNdays(i)][user_name[0]] = [];
        }
        if (calendar_data[getAfterNdays(i)][user_name[0]].length > 0) {
          calendar_data[getAfterNdays(i)][user_name[0]].forEach(work_time => {
            if (work_time[0] !== "" && work_time[1] !== "") {
              makeCalendarCell(user_name,getAfterNdays(i),work_time[0].slice(0,5),work_time[1].slice(0,5));
            }
          });
        }else{
          makeCalendarCell(user_name,getAfterNdays(i));
        }
      });
    }
  }

  function addCalendar(add,calendar_data) {
    console.log("!");
    let username;
      user_list.forEach(element => {
      if (element[0] === add.userid) {
        console.log("name=",element[1]);
        username = element[1];
      }
      });
    console.log("calendar make",add.date,username,add.start_time,add.end_time,calendar_data);
    makeCalenderData(add.date,username,add.start_time,add.end_time,calendar_data);
    const div = document.createElement('div');
    const contents = document.createTextNode(add.start_time.slice(0,5)+"-"+add.end_time.slice(0,5));
    div.appendChild(contents);
    document.getElementById(add.date+","+add.userid).innerHTML="";
    document.getElementById(add.date+","+add.userid).appendChild(div);
  }





  function makeCalendarYyyyMmForUserid(yyyy=new Date().getFullYear(),mm=(
    new Date().getMonth() + 1),userid="1"){
    const yyyymm01 = new Date(yyyy+"-"+mm+"-01");
    const yyyymmend = new Date(yyyy,mm,0);
    const weekday = yyyymm01.getDay();
    console.log(yyyymm01,yyyymmend,weekday);
    //weekday = 日:0,月:1...土:6
    let first = 
      (function () {
        console.log("!!!!!");
        for (let i = 0; i < calendar_config.youbi_list_start.length; i++) {
          const element = calendar_config.youbi_list_start[i];
          console.log("i",i,"calendar_config.youbi_list_start[i]",calendar_config.youbi_list_start[i]);
          if (element === weekday) {
            console.log("i",i);
            return i;
          }
        }
      })();
      for (let i = first,j = 1; j < yyyymmend.getDate()+1; i++,j++) {
        console.log('[data-calendar-position-'+i+']');
        console.log('[data-calendar-position-day-'+i+']');
        const first_cell = document.querySelectorAll('[data-calendar-position-'+i+']')[0];
        const first_cell_p = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
        const first_cell_inner = document.querySelectorAll('[data-calendar-position-inner-'+i+']')[0];
        first_cell_p.innerText = j;
        first_cell_inner.innerHTML = "";
        const new_inner =  document.createElement('div');
        new_inner.dataset.calendarPositionIcon = "";
        console.log("!!!!!" + yyyy + "-" + ("0" + mm).slice(-2) + "-" + ("0" + j).slice(-2));
        work_time_list.forEach(array => {
          if (array[0] === userid && array[1] === (yyyy + "-" + ("0" + mm).slice(-2) + "-" + ("0" + j).slice(-2))) {
            new_inner.dataset.calendarScheduleIs = true;
            new_inner.dataset.calendarScheduleUserid = array[0];
            new_inner.dataset.calendarScheduleworktime = array[1];
            new_inner.innerText= array[2]+array[3];
            first_cell_inner.appendChild(new_inner);
          }
        });
        
      }
      //先月分
      for (let i = 1,j = 1; j < first; i++, j++) {
        console.log('[data-calendar-position-'+i+']');
        console.log('[data-calendar-position-day-'+i+']');
        const first_cell = document.querySelectorAll('[data-calendar-position-'+i+']')[0];
        // const first_cell_p = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
        // first_cell_p.innerText = (yyyymm01)+"!!";
        const first_cell_day = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
        const first_cell_inner = document.querySelectorAll('[data-calendar-position-inner-'+i+']')[0];
        first_cell_day.innerText = "";
        first_cell_inner.innerHTML = "";
        console.log(yyyymm01,new Date(yyyymm01));
      }
      //来月分
      for (let i = yyyymmend.getDate()+first,j = 1; i < 43; i++, j++) {
        console.log("yyyymmend.getDate()+1",yyyymmend.getDate()+1);
        console.log('[data-calendar-position-'+i+']');
        console.log('[data-calendar-position-day-'+i+']');
        const first_cell = document.querySelectorAll('[data-calendar-position-'+i+']')[0];
        // const first_cell_p = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
        // first_cell_p.innerText = (yyyymm01)+"!!";
        const first_cell_day = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
        const first_cell_inner = document.querySelectorAll('[data-calendar-position-inner-'+i+']')[0];
        first_cell_day.innerText = "";
        first_cell_inner.innerHTML = "";
        console.log(yyyymm01,new Date(yyyymm01));
      }
  }

  function calendardataConvertCalendarcell(user) {
    
  }


// let youbi_list_monstart = ["月","火","水","木","金","土","日"];
// let youbi_list_sunstart = ["日","月","火","水","木","金","土"];
const youbi_list_monstart = [1,2,3,4,5,6,0];
const youbi_list_sunstart = [0,1,2,3,4,5,6];
calendar_config = {};
calendar_config.youbi_list_start = youbi_list_sunstart;
calendar_config.youbi_list_lang = "ja";// "ja" or "en"
console.log(calendar_config);
makeCalendarYyyyMmForUserid();