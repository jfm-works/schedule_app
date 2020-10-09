
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

user_list = [];
user_list = [
    ["1", "なぎささん"],
    ["2", "ゆうきさん"],
    ["3", "ちなつさん"],
    ["4", "ゆかさん"],
    ["5", "りこさん"]
];

work_time_list = [];
work_time_list = [
    [1, "1", "2020-10-06", "09:00:00", "18:00:00"],
    [2, "2", "2020-10-07", "09:00:00", "18:00:00"],
    [3, "3", "2020-10-08", "09:00:00", "18:00:00"],
    [4, "4", "2020-10-09", "09:00:00", "18:00:00"],
    [5, "5", "2020-10-10", "09:00:00", "18:00:00"],
    [1, "1", "2020-10-08", "09:00:00", "18:00:00"],
    [1, "1", "2020-10-09", "09:00:00", "18:00:00"]
];

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

    makeCalendar(yyyy=new Date().getFullYear(),mm=(
        new Date().getMonth() + 1)) {

        const yyyymm01 = new Date(yyyy+"-"+mm+"-01");
        let next_month_yyyymm01;
        if (mm == "12") {
            next_month_yyyymm01 = new Date((Number(yyyy)+1)+"-"+"01"+"-01");
        }else{
            next_month_yyyymm01 = new Date(yyyy+"-"+(Number(mm)+1)+"-01");
            console.log(yyyy,"+",mm+1,"+","-01=",(yyyy+"-"+(mm+1)+"-01"));
            console.log(new Date(yyyy+"-"+(mm+1)+"-01"));
        }
        let prev_month_yyyymm01;
        if (mm == "1") {
            prev_month_yyyymm01 = new Date((Number(yyyy)-1)+"-"+"12"+"-01");
        }else{
            prev_month_yyyymm01 = new Date(yyyy+"-"+(Number(mm)-1)+"-01");
            console.log(yyyy,"+",mm+1,"+","-01=",(yyyy+"-"+(mm-1)+"-01"));
            console.log(new Date(yyyy+"-"+(mm+1)+"-01"));
        }

        const yyyymmend = new Date(yyyy,mm,0);
        const first_weekday = yyyymm01.getDay();
        console.log("makeCalendar start");
        console.log("yyyy:",yyyy,"mm:",mm);
        console.log("next_month_yyyymm01",next_month_yyyymm01);
        const heading_yyyymm = document.querySelectorAll('[data-heading-yyyymm]')[0];
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
                        console.log("first->",i+1);
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
            console.log("!!!!!" + yyyy + "-" + ("0" + mm).slice(-2) + "-" + ("0" + j).slice(-2));            
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
            console.log(yyyymm01,new Date(yyyymm01));
        }
        //来月分
        for (let i = yyyymmend.getDate()+first,j = 1; i < 43; i++, j++) {

            console.log("yyyymmend.getDate()+1",yyyymmend.getDate()+1);
            console.log('[data-calendar-position-'+i+']');
            console.log('[data-calendar-position-day-'+i+']');
            const cell_td = document.querySelectorAll('[data-calendar-position-'+i+']')[0];
            cell_td.dataset.youbi = "";
            cell_td.classList.remove("schedule-exist","sun","sat");
            // const cell_td_p = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
            // cell_td_p.innerText = (yyyymm01)+"!!";
            const cell_day = document.querySelectorAll('[data-calendar-position-day-'+i+']')[0];
            const cell_work = document.querySelectorAll('[data-calendar-position-inner-'+i+']')[0];
            cell_day.innerText = "";
            cell_work.innerHTML = "";
            console.log(yyyymm01,new Date(yyyymm01));
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
        // domlist_sun.forEach(dom => {
        //     dom.classList.add("sun");
        // });
        // domlist_sat.forEach(dom => {
        //     dom.classList.add("sat");
        // });
    }

    makeUserWorktimeCalendar(user){
        // user.id
        // user.name
        // user.work_time_list = [id,userid,yyyymmdd,start_time,end_time]
        console.log("★makeUserWorktimeCalendar");
        user.work_time_list.forEach(work_time_list => {
            const write_dom = document.querySelectorAll('[data-innerdate="'+work_time_list[2]+'"] ')[0];
            write_dom.innerHTML = "";
            const td = write_dom.parentNode;
            td.classList.add("schedule-exist");
            const schedule_btn = document.createElement('div');
            schedule_btn.dataset.user_id = user.id;
            schedule_btn.dataset.user_name = user.name;
            schedule_btn.dataset.date = work_time_list[2];
            schedule_btn.dataset.start_time = work_time_list[3];
            schedule_btn.dataset.end_time = work_time_list[4];
            schedule_btn.classList.add("schedule-btn");
            write_dom.appendChild(schedule_btn);
        });
    }
    clickSchedule(innerdiv){
        const message_header = document.querySelectorAll('[data-message-header]')[0];
        console.log(new Date(innerdiv.dataset.innerdate));
        
        const weekday = new Date(innerdiv.dataset.innerdate).getDay();
        message_header.innerHTML= innerdiv.dataset.innerdate + "(" + calendar.calendar_config.youbi_name[weekday] + ")の予定";
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
        this.work_time_list = work_time_list;
        this.id = userid;
        this.name = user_list.filter(user => user[0] === userid)[0][1];

        this.work_time_list = alluser_work_time_list.filter(list => list[1] === userid);
        console.log(this.name,this.work_time_list);     
    }
   reload_work_time_list(alluser_work_time_list){
        this.work_time_list = alluser_work_time_list.filter(list => list[1] === userid);
   }
}


users = [];
user_list.forEach(array => {
    users.push(new User(array[0],user_list, work_time_list));
});
console.log(users);
calendar = new Calendar();
console.log("★");
calendar.makeUserWorktimeCalendar(users[0]);


const calendarClick = document.querySelectorAll('.calendar-td');
for(var i = 0; i < calendarClick.length; i++){
    calendarClick[i].addEventListener('click',function(){
        if (this.classList.contains("schedule-exist")) {
            console.log("exist");
            console.log(this.children[1].firstElementChild);
            calendar.clickSchedule(this.children[1])
        }else{
            console.log("none");
            console.log(this.children[1]);
            calendar.clickSchedule(this.children[1])
        }
    });
}
