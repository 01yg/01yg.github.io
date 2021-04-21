var board = 'javascript';
var id;

/* form 에서 json 형으로 데이터 가져오기 */
jQuery.fn.serializeObject = function() {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }//if ( arr ) {
        }
    } catch (e) {
        alert(e.message);
    } finally {
    }
    return obj;
};

var firebaseConfig = {
    apiKey: "AIzaSyAlBO0eQIsvlo_aC2ILlI-EeFF3e3w7wWg",
    authDomain: "yg-b7bfc.firebaseapp.com",
    databaseURL: "https://yg-b7bfc-default-rtdb.firebaseio.com",
    projectId: "yg-b7bfc",
    storageBucket: "yg-b7bfc.appspot.com",
    messagingSenderId: "900082952918",
    appId: "1:900082952918:web:eb1fa1f55156eb771ab777",
    measurementId: "G-FNJ2L44DZG"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();
const storage = firebase.storage().ref();

sellist();

function ins() {
    var json = $('form#frm').serializeObject();

    $("loading").addClass('on');

    db.collection(json.board).add({
        title: json.title,
        content: json.content,
        date: dateToString()
    }).then((docRef) => {
        $("loading").removeClass('on');
        alert('정상 등록되었습니다 (등록 아이디 : ' + docRef.id + ')');
        sellist();
    }).catch((error) => {
        $("loading").removeClass('on');
        alert('등록에 실패하였습니다 (애러 코드 : ' + error + ')');
        sellist();
    });
}

function up() {
    var json = $('#up_frm').serializeObject();

    $("loading").addClass('on');

    db.collection(json.board).doc(id).set({
        title: json.title,
        content: json.content,
        date: dateToString()
    }).then(() => {
        $("loading").removeClass('on');
        alert('정상 수정되었습니다 (등록 아이디 : ' + id + ')');
        sellist();
    }).catch((error) => {
        $("loading").removeClass('on');
        alert('수정에 실패하였습니다 (애러 코드 : ' + error + ')');
        sellist();
    });
}

function sellist() {
    $("loading").addClass('on');
    db.collection(board).orderBy('date', 'desc').get().then((querySnapshot) => {
        $('article .list').html('');
        querySnapshot.forEach((doc) => {
            listRendering(doc.id, board, doc.data().title, doc.data().date);
        });
        movelist();
        $("loading").removeClass('on');
    });
}

function sel(board,id, fn) {
    $("loading").addClass('on');
    db.collection(board).doc(id).get().then((doc) => {
        fn(doc);
        $("loading").removeClass('on');
    });
}

function del() {
    $("loading").addClass('on');
    db.collection(board).doc(id).delete().then(() => {
        $("loading").removeClass('on');
        alert('정상 삭제되었습니다');
        sellist();
    }).catch((error) => {
        $("loading").removeClass('on');
        alert('삭제에 실패하였습니다 (애러 코드 : ' + error + ')');
        sellist();
    });
}

function upfile(selectfile) {
    if(typeof selectfile != "undefined") {
        $("loading").addClass('on');
        storage.child(`images/${selectfile.name}`)
                .put(selectfile)
                .on('', snapshot => {
                }, error => {
                    $("loading").removeClass('on');
                    console.log(error);
                }, () => {
                    $("loading").removeClass('on');
                    downfile(selectfile);
                });
    }
}

function downfile(selectfile) {
    $("loading").addClass('on');
    storage.child(`images/${selectfile.name}`).getDownloadURL().then(function(url) {
        imgRendering(url);
        $("loading").removeClass('on');
    }).catch(function(error) {
        $("loading").removeClass('on');
        console.log(error);
    });
}

function imgRendering(url) {
    $('article .write .body textarea').val($('article .write .body textarea').val() + `\n<img src=${url}>\n`);
}

/* 리스트 렌더링 */
function listRendering(id, board, title, date) {
    var item = $('<div class="item" id="'+id+'"></div>');
    item.append($(`<div class="from">${board}</div>`));
    item.append($(`<div class="title">${title}</div>`));
    item.append($(`<div class="date">${date}</div>`));
    $('article .list').append(item);
}

/* 상세 회면 렌더링 */
function viewRendering(id, title, board, date, content) {
    $('article .view .title h4').html(title);
    $('article .view .board .name').html('게시판' + board);
    $('article .view .board .date').html(date);
    $('article .view .body pre').html(content);
    moveview();
}

/* 수정 회면 렌더링 */
function upRendering(id, title, board, date, content) {
    $('article .up .compose select').val(board);
    $('article .up .compose input[name=title]').val(title);
    $('article .up .board .name').html('게시판' + board);
    $('article .up .body textarea').val(content);
    moveup();
}

/* 쓰기 회면 렌더링 */
function writeRendering(title, board, content) {
    $('article .write .compose select').val(board);
    $('article .write .compose input[name=title]').val(title);
    $('article .write .body textarea').val(content);
}

/* 상세화면 클리어 */
function viewClear() {
    viewRendering('','','','');
}

/* 저장 버튼 이벤트 */
$('#frm').submit(function(event) {
    event.preventDefault();
    /* firebase 입력 */
    ins();
});

/* 수정의 저장 버튼 클릭 이벤트 */
$('#up_frm').submit(function(event) {
    event.preventDefault();
    up();
});

/* 나비 메뉴 hover 이벤트 */
$('nav .navs .nav').on('mouseenter',function() {
    $(this).children().last().addClass('on');
});
$('nav .navs .nav').on('mouseleave',function() {
    $(this).children().last().removeClass('on');
});

/* 나비 메뉴 클릭 이벤트 */
$('nav .navs .nav').on('click',function() {
    $('nav .navs .nav .link').removeClass('active');
    $(this).children().last().addClass('active');
    board = $(this).children().last().html().toLowerCase();

    sellist();

    // 화면 이동 하려고 하는데 그 전에
    //list(board);
});

/* 파일 선택과 동시에 저장 */
$('input[type=file]').change(function(e) {
    selectfile = $(this)[0].files[0];
    upfile(selectfile);
});

/* 삭제 버튼 클릭 이벤트 */
$(document).on('click', 'article .view .head button.del', function() {
    del();
});

/* 수정 버튼 클릭 이벤트 */
$(document).on('click', 'article .view .head button.up', function() {
    // 데이터 가져오기
    sel(board, id, function(doc) {
        var data = doc.data();
        upRendering(doc.id, data.title, board, data.date, data.content);
    });
});

/* 쓰기 버튼 클릭 이벤트 */
$(document).on('click', 'nav .button .btn_write', function() {
    writeRendering('', 'javascript', '')
    movewrite();
});

/* 리스트의 항목 클릭 이벤트 */
$(document).on('click', 'article .list .item', function() {
    id = $(this).attr('id');
    // 데이터 가져오기
    sel(board, id, function(doc) {
        var data = doc.data();
        viewRendering(doc.id, data.title, board, data.date, data.content);
    });
});

/* 화면 이동 */
function movelist() {
    $("article").removeClass('on');
    $("article.list").addClass('on');
}

/* 화면 이동 */
function movewrite() {
    $("article").removeClass('on');
    $("article.write").addClass('on');
}

/* 화면 이동 */
function moveview() {
    $("article").removeClass('on');
    $("article.view").addClass('on');
}
/* 화면 이동 */
function moveup() {
    $("article").removeClass('on');
    $("article.up").addClass('on');
}


/* 현재시간 알아내기 */
function dateToString() {
    var pDate = new Date();
    var yyyy = pDate.getFullYear();
    var yy = String(yyyy).slice(-2);
    var mm = pDate.getMonth() < 9 ? "0" + (pDate.getMonth() + 1) : (pDate.getMonth() + 1); // getMonth() is zero-based
    var dd  = pDate.getDate() < 10 ? "0" + pDate.getDate() : pDate.getDate();
    var hh = pDate.getHours() < 10 ? "0" + pDate.getHours() : pDate.getHours();
    var min = pDate.getMinutes() < 10 ? "0" + pDate.getMinutes() : pDate.getMinutes();
    return "".concat(yy).concat(".").concat(mm).concat(".").concat(dd).concat(" ").concat(hh).concat(":").concat(min);
};