/* 저장 버튼 이벤트 */
$(document).on('click','article .write .head button',function(event) {
    event.preventDefault();
    /* firebase 입력 */
    ins();
});