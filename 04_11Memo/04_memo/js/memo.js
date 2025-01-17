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
                Swal.fire({
                    title: "Memo app"
                    , html: "Key,Memoはいずれも必須です。"
                    , type: "error"
                    , allowOutsideClick: false
                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存しますか?";
                let clickSound = new Audio("./sound/S.mp3");
                clickSound.play();
                Swal.fire({
                    title: "Memo app"
                    , html: w_msg
                    , type: "question"
                    , background: "url(./img/1.jpg)"
                    , showCancelButton: true
                    , allowOutsideClick: false
                }).then(function (result) {
                    if (result.value == true) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                        let clickSound = new Audio("./sound/S1.mp3");
                        clickSound.play();
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , background: "url(./img/4.jpg)"
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    } else {
                        let clickSound = new Audio("./sound/C.mp3");
                        clickSound.play();
                    }

                });
            }
        }, false
    );
};
//from Local Storage delete selected line
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;//選択されていCheckbox number change
            w_cnt = selectCheckBox("del");//テブルからデータ選択Version Up
            if (w_cnt >= 1) {
                let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除しますか?";
                let clickSound = new Audio("./sound/D1.mp3");
                clickSound.play();
                Swal.fire({
                    title: "Memo app"
                    , html: w_msg
                    , type: "question"
                    , background: "url(./img/3.jpg)"
                    , showCancelButton: true
                    , allowOutsideClick: false
                }).then(function (result) {
                    if (result.value === true) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage();//from Local storge  and show table
                        let w_msg = "LocalStorageから" + w_cnt + "件を削除しました。";
                        let clickSound = new Audio("./sound/D.mp3");
                        clickSound.play();
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , background: "url(./img/5.jpg)" 
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                    else {
                        let clickSound = new Audio("./sound/C.mp3");
                        clickSound.play();
                    }
                });
            }
        }, false
    );
    const table1 = document.getElementById("table1");
    table1.addEventListener("click", (e) => {
        if (e.target.classList.contains("trash") === true) {
            let index = e.target.parentNode.parentNode.rowIndex
            const key = table1.rows[index].cells[1].firstChild.data;
            const value = table1.rows[index].cells[2].firstChild.data;
            let w_delete = `LocalStorageから\n「${key} ${value}」\nを削除しますか?`;
            Swal.fire({
                title: "Memo app"
                , html: w_delete
                , type: "question"
                , background: "url(./img/4.jpg)"
                , showCancelButton: true
            }).then(result => {
                if (result.value === true) {
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = `LocalStorageから${key} ${value}を削除しました。`;
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , background: "url(./img/1.jpg)"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
                else {
                    let clickSound = new Audio("./sound/C.mp3");
                    clickSound.play();
                }
            })
        }
    });
};

//Local Storage all Delete

function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_msg = "LocalStorageのデータをすべて削除します。\nよろしいですか？";
            let clickSound = new Audio("./sound/D2.mp3");
            clickSound.play();
            Swal.fire({
                title: "Memo app"
                , html: w_msg
                , type: "question"
                , background: "url(./img/2.jpg)"
                , showCancelButton: true
                , allowOutsideClick: false
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.clear();
                    viewStorage();//from Local storge  and show table
                    let w_msg = "LocalStorageのデータをすべて削除しました。";
                    let clickSound = new Audio("./sound/D.mp3");
                    clickSound.play();
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , background: "url(./img/3.jpg)"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
                else {
                    let clickSound = new Audio("./sound/C.mp3");
                    clickSound.play();
                }
            });
        }, false
    );
};

//データを選択

function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault;
            selectCheckBox("select");
        }, false
    );
};

//tableからデータを選択

function selectCheckBox(mode) {
    //let w_sel = "0";//選択されていれば１にする
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
    //選択ボタンを押す特チャックロジック
    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        }
        else {
            let clickSound = new Audio("./sound/warning.mp3");
            clickSound.play();
            Swal.fire({
                title: "Memo app"
                , html: "一つ選択してください。"
                , type: "error"
                , background: "url(./img/6.jpg)"
                , allowOutsideClick: false
            });
        }
    }
    //削除ボタンを押す特チャックロジック
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        }
        else {

            Swal.fire({
                title: "Memo app"
                , html: "一つ以上選択してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
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
        let td4 = document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name = 'chkbox1' type ='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src = 'img/trash.png' class='trash'>";
    }
    //JQuery plugin tablesorteっを使ってテーブルのソート
    //sorlist引数最初からソートして遅れを指定、引数2昇順1降順
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });
    $("#table1").trigger("update");
};