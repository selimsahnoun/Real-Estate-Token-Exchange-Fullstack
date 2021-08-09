// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

/// @title Handles the transfer of rent to tokens holders
/// @author Selim Sahnoun
/// @notice Handles the transfer of rent to tokens holders. You can use this contract for only the most basic simulation
/// @dev This is an experimental contract, no real estate goods are linked to it

contract ReceiverRent {
    address owner = msg.sender;
    mapping(uint256 => bool) usedNonces;
    event RentPayment(address _sender, uint256 _amount);

    /// @notice allow user to claim his rent payment
    /// @dev check that the nonce wasn't used, then identify ownership of signature that needs to match the owner of contract then transfer
    /// @param _amount amount to be transferred
    /// @param _nonce single use nonce to not withdraw twice
    /// @param _v, _r, _s signature parameters to identify ownership
    function claimPayment(uint256 _amount, uint256 _nonce, uint8 _v, bytes32 _r, bytes32 _s) public {
        require(!usedNonces[_nonce]);
        // this recreates the message that was signed on the client
        bytes32 message = prefixed(keccak256(abi.encodePacked(msg.sender, _amount, _nonce, this)));
        require(ecrecover(message, _v, _r, _s) == owner);
        usedNonces[_nonce] = true;
        payable(msg.sender).transfer(_amount);
    }
    /// @notice returns a hashed message to sign
    /// @dev hashe a message through a view function 
    /// @param _receiver address to receive rent
    /// @return hashed 32 bytes message
    function getHashedMessage(address _receiver, uint256 _amount, uint256 _nonce) view public returns (bytes32) {
       return keccak256(abi.encodePacked(_receiver, _amount, _nonce, this));
    }

    /// @notice builds a prefixed hash to mimic the behavior of eth_sign.
    /// @return hashed 32 bytes message with prefix
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    /// @notice destroy the contract and reclaim the leftover funds.
    function shutdown() public {
        require(msg.sender == owner);
        selfdestruct(payable(msg.sender));
    }
    /// @notice emit rent payment event when ether is received
    receive() external payable {
        emit RentPayment(msg.sender, msg.value);
    }
}