// SPDX-License-Identifier: GPL-3.0
//import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

pragma solidity >=0.7.0 <0.9.0;
contract ReceiverPays {
    address owner = msg.sender;
    mapping(uint256 => bool) usedNonces;
    event RentPayment(address _sender, uint _amount);
    event RentSent(address _recoveredAddress, address _owner, bytes32 _message);

    constructor() payable {

    }

    function claimPayment(uint256 amount, uint256 nonce, bytes memory signature) public {
        //require(!usedNonces[nonce]);
        // this recreates the message that was signed on the client
        bytes32 message = prefixed(keccak256(abi.encodePacked(msg.sender, amount, nonce, this)));

       //require(recoverSigner(message, signature) == owner);
        emit RentSent(recoverSigner(message, signature), owner, message);
        //usedNonces[nonce] = true;
        //payable(msg.sender).transfer(amount);
    }

    function getHashedMessage(address reciever, uint256 amount, uint256 nonce) view public returns (bytes32) {
       return prefixed(keccak256(abi.encodePacked(reciever, amount, nonce, this)));
    }

     /// destroy the contract and reclaim the leftover funds.
    function shutdown() public {
        require(msg.sender == owner);
        selfdestruct(payable(msg.sender));
    }

    /// signature methods.
    function splitSignature(bytes memory sig)
        internal
        pure
        returns (uint8 v, bytes32 r, bytes32 s)
    {
        require(sig.length == 65);

        assembly {
            // first 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            // second 32 bytes.
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        pure
        returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);

       return ecrecover(message, v, r, s);

        //return ECDSA.recover(message, sig);
    }

    /// builds a prefixed hash to mimic the behavior of eth_sign.
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    // emit rent payment event when received
    receive() external payable {
        emit RentPayment(msg.sender, msg.value);
    }
}