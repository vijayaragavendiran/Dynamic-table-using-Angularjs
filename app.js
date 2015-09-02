var app = angular.module('myApp', []);

app.controller('columnMaster', ['$scope', '$rootScope', '$http', '$filter', function($scope, $rootScope, $http, $filter) {
  $scope.columnMasterData = [];
  $scope.chkBoxIndx = [];
  $scope.resultRow = [];
  $scope.addColumnMaster = function() { //Adds row to Column master
    var c = {
      colName: $scope.colName,
      colType: $scope.colType,
      colEdt: $scope.colEdt,
    };
    $scope.columnMasterData.push(c);
  }

  $scope.removeColumnMaster = function() { //Remove rows from column master
    var newColumnMaster = [];

    angular.forEach($scope.columnMasterData, function(v) {
      if (!v.isDelete) {
        newColumnMaster.push(v);
      }
    });
    $scope.columnMasterData = newColumnMaster;
  }

  $scope.addRows = function() { //Add blank row in result table

    var data = {
      value: {
        colNDate: ''
      }
    };
    data.value.colNDate = new Date();
    data.value.colNDate.setHours(data.value.colNDate.getHours() - data.value.colNDate.getTimezoneOffset() / 60);

    $scope.resultRow.push(data);
  };
  $scope.removeRows = function() { //Remove rows from result table
    var newResults = [];
    angular.forEach($scope.resultRow, function(v) {
      if (!v.isRowDelete) {
        newResults.push(v);
      }
    });
    $scope.resultRow = newResults;
  }
  $scope.exportToExcel = function() { //Export result table data in JSON file
    var data = JSON.stringify($scope.resultRow);
    var blob = new Blob([data], {
        type: 'text/json'
      }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a');

    a.download = 'download.json';
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window,
      0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);

  }

}]);