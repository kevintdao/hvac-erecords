export function setCookie (name, value, path) {
  var today = new Date();
  var expiry = new Date(today.getTime() + 10 * 24 * 3600 * 1000); // plus 10 days

  document.cookie = `${name}=${value}; path=${path}; expires=${expiry.toUTCString()}`
}

export function getCookie (name, path) {
  
}

export function deleteCookie (name, path) {
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 UTC`
}