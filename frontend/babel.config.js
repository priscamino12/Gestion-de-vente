// babel.config.js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",           // ← Important : ici en tant que preset (pas dans plugins)
    ],
    plugins: [],
  };
};