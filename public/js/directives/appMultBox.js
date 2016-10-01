/**
 * Created by benext-tpl on 01.10.16.
 */
app.directive('appMultBox', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/app-mult-box.html',
        require: '?ngModel',
        scope: {
            boxData: '=',
            boxConfig: '=',
            selectedList: '='
        },
        link: function(scope, element, attrs, controller) {

            scope.$watch('selected', function(newVal) {
                scope.selectedList =newVal;
            });

        }
    };
});