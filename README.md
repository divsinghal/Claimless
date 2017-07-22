# Claimless
### Universal No Claim Bonus

As an insurance customer there is no easy way to demonstrate your personal claim history.

There is no way to prove you are a good quality low risk customer to an insurance provider.

By transfering No Claim Bonus (NCB) tokens into a policy holders account when a policy expires, we will intrinsically store the value of a customers claim history.

An insurance provider may choose to offer a discount on a policy in exchange for NCB tokens.

NCB tokens can be redeemed against any insurance product offered by any
insurance provider.

#### NCB tokens are NON-TRADABLE
NCB tokens are created when a policy expires and destroyed when redeemed for a discount.

NCB tokens are issued at a standard rate which is directly linked the the premium of a policy. 1 NCB for each £1 premium.

The insurance provider determines the value of NCB tokens at the point of sale.

#### Process Flow
1. A potential customer owns 10 NCB tokens

2. An insurance provider chooses to offer a discount of 0.1% per NCB token on home contents insurance (could be anything).  With a maximum discount of 5% or 50 NCB.  NCB tokens will be payable on policy expiration if no claim is made.

3. The customer chooses to redeem all 10 NCB tokens to purchase this policy.
The policy is for 1 year, original premium is £100 and the discounted premium is £99 = £100 - (0.1% * 10).
99 NCB tokens are payable if no claim is made.

4. The customer now has 0 NCB tokens.

5. (i) Scenario 1 No Claim: 1 year later the policy expires without a claim being made. 99 NCB tokens created and are transfered to the customers account (Customer must request the tokens).

5. (ii) Scenario 2 Claim made: No NCB tokens are created or transfer.  No action is required.

5. (iii) Scenario 3 Policy cancelled: Insurer records the total amount of premium paid (if any).  If no claim has occured NCB tokens are created and transfered based on the actual premium paid.  Example: only £10 premium was collected before the policy was cancelled, no claims occured.  10 NCB tokens are created and transfered to the customer.

#### Value
NCB tokens are a high level abstraction of potential customers claim history.  

Offering discounts in exchange for NCB tokens allows insurance providers to
attract lower risk customers to products of their choosing.

Customers with a good claim history are rewarded with discounts.

#### Why blockchain?
Blockchain is the perfect solution to transfer digital value.  Our solution
uses the blockchain to represent the value of a good claim history.

Our solution requires trust on the part of insurance providers (to register and
maintain the contract) but does not require any trust of potential customers.
The blockchain makes it imposible for a customer to manipulate their token
count.

#### TODO
A permission system is needed to restrict token creation transactions to
verified insurance providers only.

A fee could be charged to verify an insurance providers credibility.

A method to monitor and possibly ban insurance providers if they create NCB
tokens but do not except them.

#### Possible Expansion
This solution could easily be adapted to present detials of a customers premium
history, plus with a little bit of work claim amounts and other details could
also be collected.

Integration with an identity verification solution could add a fraud detection
element to this solution.

A method to allow customers to vote or rate the service they have recieved
could be added. 
