import { pool } from '../config/db.js'

class Usuario {
  async index () {
    const [usuarios] = await pool.execute('SELECT * FROM usuarios')
    return usuarios
  }

  async find (id) {
    const [usuario] = await pool.execute(
      'SELECT * FROM usuarios WHERE usuario_id = ?',
      [id]
    )
    return usuario
  }

  async where (columna, valor) {
    const [usuario] = await pool.execute(
      `SELECT * FROM usuarios WHERE ${columna} = ?`,
      [valor]
    )
    return usuario
  }

  async create (nombres, apellidos, username, password) {
    const [resultado] = await pool.execute(
      'INSERT INTO usuarios(nombres, apellidos, username, password) VALUES (?, ?, ?, ?)',
      [nombres, apellidos, username, password]
    )
    return resultado
  }
}

export default new Usuario()
