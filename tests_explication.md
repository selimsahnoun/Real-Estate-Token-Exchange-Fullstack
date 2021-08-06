# Tests explication

## :page_with_curl: ImmoToken Contract:

### initializes the contract with the correct values:

- It will test that the contract has been initialized with a correct title, version and symbol upon deployment

### allocates the initial supply after deployment:

- It will test that the contract has been initialized with a correct number of tokens set up upon deployment and allocates them to the admin

### transfers token ownership:

- It will test that the contract can correctly transfer tokens.
- First by trying a bigger amount than what is available to transfer and wait for a revert. Then a correct amount and expect a success.
- Then check that the correct event is triggered with the correct parameters: sender, receiver, amount.
- Then check that the balance has been correctly modified

### approves tokens for delegated transfer:

- It will test that the contract can correctly approve a transfer of tokens.
- First by crediting an account and approve a sender then transfer more than the actual balance and expect a revert
- Then transfer more than the approved amount and expect a revert.
- Then less than approved amount and expect a success
- Then check that the correct event is triggered with the correct parameters: sender, receiver, amount
- Then check that the balance has been correctly modified for both parties

## :page_with_curl: ImmoTokenSale Contract:

### initializes the contract with the correct values:

- It will test that the contract has been initialized with a correct address and linked with the ImmoToken contract upon deployment

### Allows user to buy tokens

- Credit the contract with tokens from the ERC20 by the admin, then test if a buyer tries to buy tokens.
- Check if the right event is triggered with the correct parameters: name, buyer address, amount of tokens
- Check if the number of tokens sold is correctly incremented
- Check if the number of tokens left for sale is correctly decremented
- Check if the value sent is different than the correct amount required to buy 100 tokens and expect a revert
- Check if the buyer tries to buy more tokens than there is for sale and expect a revert

### Allows a seller user to present an offer to sell tokens

- Check if it records the correct number of tokens to sell
- Check if it records the correct price per token to sell
- Check if it triggers the correct even with the correct parameters

### Allows a buyer user to buy tokens from another user

- Check if it credits the buyer's balance with the correct number of tokens
- Check if it withdraws the seller's balance with the correct number of tokens
- Check if remaining tokens left in the offer is reduced with the correct number of tokens
- Check if the buyer tries to buy more than tokens in offer and expect a revert
- Check if the buyer tries to buy for a diffrent value than the price in offer and expect a revert

### Allows owner to end the sale and receive remaining tokens in the contract

- Check if not an owner tries to end sale and expect a revert
- Check if owner recieves remaining tokens
