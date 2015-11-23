app.directive('include',
    function () {
        return {
            replace: true,
            restrict: 'A',
            templateUrl: function (element, attr) {
                return attr.pfInclude;
            }
        };
    }
);