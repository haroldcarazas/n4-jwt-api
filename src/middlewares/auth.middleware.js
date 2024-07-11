import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

export const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) return res.status(401).json({ message: 'Se debe proveer un token' })

    jwt.verify(authorization, SECRET_KEY)
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'El token ha expirado' })
    }

    res.status(500).json({ message: 'Error en el token' })
  }
}
