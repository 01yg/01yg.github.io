includeHTML();

var board = 'javascript';
var id;

/* form 에서 json 형으로 데이터 가져오기 */
jQuery.fn.serializeObject = function() {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }//if ( arr ) {
        }
    } catch (e) {
        alert(e.message);
    } finally {
    }
    return obj;
};

/* 시작시 게시물 리스트 가져오기 */
sellist();

/* 상세화면 클리어 */
function viewClear() {
    viewRendering('','','','');
}

/* 현재시간 알아내기 */
function dateToString() {
    var pDate = new Date();
    var yyyy = pDate.getFullYear();
    var yy = String(yyyy).slice(-2);
    var mm = pDate.getMonth() < 9 ? "0" + (pDate.getMonth() + 1) : (pDate.getMonth() + 1); // getMonth() is zero-based
    var dd  = pDate.getDate() < 10 ? "0" + pDate.getDate() : pDate.getDate();
    var hh = pDate.getHours() < 10 ? "0" + pDate.getHours() : pDate.getHours();
    var min = pDate.getMinutes() < 10 ? "0" + pDate.getMinutes() : pDate.getMinutes();
    return "".concat(yy).concat(".").concat(mm).concat(".").concat(dd).concat(" ").concat(hh).concat(":").concat(min);
};