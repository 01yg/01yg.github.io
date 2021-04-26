/* 저장 버튼 이벤트 */
$(document).on('click','article .write .head button.save',function(event) {
    event.preventDefault();
    /* firebase 입력 */
    ins();
});

/* 취소 이벤트 */
$(document).on('click','article .write .head button.cancel',function(event) {
    event.preventDefault();
    movelist();
});