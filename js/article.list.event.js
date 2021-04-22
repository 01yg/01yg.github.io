/* 리스트의 항목 클릭 이벤트 */
$(document).on('click', 'article .list .item', function() {
    id = $(this).attr('id');
    // 데이터 가져오기
    sel(board, id, function(doc) {
        var data = doc.data();
        viewRendering(doc.id, data.title, board, data.date, data.content);
    });
});