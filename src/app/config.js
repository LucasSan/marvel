(() => {
  angular.module('marvel')
    .factory('Config', () => ({
      MARVEL: {
        URL: 'https://gateway.marvel.com:443/v1/public/',
        PUBLIC_KEY: 'bd64c660c01af9c996809025aeb61a84',
        MD5: 'a8887a0083c68bbb3a53ac8478fd4a58'
      },
      MESSAGES: {
        CORRECT: 'Acertou!',
        WRONG: 'Errou!'
      }
    }));
})();
