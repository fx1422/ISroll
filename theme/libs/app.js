var docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

function recalc() {
    //设置根字体大小
    var myfontSize = 20 * (docEl.clientWidth / 375);
    if (myfontSize > 30) {
        docEl.style.fontSize = "30px";
    } else {
        docEl.style.fontSize = 20 * (docEl.clientWidth / 375) + 'px';
    }

};
//绑定浏览器缩放与加载时间
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);

//微信浏览器弹性滚动事件
var con = document.querySelector('body').firstElementChild;
if (isWeixin) {
    overScroll(con);
}

document.body.addEventListener('touchmove', function (evt) {
    if (!evt._isScroller) {
        evt.preventDefault();
    }
});

function overScroll(el) {
    el.addEventListener('touchstart', function () {
        var top = el.scrollTop
            , totalScroll = el.scrollHeight
            , currentScroll = top + el.offsetHeight;
        if (top === 0) {
            el.scrollTop = 1;
        } else if (currentScroll === totalScroll) {
            el.scrollTop = top - 1;
        }
    });
    el.addEventListener('touchmove', function (evt) {
        if (el.offsetHeight < el.scrollHeight)
            evt._isScroller = true;
    });
}

function isWeixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}