import path from 'path'

// comando para criar as tables: npx knex migrate:latest --knexfile knexfile.ts migrate:latest
 
module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true
}