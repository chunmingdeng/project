/**
 * @author:chunmingdeng
 * @Date:2018/3/23
 */

var tools = {};
/**
 * extends
 * use:子类名称.superClass.constructor.apply(this)
 */

tools.extends = function (subClass,superClass) {//继承实现
  var f = function () {};
  f.prototype = superClass.prototype;
  subClass.prototype = new f();
  subClass.superClass = superClass.prototype;
}
tools.inCopy = function (obj1,obj2) {//boject 的深层复制
  var obj1 = obj1 || {};
  for (var k in obj2) {
    if(obj2.hasOwnProperty(k)){
      if(typeof obj2[k] == 'object') {
        obj1[k] = Array.isArray(obj2[k])?[]:{};
        tools.inCopy(obj1[k],obj2[k]);
      }else{
        obj1[k] = obj2[k];
      }
    }
  }
}
tools.distinct = function (arr) {//数组去重
  var dupArr = [];
  if(arr instanceof Array){
    arr.forEach(function (val,index) {
      dupArr.indexOf(val)<0&&dupArr.push(val);
    })
    return dupArr;
  }else{
    throw new Error('参数请传入数组！');
  }
}



/**
 * prototype方法扩展
 * */
Array.prototype.distinct = function(){//数组去重
  var arr = this, result = [], i, j, len = arr.length;
  for(i = 0; i < len; i++){
    for(j = i + 1; j < len; j++){
      if(arr[i] === arr[j]){
        j = ++i;
      }
    }
    console.log(arr[i]);
    result.push(arr[i]);
  }
  return result;
}
String.prototype.trim = function () {
  return this.replace(/\s*/g,'');
}
String.prototype.triml = function () {
  return this.replace(/^\s*/g,'');
}
String.prototype.trimr = function () {
  return this.replace(/\s*$/g,'');
}