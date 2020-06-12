var myModule = angular.module('Angello',
    [
        'ngRoute',
        'ngAnimate',
        'firebase',
        'ngMessages',
        'Angello.Common',
        'Angello.Dashboard',
        'Angello.Login',
        'Angello.Storyboard',
        'Angello.User',
        'auth0',
        'angular-jwt',
        'angular-storage'
    ]);

angular
    .module('Angello')
    .component('angelloComponent',
        {
            bindings: {},
            controllerAs: 'vm',
            templateUrl: 'angello/angello.component.html',
            controller: ['$rootScope', '$scope', '$state', 'angelloService', 'AngelloHelper',
                function ($rootScope, $scope, $state, angelloService, AngelloHelper) {
                    let vm = this;



                    vm.types = AngelloModel.getTypes();
                    vm.statuses = AngelloModel.getStatuses();
                    vm.stories = AngelloModel.getStories();
                    vm.typesIndex = AngelloHelper.buildIndex(vm.types, 'name');
                    vm.statusesIndex = AngelloHelper.buildIndex(vm.statuses, 'name');

                    vm.setCurrentStory = function (story) {
                        vm.currentStory = story;
                        vm.currentStatus = vm.statusesIndex[story.status];
                        vm.currentType = vm.typesIndex[story.type];
                    };

                    vm.createStory = function () {
                        vm.stories.push({
                            title: 'New Story',
                            description: 'Description pending.',
                            criteria: 'Criteria pending.',
                            status: 'Back Log',
                            type: 'Feature',
                            reporter: 'Pending',
                            assignee: 'Pending'
                        });
                    };

                    vm.setCurrentStatus = function (status) {
                        if (typeof vm.currentStory !== 'undefined') {
                            vm.currentStory.status = status.name;
                        }
                    };

                    vm.setCurrentType = function (type) {
                        if (typeof vm.currentStory !== 'undefined') {
                            vm.currentStory.type = type.name;
                        }
                    };
                }],
        });