import jwt from 'jsonwebtoken'
import Usuario from './models/Usuario.js'
import { SECRET_KEY } from './config/config.js'

export const register = async (req, res) => {
  try {
    const { nombres, apellidos, username, password } = req.body

    if (!nombres || !apellidos || !username || !password) { return res.status(400).json({ message: 'Datos incompletos' }) }

    const resultado = await Usuario.create(
      nombres,
      apellidos,
      username,
      password
    )
    if (resultado.affectedRows === 1) {
      res.status(201).json({ message: 'Usuario creado' })
    }

    res.status(500).json({ message: 'Error al insertar el usuario' })
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const resultado = await Usuario.where('username', username)

    if (resultado.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const usuario = resultado[0]

    if (password === usuario.password) {
      const token = jwt.sign({ usuarioId: usuario.usuario_id }, SECRET_KEY, {
        expiresIn: '5m'
      })
      return res.json({ message: 'Login exitoso', token })
    } else {
      return res.status(400).json({ message: 'Credenciales inválidas' })
    }
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const me = async (req, res) => {
  try {
    const { authorization } = req.headers
    const decoded = jwt.verify(authorization, SECRET_KEY)

    const usuario = await Usuario.find(decoded.usuarioId)

    res.json(usuario[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
