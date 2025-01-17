"use strict";

//実行するタイミング

window.addEventListener("DOMContentLoaded",
    function () {
        /*localstorageが使えるか確認*/
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLoacl Storage機能が実装されていません");
            return;
        } else {
            viewStorage();//LoacalStorageからのデータを取得する
            saveLocalStorage();//LoacalStorageの保存
            delLocalStorage();//Local storage delete
            allClearLocalStorage();//Local storage all delete
            selectTable();//データを選択
        }
    }, false
);

//LoacalStorageの保存

function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            //値の入力Check

            if (key == "" || value == "") {
                window.alert("Key,Memoはいずれも必須です。");
                return;
            } else {
                let w_confirm = window.confirm("LocalStorageに\n「" + key + " " + value + "」\nを保存しますか?");
                if (w_confirm === true) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorage" + key + " " + value + "をほぞんしました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
};
//Local Storage delete
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_sel = "0";//選択されていれば1が返却される
            w_sel = selectCheckBox();//テブルからデータ選択Version Up
            if (w_sel === "1") {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorageから\n「" + key + " " + value + "」\nを削除しますか?");
                if (w_confirm === true) {
                    localStorage.removeItem(key);
                    viewStorage();//from Local storge  and show table
                    let w_msg = "LocalStorageから" + key + " " + value + "を削除しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
};
//Local Storage all Delete
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = window.confirm("LocalStorageのデータをすべて削除します。\nよろしいですか？");
            if (w_confirm === true) {
                localStorage.clear();
                viewStorage();//from Local storge  and show table
                let w_msg = "LocalStorageのデータをすべて削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};
//データを選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault;
            selectCheckBox();
        }, false
    );
};

//tableからデータを選択
function selectCheckBox() {
    let w_sel = "0";//選択されていれば１にする
    let w_cnt = 0;//Selet check Box
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textkey = "";//work
    let w_textMemo = "";//work

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textkey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
                //return w_sel = "1";
            }
            w_cnt++//Seclet checkbox count
        }
    }
    document.getElementById("textKey").value = w_textkey;
    document.getElementById("textMemo").value = w_textMemo;
    if (w_cnt === 1) {
        return w_sel = "1";
    } else {
        window.alert("一つ選択してください。");
    }
};
//localStorageからのデータを取得とtabelの表示
function viewStorage() {
    const list = document.getElementById("list");
    //htmlのtabel初期化する
    while (list.rows[0]) list.deleteRow(0);

    //localStorageすべての情報を取得
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        //localStorageのキーと値を表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name = 'chkbox1' type ='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    //JQuery plugin tablesorteっを使ってテーブルのソート
    //sorlist引数最初からソートして遅れを指定、引数2昇順1降順
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });
    $("#table1").trigger("update");
};