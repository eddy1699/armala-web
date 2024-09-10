
const isAuthenticatedGuard = async (to, from, next) => {
  // console.log({ to, from, next })

  return new Promise(() => {
    const tokenLocalStorage = JSON.parse(localStorage.getItem('userData'))
    if (tokenLocalStorage) {
      if (tokenLocalStorage.token) {
        console.log('existe token!', tokenLocalStorage.token)
        next()
      }
    } else {
      console.log('bloqueado por el isAuthenticatedGuard')
      next({ name: 'login' })
    }
  })
}

export default isAuthenticatedGuard
