export function handleError (error) {
  if (error == null){
    return 'Cannot establish connection with server'
  }

  const data = error.response?.data
  if (typeof data === 'string' || data instanceof String) {
    return data
  }

  let output = ''

  for (const [key, value] of Object.entries(data)) {
    output = output + value + '\n'
  }
  return output
}