# Solidity Patterns

## Behavioral Patterns

### Guard Check

Ensure that the behavior of a smart contract and its input parameters are as expected.
The desired behavior of a smart contract would be to check for all required circumstances and only proceed if everything is as intended.

### Implementation exemples :

- ImmoToken Contract : `offerTransfer` function : requires that the contract is allowed to transfer, and the seller has enough tokens to proceed throws a revert if otherwise

- ImmoTokenSale contract : `buyTokens` requires that the price sent is correct, there is enough tokens left to buy before doing the transfer

- ReceiverRent contract : `claimPayment` requires that the nonce is not used first then, the signature is correct before nullitfying the nonce and doing the transfer

## Security Patterns

### Access Restriction

Restrict the access to contract functionality according to suitable criteria.

### Implementation exemples :

- ImmoToken contract : `offerTransfer` can only be called by the ImmoTokenSale contract, that will be registered upon migration
- ImmoTokenSale contract : `endSale` can only be called by the owner, that will be registered upon migration

### Checks Effects Interactions

Reduce the attack surface for malicious contracts trying to hijack control flow after an external call. A re-entrancy attack can lead to a function being called again, before its first invocation has been finished. We should therefore not make any changes to state variables, after interacting with external entities, as we cannot rely on the execution of any code coming after the interaction.

### Implementation exemples :

- ImmoToken contract : `transfer` after check that the credit is enough, the balance of the sender is first deduced then the balance of the receiver is credited
- ImmoToken contract : `offerTransfer` after check that the allowed contract is the sender and the credit is enough, the balance of the seller is first deduced then the balance of the buyer is credited
- ReceiverRent contract : `claimPayment` after check that the signature is correctly tied to the owner, the transfer occurs after the Nonce is registered, preventing a re-entrency attack

### Secure Ether Transfer

Secure transfer of ether from a contract to another address. While both methods, `transfer` and `send`, are considered safe against re-entrancy, because they only forward 2300 gas, transfer should be the go-to method to transfer ether in most cases. This is because it reverts automatically in case of any errors.

### Implementation exemples :

- ReceiverRent contract : `claimPayment` after check that the signature is correctly tied to the owner, the amount of ether is transferred through a \_.transfer(amount) method.
