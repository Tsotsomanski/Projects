angular
    .module('Login')
    .component('login-page', {
        bindings: {},
        templateUrl: 'angello/login/component/login-page.component.html',
        controllerAs: vm,
        controller: function($scope) {
            let vm = this;

            console.log('In the club !...')

        }

    });