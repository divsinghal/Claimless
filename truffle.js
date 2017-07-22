module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "tokenManager.js": [
      "javascripts/vendor/angular.js",
      "javascripts/tokenManagerController.js"
    ],
    "app.css": [
      "stylesheets/styles.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
