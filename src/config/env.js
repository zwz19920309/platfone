/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = ''
let routerMode = 'hash'
let baseImgPath
let logoutUrl = 'http://admin-upper.jin10.com'

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3001/plat'
} else {
  baseUrl = 'http://192.168.1.38:3001/plat'
}

export {
  baseUrl,
  routerMode,
  baseImgPath,
  logoutUrl
}
