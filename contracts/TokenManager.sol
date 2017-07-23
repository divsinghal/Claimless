pragma solidity ^0.4.8;

contract TokenManager {

	struct Policy {
		address consumer;
		uint256 policyNo;
		uint256 duration;
		uint256 totalPremium;
		bool claimMade;
	}

	mapping(address => uint256) consumerTokensMap;
	mapping(uint256 => Policy) policyNumberPolicyMap;

	function policyPurchased(uint256 _policyNo, address _consumer,
		uint256 _duration, uint256 _totalPremium) returns (bool successful) {

		policyNumberPolicyMap[_policyNo] =  Policy({
				consumer : _consumer,
				policyNo : _policyNo,
				duration : _duration,
				totalPremium : _totalPremium,
				claimMade : false		
			});

		return true;
	}

	function policyClaimMade(uint256 _policyNo){
		Policy policy = policyNumberPolicyMap[_policyNo];
		policy.claimMade  = true;
	}

	function policyCancelled(uint256 _policyNo, uint256 _totalPremiumPaid){
		Policy policy = policyNumberPolicyMap[_policyNo];
	
		if(!policy.claimMade){
			address consumer = policy.consumer;
			consumerTokensMap[consumer] += _totalPremiumPaid/100;
		}
	}

	function policyExpired(uint256 _policyNo){
		Policy policy = policyNumberPolicyMap[_policyNo];
	
		if(!policy.claimMade){
			address consumer = policy.consumer;
			consumerTokensMap[consumer] += policy.totalPremium/100;
		}
	}

	function getPolicy(uint _policyNo)
		constant
		returns(
		address consumer,
		uint256 policyNo,
		uint256 duration,
		uint256 totalPremium,
		bool claimMade) {

		Policy policy = policyNumberPolicyMap[_policyNo];

		return (
			policy.consumer,
			policy.policyNo,
			policy.duration,
			policy.totalPremium,
			policy.claimMade
		);
	}

	function getTokenBalance(address consumer) 
		constant
		returns (
		uint256 tokensHeld) {
		tokensHeld = consumerTokensMap[consumer];
		return tokensHeld;
	}
}