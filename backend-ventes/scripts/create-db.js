// scripts/create-db.js
const { Client } = require('pg');
require('dotenv').config();

async function createDatabaseIfNotExists() {
  // Utilise des params séparés au lieu de l'URL complète
  const defaultClient = new Client({
    user: 'postgres',
    host: 'localhost',
    port: 5433,
    database: 'postgres',          // base par défaut pour créer d'autres DB
    password: '1234',           // ← commente si tu es en trust
                                  // décommente si tu es en md5/scram
  });

  try {
    await defaultClient.connect();
    console.log('Connecté à PostgreSQL (base postgres)');

    // Récupère le nom de la base cible depuis DATABASE_URL ou hardcode
    const targetDbName = 'ventes_db';  // ou parse process.env.DATABASE_URL si besoin

    const res = await defaultClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [targetDbName]
    );

    if (res.rowCount === 0) {
      console.log(`Base "${targetDbName}" n'existe pas → création...`);
      await defaultClient.query(`CREATE DATABASE "${targetDbName}"`);
      console.log(`Base "${targetDbName}" créée !`);
    } else {
      console.log(`Base "${targetDbName}" existe déjà.`);
    }
  } catch (err) {
    console.error('Erreur :', err.message);
    console.error(err.stack);
  } finally {
    await defaultClient.end();
  }
}

createDatabaseIfNotExists();