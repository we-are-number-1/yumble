module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'ignorePatterns': ['**/dist/*.js', '**/node_modules/**/*.js'],
  'rules': {
    'linebreak-style': 0,
  },
};
