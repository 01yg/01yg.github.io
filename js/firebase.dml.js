/* 게시물 인서트 */
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

/* 게시물 업데이트 */
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

/* 게시물 리스트 가져오기 */
function sellist(searchword = '') {
    $("loading").addClass('on');
    db.collection(board).orderBy('date', 'desc').get().then((querySnapshot) => {
        $('article .list .lists').html('');

        /* json 으로 변경 */
        var docs = querySnapshot.docs.map(function (doc) {
            var temp = doc.data()
            temp.id = doc.id;
            return temp;
        });

        /* 검색 */
        docs = docs.filter(function(doc) {
            var bool = doc.title.indexOf(searchword) != -1 || searchword == '';

            console.log(bool);

            return bool;
        });

        console.log(docs);


        docs.forEach((doc) => {
            listRendering(doc.id, board, doc.title, doc.date);
    });
    movelist();
    $("loading").removeClass('on');
});
}

/* 게시물 가져오기 */
function sel(board,id, fn) {
    $("loading").addClass('on');
    db.collection(board).doc(id).get().then((doc) => {
        fn(doc);
    $("loading").removeClass('on');
});
}

/* 게시물 삭제 */
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

/* 파일 업로드 */
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

/* 이미지 가져오기 */
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