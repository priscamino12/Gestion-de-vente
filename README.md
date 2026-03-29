# Gestion de Vente - Mobile App

Application mobile professionnelle de gestion des ventes développée avec React Native (Expo) et connectée à une API REST.

---

## Description

Cette application permet de gérer efficacement les ventes directement depuis un smartphone. Elle offre toutes les opérations principales (CRUD) ainsi qu’une visualisation claire des statistiques en temps réel grâce à son backend.

Conçue pour être intuitive et performante, elle s’adresse aux commerçants, entrepreneurs et équipes de vente souhaitant un outil mobile moderne et fiable.

---

## Fonctionnalités

- Consultation et recherche des ventes
- Ajout d’une nouvelle vente
- Modification des ventes existantes
- Suppression sécurisée des enregistrements
- Consultation des statistiques en temps réel
- Communication fluide avec une API REST

---

## Technologies utilisées

### Frontend (Mobile)
- React Native avec Expo
- JavaScript
- Axios

### Backend
- Node.js
- Express.js
- API REST

---

## Structure du projet

```bash
Gestion-de-vente/
├── frontend/              # Application mobile React Native
├── backend-ventes/        # Serveur Node.js et Express
└── README.md
```

## Installation

### 1. Cloner le projet
git clone https://github.com/priscamino12/Gestion-de-vente.git

cd Gestion-de-vente

### 2. Installer les dépendances

#### Frontend : 
```bash
cd frontend
npm install
```
#### Backend :
```bash
cd ../backend-ventes
npm install
```

### 3. Configuration

Dans le frontend, modifier l’adresse de l’API dans /frontend/src/services/api.js:
```bash
baseURL: "http://VOTRE_IP:5000"
```

### 4. Lancement

Backend : 
```bash 
npm run dev
```
Frontend: 
```bash
npx expo start
```

## Utilisation

- Scanner le QR code avec Expo Go  
- Ou utiliser un émulateur Android/iOS  

## Important

- Le téléphone et l’ordinateur doivent être sur le même réseau  
- Ne pas utiliser "localhost" dans React Native  
- Utiliser l’adresse IP locale de la machine  

## Auteur

Prisca Mino  
https://github.com/priscamino12

## Licence

Projet à but éducatif.
