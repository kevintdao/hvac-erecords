export function setObject (key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}

export function getObject (key) {
  localStorage.getItem(key)
}