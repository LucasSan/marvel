(() => {
  angular.module('marvel')
    .factory('MarvelService', ($http, $q, Config) => {
      function getMarvelImage() {
        const urlAddress = `characters?ts=1&apikey=${Config.MARVEL.PUBLIC_KEY}&hash=${Config.MARVEL.MD5}`;
        return request(urlAddress, 'GET');
      }

      function request(path, method) {
        const options = {
          method,
          url: `${Config.MARVEL.URL}${path}`
        };

        return $q((resolve, reject) => {
          $http(options)
            .then(success => resolve(success.data), (err) => {
              return reject(err);
            });
        });
      }

      return {
        getMarvelImage
      };
    });
})();
