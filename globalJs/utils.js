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
 * date
 * methods:fmat*/
utils.date = {
  fmat :function (date,datefmat) {
    if(!(date instanceof Date)){
      throw new Error('请输入正确的时间格式！');
      return;
    }
    var fmt = datefmat?datefmat:'yyyy-MM-dd hh:mm:ss';
    var paddNum = function(num){
      return num.toString().replace(/^(\d)$/g,'0$1');
    }
    var config = {
      yyyy:date.getFullYear(),
      yy:date.getFullYear().toString().sub(2),
      M:date.getMonth()+1,
      MM:paddNum(date.getMonth()+1),
      d:date.getDate(),
      dd:paddNum(date.getDate()),
      hh:date.getHours(),
      mm:date.getMinutes(),
      ss:date.getSeconds()
    }
    return fmt.replace(/([a-z])(\1)*/ig,function (val) {
      return config[val]
    })
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