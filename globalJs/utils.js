/**
 * @author:chunmingdeng
 * @Date:2018/3/26
 */

var utils = {};
/**
 * cookie
 * methods: set ,get*/
utils.cookie = {
  setCookie :function (name,val,expirse,path,domain,secure) {
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(val);
    if(expirse instanceof Date) cookieText += ';expirse = '+expirse;
    if(path) cookieText += ';path = '+expirse;
    if(domain) cookieText += ';domain = '+domain;
    if(secure) cookieText += ';secure = '+secure;
    document.cookie = cookieText;
  },
  getCookie :function (name) {
    var cookieName = encodeURIComponent(name)+'=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieEnd = null,cookieVal = null;
    if(cookieStart>-1){
      cookieEnd = document.cookie.indexOf(';',cookieStart);
      if(cookieEnd == -1){
        cookieEnd = document.cookie.length;
      }
      cookieVal = decodeURIComponent(document.cookie.substring(cookieStart+
        cookieName.length,cookieEnd));
    }
  }
}


/**
 * ajax*/
utils.ajax  = {
  createXhrMethods:[
    function () {
      return new XMLHttpRequest();
    },
    function () {
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  ],
  createXHR:function(){
    for(i in this.createXhrMethods){
      try{
        var c = null;
        c = this.createXhrMethods[i];
        return c;
      }catch(e) {
        continue;
      }
    }
  },
  sub:function (url,method,data,callback) {
    var xhr = this.createXHR();
    xhr.onreadystatechange = function () {
      if(xhr.readyState!=400) return;
      if(xhr.status==200){
        callback.success(xhr.responseText);
      }else{
        callback.fail(xhr.status)
      }
    }
    xhr.open(method,url,true);
    if(method=='POST') data = null;
    xhr.send(data);
  }
}

/**
 * deep clone*/
utils.deepClone = function (obj) {
  if(typeof obj != 'object')
    return obj;
  var newObj = obj.constructor == Array ? [] : {};
  for(var k in obj){
    newObj[k] = this.deepClone(obj[k]);
  }
  return newObj;
}

/**
 * math calculate*/
utils.add = function (arg1, arg2) {
  var m = arg1.toString().split('.')[1].length;
  var n = arg2.toString().split('.')[1].length;
  var p = Math.pow(10,Math.max(m, n));
  return (arg1*p+arg2*p)/p
}
utils.sub = function (arg1, arg2) {
  var m = arg1.toString().split('.')[1].length;
  var n = arg2.toString().split('.')[1].length;
  var p = Math.pow(10,Math.max(m, n));
  return (arg1*p-arg2*p)/p
}
utils.mul = function (arg1, arg2) {
  var str1 = arg1.toString(), str2 = arg2.toString();
  var m = str1.split('.')[1].length;
  var n = str2.split('.')[1].length;
  return Number(str1.replace('.',''))*Number(str2.replace('.',''))/Math.pow(10,m+n)
}
utils.div = function (arg1, arg2) {
  var str1 = arg1.toString(), str2 = arg2.toString();
  var m = str1.split('.')[1].length;
  var n = str2.split('.')[1].length;
  return Number(str1.replace('.',''))/Number(str2.replace('.',''))/Math.pow(10,n-m)
}

/**
 * formatDate*/
utils.formatDate = function (date, fmt) {
  var fmt = fmt || 'yyyy/MM/dd hh:mm:ss';
  var date = new Date(date);
  function paddNum(str) {
    str += '';
    return str.replace(/^(\d)$/,'0$1')
  }
  var fmt_obj = {
    yyyy : date.getFullYear(),
    MM : paddNum(date.getMonth() + 1),
    M : date.getMonth() + 1,
    dd : paddNum(date.getDate()),
    d : date.getDate(),
    hh : paddNum(date.getHours()),
    mm : paddNum(date.getMinutes()),
    ss : paddNum(date.getSeconds())
  }
  return fmt.replace(/([a-z])(\1)*/ig,function (m) {
    return fmt_obj[m]
  })
}


// expend js 基础能力的扩展
function exchange(arr,item1,item2) {
  var middleVal = arr[item1];
  arr[item1] = arr[item2];
  arr[item2] = middleVal;
}
Array.prototype.bubbleSort = function () {
  var len = this.length;
  for(var i=0; i<len-1; i++){
    for(var j=0; j<len-1-i; j++){
      if(this[j]>this[j+1]){
        exchange(this,j,j+1);
      }
    }
  }
  return this;
}
Array.prototype.selectSort = function () {
  var len = this.length,minIndex;
  for(var i=0; i<len-1; i++){
    minIndex = i;
    for(var j=i+1; j<len; j++){
      if(this[j]<this[minIndex]){
        minIndex = j;
      }
    }
    exchange(this ,i ,minIndex);
  }
  return this;
}