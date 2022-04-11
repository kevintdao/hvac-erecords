export function setObject (key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}

export function getObject (key) {
  localStorage.getItem(key)
}

export function updateObject (key, property, value) {
  var obj = getObject(key)
  obj[property] = value
  setObject(key, obj)
}