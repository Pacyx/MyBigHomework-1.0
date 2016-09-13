var eventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }

    // removeHandler:function(element,type,handler){
    //  if(element.removeEventListener){
    //      element.removeEventListener(type,handler,false);
    //  }else if (element.detachEvent) {
    //      element.detachEvent('on'+type,handler);
    //  }else{
    //      element['on'+type]=null;
    //  }

    // }
}


// 仿jQuery id 选择器
var $ = function(id) {
    return document.getElementById(id);
}

//解决事件处理函数只能绑定一条指令
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
// 表单序列化代码
// function serialize(form){
//     var parts=[],
//     field=null,
//     i,
//     len,
//     j,
//     option,
//     optValue;

//     for (i=0, len=form.elements.length; i<len; i++){
//         field=form.elements[i];

//         switch(field,type){
//             case "select-one":
//             case "select-multiple":

//             if (field.name.length){
//                 for(j=0, optLen=field.options.length; j<opLen; j++){
//                     option=field.options[j];
//                     if(option.selected){
//                         optValue="";
//                         if(option.hasAttribute){
//                             optValue=(option.hasAttribute("value")?
//                             option.value:option.text);
//                         }else{
//                             optValue=(option.attributes["value"].specified?
//                                 option.value:option.text);
//                         }
//                         parts.push(encodeURIComponent(field.name)+"="+
//                            encodeURIComponent(field.value));
//                     }
//                 }
//             }
//             break;

//         case undefined:
//         case "file":
//         case "reset":
//         case "button":
//             break;
//         case "radio":
//         case"checkbox":
//             if(!field.checked){
//                 break;
//             }

//         default:
//             if(field.name.length){
//                 parts.push(encodeURIComponent(field.name)+"="+
//                            encodeURIComponent(field.value));
//             }
//         }  
//     }
//      return parts.join("&");
// }

// 设置参数

function serialize(data) { // 设置参数
    if (!data) return '';
    var pairs = [];
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue;
        if (typeof data[name] === 'function') continue;
        var value = data[name].toString();
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
    }
    return pairs.join('&');
}
//GET请求
function get(url, options, callback) { //get方法
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                callback(xhr.responseText);
            } else {
                alert("request failed : " + xhr.status);
            }
        }
    };
    xhr.open("get", url + "?" + serialize(options), true);
    xhr.send(null);
}
//不再显示提示
//设置cookie
function setCookie(key, value, t) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + t);
    document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}

//获取cookie
function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0] === key) {
            return decodeURI(arr2[1]);
        }
    }
}

//  删除cookie
function removeCookie(key) {
    setCookie(key, '', -1);
}
//不再提示
function closeTs() {
    var close = $("ts");
    if (getCookie('Off')) {
        close.style.display = "none";
    } else {
        $("tsr").onclick = function() {
            close.style.display = "none";
            setCookie('Off', true, 36500);
        }
    }
}

//将字符数字转化成数值类型
function getNum(str) {
    if (!str) {
        return 0;
    } else {
        return parseInt(str);
    }
}
//图片轮播
function step() {
    var imgs = $("imgs");
    var left = imgs.style.left = "0px";
    //进度点
    var indexP = 0;
    var points = document.getElementsByClassName("poin");
    points[indexP].style.backgroundColor = "#333";
    points[indexP + 1].style.backgroundColor = "#fff";
    points[indexP + 2].style.backgroundColor = "#fff";

    function roll() {
        var leftvl = getNum(imgs.style.left);
        if (leftvl != -3232) {
            imgs.style.left = leftvl - 1616 + "px";
            indexP = indexP + 1;
            points[indexP].style.backgroundColor = "#333";
            points[indexP - 1].style.backgroundColor = "#fff";
        } else {
            clearInterval(intervalId);
            imgs.style.left = "0px";
            // setInterval(roll, 5000);  //浏览器会崩溃
            points[indexP].style.backgroundColor = "#fff";
            if (step) //回调函数
                step();
        }

    }

    var intervalId = setInterval(roll, 2000);

}
//进度条点击
function newStep() {
    clearInterval(intervalId);
    var imgs = $("imgs");
    var left = imgs.style.left;
    var indexP = 0;
    var points = document.getElementsByClassName("poin");


    function roll() {
        var leftvl = getNum(imgs.style.left);
        if (leftvl != -3232) {
            imgs.style.left = leftvl - 1616 + "px";
            indexP = indexP + 1;
            points[indexP].style.backgroundColor = "#333";
            points[indexP - 1].style.backgroundColor = "#fff";

        } else {
            clearInterval(intervalId_0);
            imgs.style.left = "0px";

            points[indexP].style.backgroundColor = "#fff";
            if (step) //回调函数
                step();
        }

    }
    var intervalId_0 = setInterval(roll, 2000);
}


