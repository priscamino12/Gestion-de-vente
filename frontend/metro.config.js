// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { 
  input: "./global.css"   // ← Doit correspondre exactement au nom et chemin de ton fichier CSS
});