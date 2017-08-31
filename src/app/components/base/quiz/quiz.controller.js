(() => {
  angular
    .module('marvel')
    .controller('MarvelListCtrl', List);

  function List($http, $mdToast, Config, MarvelService) {
    const vm = this;

    vm.marvelForm = {};
    vm.submit = submit;
    vm.getMarvelImageArray = getMarvelImageArray;
    vm.giveUp = giveUp;
    vm.marvelArray = [];
    vm.score = 0;

    getMarvelImageAPI();

    function submit() {
      if (MarvelService.checkAnswer(vm.marvelForm.hero, vm.marvelArray[vm.index].name)) {
        if (!vm.help) {
          vm.score += 1;
          showToast(`${Config.MESSAGES.CORRECT}`);
        }
      } else {
        vm.score -= 1;
        showToast(`${Config.MESSAGES.WRONG}`);
      }

      getMarvelImageArray();
      vm.marvelForm.hero = '';
      vm.help = false;
      vm.marvelForm.$setPristine();
      vm.marvelForm.$setUntouched();
    }

    function giveUp() {
      vm.help = true;
      vm.marvelForm.hero = vm.marvelArray[vm.index].name;
    }

    function getMarvelImageArray() {
      vm.marvelForm.hero = '';
      vm.help = false;
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

    function showToast(message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .hideDelay(1000)
      );
    }
  }
})();
