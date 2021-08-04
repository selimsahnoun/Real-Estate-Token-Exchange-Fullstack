# Avoiding Common Attacks

Below is list of the measures taken to avoid common attacks.

## ImmoTokenSale Contract:

- This contract does not intentionally store a balance of Ether and have no functions to manage storage of Ether. This by itself reduces exposure to attacks.
- There is no transfer of administration, which reduces the attacks.
- The token price and the link to the ERC20 is done upon migration, there is no change to that after.
- The transfer of token is done with the concept of push over pull
- The sale of token is a pending offer, only matched when someone propose a buy offer. It is not bought by the contract, and there is no function that manages a buying of tokens by the contract
- The endSale is only allowed by the admin that can’t be changed after migration

## ImmoToken Contract:

- This contract does not intentionally store a balance of Ether and have no functions to manage storage of Ether. This by itself reduces exposure to attacks.
- There is no transfer of administration, which reduces the attacks.
- This contract follows the requirements of an ERC20.
- The transfer of token is done with the concept of push over pull

## RecieverPays Contract:

- There is only one "payable" function `claimPayment`. This function performs the checks on the validity of the signature, then nullify the nonce (so none can nullify the nonce of someone else with a fake signature) to finally do the transfer.
