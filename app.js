var app = angular.module('app', []);

app.controller('SampleCtrl', function($scope, $q){
  $scope.fail2 = false;
  $scope.test2 = function(){
    //step 1: create a defer object
    var deferred = $q.defer();
    //step 2: get the promise property of the defer object
    var promise = deferred.promise;
    /* step 3: write down what happens when we receive the response
     * each 'then' block contains 'successCallback', 'errorCallback', 'notifyCallback' 
     * then block can be */
    promise.then(
      // what happens when we receive 'success' response
      function(result){
        $scope.status2 = 'success pass 1 - ' + result;
        return result + ' hassa!';
      }, 
      // what happens when we receive 'failure' response
      function(reason){
        $scope.status2 = 'failure pass 1';
        return reason;
    })
    .then(function(result){
      alert('Success: ' + result);
    }, function(reason){
      alert('Error: ' + reason);
    });
    
    setTimeout(function(){
      //step 4: pass data to 'success' function in then block(s)
      // use deferred.reject() to pass data to 'failure' function in then block(s)
      deferred.resolve('haha');
    }, 2000);
  };
});

app.controller('TestCtrl', function($scope, $q){
  $scope.loadData = function(){
      var deferred = $q.defer();
      loadUser()
        .then(loadStaff)
        .then(function(result){
          alert(JSON.stringify(result));
        });
  };
  
  //since this loadUser does not need any data, so we omit the parameter
  function loadUser(){
    var deferred = $q.defer();
    setTimeout(function(){
      //since this code is in the loadUser(), this parameter would be passed to loadStaff()
      deferred.resolve({userId: 1, staffId: 1, userName: 'jdoe'});
    }, 100);
    return deferred.promise;
  }
  
  //
  function loadStaff(user){
    var deferred = $q.defer();
    setTimeout(function(){
      deferred.resolve(
        {staffId: user.staffId, firstName: 'John', lastName: 'Doe'});
    }, 200);
    return deferred.promise;
  }
  
});