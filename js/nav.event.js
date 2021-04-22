/* 나비 메뉴 hover 이벤트 */
$(document).on('mouseenter','nav .navs .nav',function() {
    $(this).children().last().addClass('on');
});
$(document).on('mouseleave','nav .navs .nav',function() {
    $(this).children().last().removeClass('on');
});

/* 나비 메뉴 클릭 이벤트 */
$(document).on('click','nav .navs .nav',function() {
    $('nav .navs .nav .link').removeClass('active');
    $(this).children().last().addClass('active');
    board = $(this).children().last().html().toLowerCase();

    sellist();

    // 화면 이동 하려고 하는데 그 전에
    //list(board);
});

/* 쓰기 버튼 클릭 이벤트 */
$(document).on('click', 'nav .button .btn_write', function() {
    writeRendering('', 'javascript', '')
    movewrite();
});