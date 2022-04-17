export function setObject (key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}