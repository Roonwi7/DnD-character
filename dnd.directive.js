angular.module('DnDApp')
  .directive('dropdownMultiselect', function () {
    return {
                restrict: 'E',
                scope: {
                    options: '=',
                },
                template:
'<div class="btn-group" data-ng-class="{open: open}">' +
'<button class="btn btn-small">Languages...</button>' +
'<button class="btn btn-small dropdown-toggle" data-ng-click="openDropdown()"> <span class="caret"></span></button>' +
'<ul class="dropdown-menu" aria-labelledby="dropdownMenu">' +
'<li><a data-ng-click="selectAll()"> <span class="glyphicon glyphicon-ok green" aria-hidden="true"></span> Check All</a></li>' +
'<li><a data-ng-click="deselectAll();"> <span class="glyphicon glyphicon-remove red" aria-hidden="true"></span> Uncheck All</a></li>' +
'<li class="divider"></li>' +
'<li>Standard</li>' +
'<li data-ng-repeat="option in options | filter: {type:\'Standard\'} "> <a data-ng-click="toggleSelectItem(option)"> <span data-ng-class="getClassName(option)" aria-hidden="true"></span> {{option.language}}</a></li>' +
'<li class="divider"></li>' +
'<li>Exotic</li>' +
'<li data-ng-repeat="option in options | filter: {type:\'Exotic\'} "> <a data-ng-click="toggleSelectItem(option)"> <span data-ng-class="getClassName(option)" aria-hidden="true"></span> {{option.language}}</a></li>' +
'</ul>' +
'</div>', 

                controller: function ($scope) {

    $scope.openDropdown = function() {
      $scope.open = !$scope.open;
    };
    $scope.selectAll = function () {
      angular.forEach($scope.options, function (item, index) {
        item.selected = true;
      });
    };
    $scope.deselectAll = function () {
      angular.forEach($scope.options, function (item, index) {
        item.selected = false;
      });
    };
    $scope.toggleSelectItem = function (option) {
      option.selected = !option.selected;
    };
    $scope.getClassName = function (option) {
      var varClassName = 'glyphicon glyphicon-remove red';
      angular.forEach($scope.options, function (item, index) {
        if (item.language == option.language && option.selected == true) {
          varClassName = 'glyphicon glyphicon-ok green';
        }
      });
      return (varClassName);
    };
  }
  }
});

