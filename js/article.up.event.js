/* 수정의 저장 버튼 클릭 이벤트 */
$(document).on('click','article .up .head button.up',function(event) {
    event.preventDefault();
    up(); /* fire.dml */
});

/* 리스트 취소 이벤트 */
$(document).on('click','article .up .head button.cancel',function(event) {
    event.preventDefault();
    moveview();
});