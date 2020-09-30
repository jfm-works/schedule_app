  console.log(user_list,work_time_list);

  function makeCalendarCell(user_name,yyyymmdd,start_time="",end_time="") {
    const tr = document.getElementById(user_name[0]+user_name[1]);
    const td = document.createElement('td');
    const youbi = [ "日", "月", "火", "水", "木", "金", "土" ][new Date(yyyymmdd).getDay()];
    const contents = document.createTextNode(start_time+"-"+end_time);
    td.dataset.user_id = user_name[0];
    td.dataset.user_name = user_name[1];
    td.dataset.date = yyyymmdd;
    td.dataset.youbi = youbi;
    td.classList.add("calendar-cell",youbi);
    td.appendChild(contents);
    tr.appendChild(td);
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

  calendar_data = {};
  calendar_data = initializeCalenderData(-31,31,calendar_data);
  calendar_data = calendarAddWorkTimeList(work_time_list,calendar_data);

  console.log(calendar_data);

  makeCalenderTable(calendar_data,-31,31)

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
    const contents = document.createTextNode("#");
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