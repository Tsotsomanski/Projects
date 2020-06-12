angular.module('Angello')
    .service('angelloService', function () {
        var service = this,

            statuses = [
                {name: 'Back Log'},
                {name: 'To Do'},
                {name: 'In Progress'},
                {name: 'Code Review'},
                {name: 'QA Review'},
                {name: 'Verified'},
                {name: 'Done'}
            ],
            types = [
                {name: 'Feature'},
                {name: 'Enhancement'},
                {name: 'Bug'},
                {name: 'Spike'}
            ],
            stories = [
                {
                    title: 'First story',
                    description: 'Our first story.',
                    criteria: 'Criteria pending.',
                    status: 'To Do',
                    type: 'Feature',
                    reporter: 'Lukas Ruebbelke',
                    assignee: 'Brian Ford'
                },
                {
                    title: 'Second story',
                    description: 'Do something.',
                    criteria: 'Criteria pending.',
                    status: 'Back Log',
                    type: 'Feature',
                    reporter: 'Lukas Ruebbelke',
                    assignee: 'Brian Ford'
                },
                {
                    title: 'Another story',
                    description: 'Just one more.',
                    criteria: 'Criteria pending.',
                    status: 'Code Review',
                    type: 'Enhancement',
                    reporter: 'Lukas Ruebbelke',
                    assignee: 'Brian Ford'
                }
            ];

        service.getStatuses = function () {
            return statuses;
        };

        service.getTypes = function () {
            return types;
        };

        service.getStories = function () {
            return stories;
        };
    });