export const hasAuthorization = (header: Headers): boolean => {
  const authorizationHeader = header.get('Authorization')
  return !!authorizationHeader && authorizationHeader.startsWith('Bearer ')
}

export const getAuthorizationToken = (header: Headers): string =>
  header.get('Authorization')?.substring(7) || ''
