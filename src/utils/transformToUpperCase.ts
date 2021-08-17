export function transformToUpperCase(strg: string) {
  if (typeof strg !== 'string') {
    return ''
  }

  return strg.charAt(0).toUpperCase() + strg.substr(1)
}
