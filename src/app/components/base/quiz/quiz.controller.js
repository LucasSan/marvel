(() => {
  angular
    .module('marvel')
    .controller('MarvelListCtrl', List);

  function List($http, Config, MarvelService) {
    const vm = this;

    vm.marvelForm = {};
    vm.submit = submit;
    vm.getMarvelImageArray = getMarvelImageArray;
    vm.giveUp = giveUp;
    vm.marvelArray = [];
    vm.score = 0;

    getMarvelImageAPI();

    function submit() {
      if (vm.marvelForm.hero === vm.marvelArray[vm.index].name && !vm.help) {
        vm.score += 1;
      } else if (!vm.help) {
        vm.score -= 1;
      }

      getMarvelImageArray();
      vm.marvelForm.hero = '';
      vm.help = 0;
      vm.marvelForm.$setPristine();
      vm.marvelForm.$setUntouched();
    }

    function giveUp() {
      vm.help = 1;
      vm.marvelForm.hero = vm.marvelArray[vm.index].name;
    }

    function getMarvelImageArray() {
      vm.marvelForm.hero = '';
      vm.help = 0;
      vm.index = Math.floor(Math.random() * vm.marvelArray.length);
      vm.imagePath = vm.marvelArray[vm.index].thumbnail.path + '/landscape_incredible.jpg';
    }

    function getMarvelImageAPI() {
      MarvelService.getMarvelImage()
        .then((item) => {
          vm.index = Math.floor(Math.random() * item.data.results.length);
          vm.marvelArray = item.data.results;
          vm.imagePath = vm.marvelArray[vm.index].thumbnail.path + '/landscape_incredible.jpg';
        })
        .catch();
    }
  }
})();
