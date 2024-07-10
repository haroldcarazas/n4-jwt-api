import express from 'express'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(express.json())
app.use(authRoutes)

app.listen(3000, () => console.log('Servidor en http://localhost:3000'))