function clickPoint() {
    var indexP = 0;
    var points = document.getElementsByClassName("poin");
    var imgs = $("imgs");

    function clickPoint_0() {
        points[0].style.backgroundColor = "#333";
        points[1].style.backgroundColor = "#fff";
        points[2].style.backgroundColor = "#fff";
        imgs.style.left = "0px";
        newStep();
    }

    function clickPoint_1() {

        points[0].style.backgroundColor = "#fff";
        points[1].style.backgroundColor = "#333";
        points[2].style.backgroundColor = "#fff";
        imgs.style.left = "-1616px";


        // // clearInterval(intervalId);
        // if(clickPoint_1){
        //  // var intervalId = setInterval(roll, 2000);
        //  step();
        // }   //回调函数
        newStep();
    }

    function clickPoint_2() {

        points[0].style.backgroundColor = "#fff";
        points[1].style.backgroundColor = "#fff";
        points[2].style.backgroundColor = "#333";
        imgs.style.left = "-3232px";

        // clearInterval(intervalId);
        // if(clickPoint_2) {
        //  // var intervalId = setInterval(roll, 2000);
        //  step();
        // }   //回调函数
        newStep();
    }
    var point_0 = document.getElementById("change-0");
    var point_1 = document.getElementById("change-1");
    var point_2 = document.getElementById("change-2");

    eventUtil.addHandler(point_0, 'click', clickPoint_0);
    eventUtil.addHandler(point_1, 'click', clickPoint_1);
    eventUtil.addHandler(point_2, 'click', clickPoint_2);
}


// 视频窗口
function playvideo() {
    var oWindow = $("videobg_1");
    var cWindow = $("cWindow");

    function showvideo() {
        $("showvideo").style.display = "block";
    }

    function closevideo() {
        $("showvideo").style.display = "none";
        document.getElementsByTagName('video')[0].pause();

    }
    eventUtil.addHandler(oWindow, 'click', showvideo);
    eventUtil.addHandler(cWindow, 'click', closevideo);
}

//登陆窗口
function signIn() {
    var oInput = document.getElementsByTagName('input');
    var oLabel = document.getElementsByTagName('label');
    var oSignwindow = $('showSignin');
    var oClose = $('closesign');
    var oOpen = $('gz');

    function focus(i) {
        oInput[i + 1].onfocus = function() {
            oLabel[i].style.display = "none";
        }
        oInput[i + 1].onblur = function() {
            if (this.value === '') {
                oLabel[i].style.display = "block";
            }
        }
    }
    focus(0);
    focus(1);

    function openSign() {
       // if (getCookie('loginSuc')) {
       //         oOpen.value="已关注"；
               // oSignwindow.style.display = "none";
           // }else{
               oSignwindow.style.display = "block";
           // }
    }

    function closeSign() {
        oSignwindow.style.display = "none";
    }

    // function (argument) {
    //     // body...
    // }
    eventUtil.addHandler(oClose, 'click', closeSign);
    eventUtil.addHandler(oOpen, 'click', openSign);
}

