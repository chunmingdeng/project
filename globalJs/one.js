/**
 * @author:chunmingdeng
 * @Date:2018/3/26
 */
function observe(obj) {
  if(!obj || typeof obj !== 'object'){
    return;
  }
  Object.keys(obj).forEach(function (key,index) {
    definedReactive(obj,key,obj[key]);
  })
}
function definedReactive(obj,attr,val) {
  observe(val);//是对象的话进行深层遍历
  Object.defineProperty(obj,attr,{
    enumerable: true,
    configurable: true,
    set:function (newVal) {
      console.log('监听到对属性：--->' + attr + '的赋值操作！');
      val = newVal;
    },
    get:function () {
      console.log('监听到对属性：--->' + attr + '的取值操作！');
      return val;
    }
  })

}

// function defineReactive(data, key, val) {
//   observe(val); // 递归遍历所有子属性
//   Object.defineProperty(data, key, {
//     enumerable: true,
//     configurable: true,
//     get: function() {
//       return val;
//     },
//     set: function(newVal) {
//       val = newVal;
//       console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
//     }
//   });
// }