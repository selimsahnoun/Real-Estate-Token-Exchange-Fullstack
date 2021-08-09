## `ImmoToken`

ERC 20 inspired token of real estate goods. You can use this contract for only the most basic simulation


This is an experimental contract, no real estate goods are linked to it


### `constructor(uint256 _initialSupply)` (public)

assign all tokens to admin


The Admin and token supply will never change


### `allowContract(address _contract) → bool success` (public)

unique contract that will be allowed to do tokens transfer


This contract is unique and no other contract will be allowed


### `transfer(address _to, uint256 _value) → bool success` (public)

transfer tokens from a holder to another 


check the balance is above value, then do the transfer from sender to receiver


### `approve(address _spender, uint256 _value) → bool success` (public)

delegate approval 


check the balance is above value, then emit approval

### `transferFrom(address _from, address _to, uint256 _value) → bool success` (public)

transfer from holder if approved


check the balance is above value, then emit transfer

### `offerTransfer(address _from, address _to, uint256 _value) → bool success` (public)

transfer tokens from seller to buyer according to an offer 


check that the contract is allowed to make transfer, then the balance and do the transfer



### `Transfer(address _from, address _to, uint256 _value)`





### `Approval(address _owner, address _spender, uint256 _value)`





