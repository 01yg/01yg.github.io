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

/* 리스트 버튼 클릭 이벤트 */
$(document).on('click', 'article .view .head button.movelist', function() {
    movelist();
});