function tab() {
    var tabbtn_0 = document.getElementById("tab_0");
    var tabbtn_1 = document.getElementById("tab_1");
    var tabview_0 = document.getElementById("tabview_0");
    var tabview_1 = document.getElementById("tabview_1");
    // var tabview_0 = document.getElementsByClassName("tabview_0");
    // var tabview_1 = document.getElementsByClassName("tabview_1");
    var tabbtn = document.getElementById("tabbtn");
    var tabview = document.getElementById("tabview");

    function tabchange_0() {
        tabbtn_0.style.color = "#fff";
        tabbtn_0.style.backgroundColor = "#39a030";
        tabbtn_1.style.color = "#000";
        tabbtn_1.style.backgroundColor = "#fff";
        tabview_0.style.display = "block";
        tabview_1.style.display = "none";
    }

    function tabchange_1() {
        tabbtn_1.style.color = "#fff";
        tabbtn_1.style.backgroundColor = "#39a030";
        tabbtn_0.style.color = "#000";
        tabbtn_0.style.backgroundColor = "#fff";
        tabview_1.style.display = "block";
        tabview_0.style.display = "none";
    }

    
 //获取数据
    function setData(num, element) {

            get('http://study.163.com/webDev/couresByCategory.htm', {
                pageNo: 1,
                psize: 20,
                type: num
            }, function(data) { //设置课程
                var data = JSON.parse(data)
                for (var i = 0; i < data.list.length; i++) {
                    var oTeam = document.createElement('div');
                    oTeam.className = 'team'
                    element.appendChild(oTeam);
                    var oImg = document.createElement('img');
                    var oP = document.createElement('p');
                    var oDiv = document.createElement('div');
                    var oSpan = document.createElement('span');
                    var oStrong = document.createElement('strong');
                    var oA = document.createElement('a');
                    oImg.src = data.list[i].middlePhotoUrl;
                    oP.className = 'coursename f-toe';
                    oP.innerHTML = data.list[i].name;
                    oDiv.className = 'provider';
                    oDiv.innerHTML = data.list[i].provider;
                    oSpan.innerHTML = data.list[i].learnerCount;
                    if (!data.list[i].categoryName) {
                        data.list[i].categoryName = '无';
                    }
                    // 不清楚 createElement 和 innerHTML 哪个性能较好，所以在生成弹窗时使用了innerHTML
                    oA.innerHTML = '<img src="' + data.list[i].middlePhotoUrl + '" /><h3>' + data.list[i].name + '</h3><span>' + data.list[i].learnerCount + '人在学</span><p class="categoryname clearf">发布者：' + data.list[i].provider + '</br>分类：' + data.list[i].categoryName + '</p><p class="description">' + data.list[i].description + '</p>';
                    if (data.list[i].price == 0) {
                        oStrong.innerHTML = '免费';
                    } else {
                        oStrong.innerHTML = '￥' + data.list[i].price;
                    }
                    oTeam.appendChild(oImg);
                    oTeam.appendChild(oP);
                    oTeam.appendChild(oDiv);
                    oTeam.appendChild(oSpan);
                    oTeam.appendChild(oStrong);
                    oTeam.appendChild(oA);

                }
            });
        }
        setData(10, tabview_0);
        setData(20, tabview_1);
  
    eventUtil.addHandler(tabbtn_0, 'click', tabchange_0);
    eventUtil.addHandler(tabbtn_1, 'click', tabchange_1);
}

//热门列表
function getList() {
    var oList=document.getElementsByClassName('list');
    // var oList=document.getElementsByClassName('tabview_0');
    get('http://study.163.com/webDev/hotcouresByCategory.htm',{},function (data) {
        var arr =JSON.parse(data);
        for(var i=0;i<20;i++){
            var oA=document.createElement('a');
            oA.innerHTML='<div><img src="' + arr[i].smallPhotoUrl + '" /></div><p>' + arr[i].name + '</p><span>' + arr[i].learnerCount + '</span>';
            oList[0].appendChild(oA);
        }
    });
}

//加载页面事件
// window.onload = function() {}
addLoadEvent(step);
addLoadEvent(closeTs);
addLoadEvent(getCookie);
addLoadEvent(setCookie);
addLoadEvent(playvideo);
addLoadEvent(signIn);
addLoadEvent(tab);
addLoadEvent(getList);
// addLoadEvent(getData);
// addLoadEvent(clickPoint);  
// addLoadEvent(intervalId);