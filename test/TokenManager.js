web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
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
      reject(e);
    }
  };

  return new Promise(function (resolve, reject) {
      transactionReceiptAsync(txnHash, resolve, reject);
  });
};


contract("TokenManager",function(accounts) {

	it("should be able to register purchase of a policy ", function(){
		var tokenManager = TokenManager.deployed();

		return tokenManager.policyPurchased.call(123,accounts[0],10,100)
			.then(function(successful){
				assert.isTrue(successful,"Purcahse notification should be successful");
				return tokenManager.policyPurchased(123,accounts[0],10,100);
			})
			.then(function(tx) {
		    	return Promise.all([
		    		web3.eth.getTransactionReceiptMined(tx)
	    			]);
	    	})
			.then(function (eventAndReceipt) {
		    	return tokenManager.getPolicy.call(123);
		    })
			.then(function(values){
			
				assert.equal(accounts[0],values[0],"this should be the address of the consumer");
				assert.equal(123, values[1].valueOf(),"this should be policy number");
				assert.equal(10, values[2].valueOf(),"this should be duration");
				assert.equal(100, values[3].valueOf(),"this should be total premium");
				assert.isFalse(values[4],"this should be false (claims made)");
			});

	});


});
