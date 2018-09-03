/** 新增&&修改本地缓存
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} value 新增&修改的值
 */
export function savaToLocal(id, key, value) {
  let seller = window.localStorage.__seller__; // 专用字段__seller__
  if (!seller) {
    // 刚开始的初始化
    seller = {};
    seller[id] = {};
  } else {
    // 如果window.localStorage.__seller__已经有了
    // 因为读取的值是字符串的json，所以需要解析成json形式
    seller = JSON.parse(seller);
    // 需要判断seller中是否有属性id，没有的话需要给他进行定义
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value; // 设置不同id下的key的值

  // 由于存储只能是字符串的值，需要将JSON转化成字符串的json形式
  // 存储的localStorage的变量名是：_seller_
  window.localStorage.__seller__ = JSON.stringify(seller);
}
/** 查询本地缓存
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} def 如果查询不到显示的值
 */
export function loadFromlLocal(id, key, def) {
  // 获取本地缓存
  let seller = window.localStorage.__seller__;
  if (!seller) {
    // 如果该变量还没有存储在localStorage中，那么需要返回一个默认值
    return def;
  }
  // 解析json数据
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }

  let ret = seller[key];
  return ret || def;
}
