const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ====================== ROUTES ======================

// 1. Ajouter une vente
app.post('/ventes', async (req, res) => {
  const { numProduit, design, prix, quantite } = req.body;
  const vente = await prisma.vente.create({
    data: { numProduit, design, prix, quantite }
  });
  res.json(vente);
});

// 2. Lister toutes les ventes + montant calculé
app.get('/ventes', async (req, res) => {
  const ventes = await prisma.vente.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const ventesAvecMontant = ventes.map(v => ({
    ...v,
    montant: Number(v.prix) * v.quantite   // conversion Decimal → Number
  }));

  res.json(ventesAvecMontant);
});

// 3. Statistiques (total, min, max)
app.get('/ventes/stats', async (req, res) => {
  const ventes = await prisma.vente.findMany();

  const montants = ventes.map(v => Number(v.prix) * v.quantite);

  const totalMontant = montants.reduce((a, b) => a + b, 0);

  const stats = {
    totalMontant,
    montantMinimal: montants.length ? Math.min(...montants) : 0,
    montantMaximal: montants.length ? Math.max(...montants) : 0,
    nombreProduits: ventes.length
  };

  res.json(stats);
});


// 4. Modifier une vente
app.put('/ventes/:id', async (req, res) => {
  const { id } = req.params;
  const { numProduit, design, prix, quantite } = req.body;

  const vente = await prisma.vente.update({
    where: { id: parseInt(id) },
    data: { numProduit, design, prix, quantite }
  });
  res.json(vente);
});

// 5. Supprimer une vente
app.delete('/ventes/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.vente.delete({
    where: { id: parseInt(id) }
  });
  res.json({ message: 'Vente supprimée' });
});

// ====================== LANCER LE SERVEUR ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend démarré sur http://0.0.0.0:${PORT}`);
});
