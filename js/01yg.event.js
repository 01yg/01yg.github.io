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