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

    // When the user hits the Answer button, we check the name of the hero, if it's corrects, and the user didn't use the tip, 
    // we set the score with 1 point.
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

    // When the user hits the 'I give up' button, I set the 'help' flag to true, and set the text field with the name of the marvel char.
    function giveUp() {
      vm.help = true;
      vm.marvelForm.hero = vm.marvelArray[vm.index].name;
    }

    // We don't need to go to the API always, so I put the API result in an array an then sort another element in this array, to get the image
    // of the new marvel character.
    function getMarvelImageArray() {
      vm.marvelForm.hero = '';
      vm.help = false;
      vm.index = Math.floor(Math.random() * vm.marvelArray.length);
      vm.imagePath = vm.marvelArray[vm.index].thumbnail.path + '/landscape_incredible.jpg';
    }

    // Call my Marvel Service, that returns a promisse with the results from the API.
    function getMarvelImageAPI() {
      MarvelService.getMarvelImage()
        .then((item) => {
          vm.index = Math.floor(Math.random() * item.data.results.length);
          vm.marvelArray = item.data.results;
          vm.imagePath = vm.marvelArray[vm.index].thumbnail.path + '/landscape_incredible.jpg';
        })
        .catch((err) => {
          showToast(`${Config.MESSAGES.ERROR}`);
        });
    }

    // Show a toaster.
    function showToast(message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .hideDelay(1000)
      );
    }
  }
})();
