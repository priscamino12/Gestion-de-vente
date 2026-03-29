const { Client } = require('pg');

async function test() {
  const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'ventes_db',
    password: '1234',          // ← string explicite, comme PHP
    port: 5433,
  });

  try {
    await client.connect();
    console.log('Connexion OK !');
    const res = await client.query('SELECT current_user, current_database()');
    console.log('Résultat :', res.rows[0]);
  } catch (err) {
    console.error('Erreur :', err.message);
  } finally {
    await client.end();
  }
}

test();