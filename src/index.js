import express from 'express'
import authRoutes from './routes/auth.routes.js'
import morgan from 'morgan'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  const { origin } = req.headers
  const allowedOrigins = ['http://localhost:5173']

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization')
    next()
  } else {
    res.status(401).json({ message: 'Error de CORS. No permitido.' })
  }
})

app.use(morgan('dev'))
app.use(authRoutes)

app.listen(3000, () => console.log('Servidor en http://localhost:3000'))
