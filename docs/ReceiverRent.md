## `ReceiverRent`

Handles the transfer of rent to tokens holders. You can use this contract for only the most basic simulation


This is an experimental contract, no real estate goods are linked to it


### `claimPayment(uint256 _amount, uint256 _nonce, uint8 _v, bytes32 _r, bytes32 _s)` (public)

allow user to claim his rent payment


check that the nonce wasn't used, then identify ownership of signature that needs to match the owner of contract then transfer


### `getHashedMessage(address _receiver, uint256 _amount, uint256 _nonce) → bytes32` (public)

returns a hashed message to sign


hashe a message through a view function 


### `prefixed(bytes32 hash) → bytes32` (internal)

builds a prefixed hash to mimic the behavior of eth_sign.




### `shutdown()` (public)

destroy the contract and reclaim the leftover funds.



### `receive()` (external)

emit rent payment event when ether is received




### `RentPayment(address _sender, uint256 _amount)`





