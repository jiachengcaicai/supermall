/**
 * 防抖动
 * @param {Function} func
 * @param {Number} delay
 * @returns
 */
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 把时间戳转换为时间
 * @param {Date} date Date对象
 * @param {String} format 装换的格式
 * @returns 装换后的时间格式
 */
export function formatDate(date, format) {
  // 1.获取年份
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+' : date.getMonth() + 1,
    'd+' : date.getDate(),
    'h+' : date.getHours(),
    'm+' : date.getMinutes(),
    's+' : date.getSeconds(),
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      let str  =o[k] + ''
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return format
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
