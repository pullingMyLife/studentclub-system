/**
 * 存储sessionStorage
 */
export const setStorage = (params) => {
  const {
    name,
    content
  } = params
  const obj = {
    dataType: typeof (content),
    content: content
  }
  window.sessionStorage.setItem(name, JSON.stringify(obj))
}
/**
 * 获取sessionStorage
 */

export const getStorage = (params) => {
  const { name } = params
  const obj = window.sessionStorage.getItem(name)
  if (obj === null) {
    return null
  }
  return JSON.parse(obj).content
}

/**
 * 清空全部localStorage
 */
export const clearStorage = () => {
  window.sessionStorage.clear()
}
