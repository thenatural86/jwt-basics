const jwt = require('jsonwebtoken')
const CustomApiError = require('../errors/custom-error')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomApiError('Please provide email and password', 400)
  }

  const id = new Date().getDate()

  // just for demo
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const authHeaders = req.headers.authorization

  if (!authHeaders) {
    console.log('no headers')
  }
  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    throw new CustomApiError('No token provided', 401)
  }

  const token = authHeaders.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is you authorized data, your lucky number is ${luckyNumber}`,
    })
  } catch (error) {
    throw new CustomApiError('No authorized to access this route', 401)
  }
}

module.exports = { login, dashboard }
