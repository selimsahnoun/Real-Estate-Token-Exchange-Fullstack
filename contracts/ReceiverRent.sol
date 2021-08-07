// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;
contract ReceiverRent {
    address owner = msg.sender;
    mapping(uint256 => bool) usedNonces;
    event RentPayment(address _sender, uint256 _amount);

    constructor() payable {

    }

    function claimPayment(uint256 amount, uint256 nonce, uint8 v, bytes32 r, bytes32 s) public {
        require(!usedNonces[nonce]);
        // this recreates the message that was signed on the client
        bytes32 message = prefixed(keccak256(abi.encodePacked(msg.sender, amount, nonce, this)));
        require(ecrecover(message, v, r, s) == owner);
        usedNonces[nonce] = true;
        payable(msg.sender).transfer(amount);
    }

    function getHashedMessage(address reciever, uint256 amount, uint256 nonce) view public returns (bytes32) {
       return keccak256(abi.encodePacked(reciever, amount, nonce, this));
    }
    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

     /// destroy the contract and reclaim the leftover funds.
    function shutdown() public {
        require(msg.sender == owner);
        selfdestruct(payable(msg.sender));
    }
    // emit rent payment event when received
    receive() external payable {
        emit RentPayment(msg.sender, msg.value);
    }
}