work_history = [["09:00","18:00"],["09:00","14:00"],["14:00","18:00"]];

class Panel {
    
    //履歴から予定登録
    //新規登録
    single_task_registration(data){
        console.log("!!!!",users[active_user_number].id,data.dataset.innerdate);
        let registration_select = "<div class='border-top pb-1'>履歴から予定を登録<br>";
        let sq = "'";
        work_history.forEach(element => {
            registration_select+='<button class="btn btn-light mx-1" onClick="db.db_work_time_insert('+users[active_user_number].id+','+sq+data.dataset.innerdate+sq+','+sq+element[0]+sq+','+sq+element[1]+sq+')">'+element[0]+"-"+element[1]+'</button>';
        });
        registration_select += '</div><div class="pt-1 border-top"><button class="mx-1 btn btn-primary">手入力で予定を登録※未実装</button></div>';
        //<button class="secondary">新規登録</button>
        //<button class="primary">新規登録</button>
        //<button></button>
        return registration_select;
    }
    single_task_changed(data){
        //data.dataset.user_id
        //data.dataset.user_name
        //data.dataset.work_time_list_id
        //data.dataset.date
        //data.dataset.start_time
        //data.dataset.end_time
        let registration_select = "<div class='border-top pb-1'>履歴から予定を変更<br>";
        let sq = "'";
        work_history.forEach(element => {
            registration_select+='<button class="btn btn-light mx-1" onClick="db.db_work_time_update('+data.dataset.work_time_list_id+','+data.dataset.user_id+','+sq+data.dataset.date+sq+','+sq+element[0]+sq+','+sq+element[1]+sq+')">'+element[0]+"-"+element[1]+'</button>';
        });
        registration_select += '</div><div class="pt-1 border-top"><button class="mx-1 btn btn-primary">手入力で予定を変更※未実装</button><button class="mx-1 btn btn-danger" onClick="db.db_work_time_delete('+data.dataset.work_time_list_id+","+data.dataset.user_id+')">予定を削除</button></div>';
        //<button class="secondary">新規登録</button>
        //<button class="primary">新規登録</button>
        //<button></button>
        return registration_select;
    }

}

const panel = new Panel;