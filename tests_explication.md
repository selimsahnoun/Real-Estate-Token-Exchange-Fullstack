# Tests explication

## ImmoToken Contract:

### initializes the contract with the correct values:

• It will test that the contract has been initialized with a correct title, version and symbol upon deployment

### allocates the initial supply after deployment

• It will test that the contract has been initialized with a correct number of tokens set up upon deployment and allocates them to the admin

### transfers token ownership

• It will test that the contract can correctly transfer tokens.
• First by trying a bigger amount than what is available to transfer and wait for a revert. Then a correct amount and expect a success.
• Then check that the correct event is triggered with the correct parameters: sender, receiver, amount.
• Then check that the balance has been correctly modified

### approves tokens for delegated transfer

• It will test that the contract can correctly approve a transfer of tokens.
• First by crediting an account and approve a sender then transfer more than the actual balance and expect a revert
• Then transfer more than the approved amount and expect a revert.
• Then less than approved amount and expect a success
• Then check that the correct event is triggered with the correct parameters: sender, receiver, amount
• Then check that the balance has been correctly modified for both parties
