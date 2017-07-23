var app = angular.module('tokenManager', []);

app.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

var getTransactionReceiptMined = function (txnHash, interval) {
  var transactionReceiptAsync;
  interval = interval ? interval : 500;
  transactionReceiptAsync = function(txnHash, resolve, reject) {
    try {
      var receipt = web3.eth.getTransactionReceipt(txnHash);
      if (receipt == null) {
        setTimeout(function () {
          transactionReceiptAsync(txnHash, resolve, reject);
        }, interval);
      } else {
        resolve(receipt);
      }
    } catch(e) {
      console.log("error "+e);
      reject(e);
    }
  };

  return new Promise(function (resolve, reject) {
      transactionReceiptAsync(txnHash, resolve, reject);
  });
};

app.controller("tokenManagerController", [ '$scope', '$location', '$http', '$q', '$window', '$timeout', function($scope , $location, $http, $q, $window, $timeout) {
  
  $scope.policyPurchased = function(consumer,policyNo,duration,totalPremium,tokensToBeRedeemed){

    console.log("consumer = "+consumer);
    console.log("policyNo = "+policyNo);
    console.log("duration = "+duration);
    console.log("totalPremium = "+totalPremium);
    console.log("tokensToBeRedeemed = "+tokensToBeRedeemed);

    var tokenManager  = TokenManager.deployed();

     return tokenManager.policyPurchased(policyNo,consumer,duration,totalPremium,{from : accounts[0], gas: 3000000})
     .then(function(tx) {
          return Promise.all([
              getTransactionReceiptMined(tx)
            ]);
        })
      .then(function (eventAndReceipt) {
          return tokenManager.getPolicy.call(policyNo);
        })
      .then(function(values){
        console.log("consumer "+values[0]);      
        console.log("policyNo "+values[1].valueOf());
        console.log("duration "+values[2].valueOf());      
        console.log("totalPremium "+values[3].valueOf());      
        console.log("claimMade "+values[4]);      
      });

    };

  $scope.policyClaimMade = function(policyNo){
    console.log("Policy Claim Made with  policyNo "+policyNo);

    var tokenManager  = TokenManager.deployed();
    
    return tokenManager.policyClaimMade(policyNo, {from :accounts[0], gas: 3000000})
     .then(function(tx) {
          return Promise.all([
              getTransactionReceiptMined(tx)
            ]);
        })
      .then(function (eventAndReceipt) {
          return tokenManager.getPolicy.call(policyNo);
        })
      .then(function(values){
        console.log("values[0] "+values[0]);      
        console.log("values[1] "+values[1].valueOf());
        console.log("values[2] "+values[2].valueOf());      
        console.log("values[3] "+values[3].valueOf());      
        console.log("values[4] "+values[4]);      
      });

  }

  $scope.policyExpired = function(policyNo){
    console.log("Policy Expired - policyNo "+policyNo);

    var tokenManager  = TokenManager.deployed();

    return tokenManager.policyExpired(policyNo,{from :accounts[0], gas: 3000000})
     .then(function(tx) {
          return Promise.all([
              getTransactionReceiptMined(tx)
            ]);
        })
      .then(function (eventAndReceipt) {
          return tokenManager.getPolicy.call(policyNo);
        })
      .then(function(values){
        console.log("values[0] "+values[0]);      
        console.log("values[1] "+values[1].valueOf());
        console.log("values[2] "+values[2].valueOf());      
        console.log("values[3] "+values[3].valueOf());      
        console.log("values[4] "+values[4]);      
      });

  }

  $scope.policyCancelled = function(policyNo,totalPremium){
    console.log("Policy Canclled  policyNo "+policyNo+ "totalPremium "+totalPremium);

    var tokenManager  = TokenManager.deployed();

    return tokenManager.policyCancelled(policyNo,totalPremium,{from :accounts[0],gas: 3000000})
     .then(function(tx) {
          return Promise.all([
              getTransactionReceiptMined(tx)
            ]);
        })
      .then(function (eventAndReceipt) {
          return tokenManager.getPolicy.call(policyNo);
        })
      .then(function(values){
        console.log("values[0] "+values[0]);      
        console.log("values[1] "+values[1].valueOf());
        console.log("values[2] "+values[2].valueOf());      
        console.log("values[3] "+values[3].valueOf());      
        console.log("values[4] "+values[4]);      
      });
  }

  
  $scope.getTokenBalance = function(consumer) {
    console.log("getTokenBalance called with address "+consumer);

    var tokenManager  = TokenManager.deployed();

    tokenManager.getTokenBalance.call(consumer)
    .then(function(count){
      console.log("count "+count.valueOf());
        $scope.tokensHeld = count.valueOf();
    });

  }

}]);
