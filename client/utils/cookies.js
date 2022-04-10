export function setCookie (name, value, path) {
  var today = new Date();
  var expiry = new Date(today.getTime() + 10 * 24 * 3600 * 1000); // plus 10 days

  document.cookie = `${name}=${value}; path=${path}; expires=${expiry.toUTCString()}`
}

export function getCookie (name) {

}

export function deleteCookie (name) {

}