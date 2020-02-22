const isUserMiddleware = (req, res, next) => {
  //if there is a req.user, their id should match the paramsId of the route

  if (req.user !== undefined) {
    const paramsUserId = parseInt(req.params.userId)
    if (paramsUserId === req.user.id) {
      console.log('matching ids')
      next()
    } else {
      console.log('not matching ids')
      const error = new Error("doesn't look like anything to me")
      error.status = 401
      next(error)
    }
  } else {
    console.log('not matching ids')
    const error = new Error("doesn't look like anything to me")
    error.status = 401
    next(error)
  }
}

module.exports = {
  isUserMiddleware
}
