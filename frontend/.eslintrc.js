module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 0,
    'react/prop-types': 'off',
  },
};
