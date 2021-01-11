//防抖
export function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) {
      //当debounce创建了新的timer时，要clearTimeout(timer)，使旧的timer无效
      clearTimeout(timer)
    }
    //当debounce创建了新的timer时，要clearTimeout(timer)，使旧的timer无效
    // timer = setTimeout(fn, delay);
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}
//节流
export function throttle(fn, delay) {
  //打开节流阀门
  let valid = true
  return function () {
    //节流阀门关闭了，就不会调用函数
    if (!valid) {
      return
    }
    //到这里可以判断节流阀是打开的，要关掉再调用函数,完成调用后再打开
    valid = false
    setTimeout(() => {
      fn()
      valid = true
    }, delay);
  }
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}