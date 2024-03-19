const jwt = require('jsonwebtoken')
const CustomApiError = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization

  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    throw new CustomApiError('No token provided', 401)
  }

  const token = authHeaders.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (error) {
    throw new CustomApiError('No authorized to access this route', 401)
  }
}

module.exports = authenticationMiddleware
