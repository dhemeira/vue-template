export function errorHandler(error: { [index: string]: string }): string {
  if (!error) return '';
  if (!error.code) return '';
  //hibakód alapján hibaüzenetek
  switch (error.code) {
    case 'too-small-screen':
      return 'The content may show up incorrectly due to your screen size being too small.';
    default:
      return 'Unknown error.';
  }
}
export function successHandler(success: { [index: string]: string }): string {
  if (!success) return '';
  if (!success.code) return '';
  //hibakód alapján hibaüzenetek
  switch (success.code) {
    default:
      return 'Unknown success.';
  }
}
