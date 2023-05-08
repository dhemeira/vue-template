export function errorHandler(error) {
  if (!error) return ''
  if (!error.code) return ''
  //hibakód alapján hibaüzenetek
  switch (error.code) {
    default:
      return 'Unknown error.'
  }
}
export function successHandler(success) {
  if (!success) return ''
  if (!success.code) return ''
  //hibakód alapján hibaüzenetek
  switch (success.code) {
    default:
      return 'Unknown success.'
  }
}