/* 텍스트에 이미지 포함 */
function imgRendering(url) {
    $('article .write .body textarea').val($('article .write .body textarea').val() + `\n<img src=${url}>\n`);
    $('article .up .body textarea').val($('article .up .body textarea').val() + `\n<img src=${url}>\n`);
}

/* 리스트 렌더링 */
function listRendering(id, board, title, date) {
    $('article').scrollTop(0);

    var item = $('<div class="item" id="'+id+'"></div>');
    item.append($(`<div class="from">${board}</div>`));
    item.append($(`<div class="title">${title}</div>`));
    item.append($(`<div class="date">${date}</div>`));
    $('article .list').append(item);
}

/* 상세 회면 렌더링 */
function viewRendering(id, title, board, date, content) {
    $('article').scrollTop(0);

    $('article .view .title h4').html(title);
    $('article .view .board .name').html('게시판' + board);
    $('article .view .board .date').html(date);
    $('article .view .body pre').html(content);
    moveview();
}

/* 수정 회면 렌더링 */
function upRendering(id, title, board, date, content) {
    $('article').scrollTop(0);

    $('article .up .compose select').val(board);
    $('article .up .compose input[name=title]').val(title);
    $('article .up .board .name').html('게시판' + board);
    $('article .up .body textarea').val(content);
    moveup();
}

/* 쓰기 회면 렌더링 */
function writeRendering(title, board, content) {
    $('article').scrollTop(0);

    $('article .write .compose select').val(board);
    $('article .write .compose input[name=title]').val(title);
    $('article .write .body textarea').val(content);
}