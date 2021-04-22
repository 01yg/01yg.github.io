/* 파일 선택과 동시에 저장 */
$(document).on('change','input[type=file]',function(e) {
    selectfile = $(this)[0].files[0];
    upfile(selectfile); /* fire.dml */
    $(this).val('');
});