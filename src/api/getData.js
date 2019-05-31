import fetch from '@/config/fetch'
/** 
*获取平台列表
*/
export const getPlatFormList = data => fetch('/admin/platform/getPlatFormList', data, 'POST')
/** 
*添加平台
*/
export const addPlatForm = data => fetch('/admin/platform/addPlatForm', data, 'POST')
/** 
*修改平台
*/
export const updatePlatForm = data => fetch('/admin/platform/updatePlatForm', data, 'POST')
/** 
*删除平台
*/
export const bulkDeletePlatForm = data => fetch('/admin/platform/bulkDeletePlatForm', data, 'POST')
/** 
*批量添加平台
*/
export const bulkAddPlatForm = data => fetch('/admin/platform/bulkAddPlatForm', data, 'POST')
