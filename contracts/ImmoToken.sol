// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.6;

/// @title ERC 20 inspired token of real estate goods
/// @author Selim Sahnoun
/// @notice ERC 20 inspired token of real estate goods. You can use this contract for only the most basic simulation
/// @dev This is an experimental contract, no real estate goods are linked to it

contract ImmoToken {
   
    string public title = "55 57 rue du Faubourg Saint Honore 75008";
    string public symbol = "Stone";
    string public version = "Immo Token v1.0";
    uint256 public totalSupply;
    address public saleContract;
    
    event Transfer(
        address indexed _from, 
        address indexed _to, 
        uint256 _value
        );
    event Approval(
        address indexed _owner, 
        address indexed _spender, 
        uint256 _value
        );
 
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address  => uint256)) public allowance; //offre de vente;
    
    /// @notice assign all tokens to admin
    /// @dev The Admin and token supply will never change
    /// @param _initialSupply Amount of token to be initialized in the contract, it will never change

    constructor(uint256 _initialSupply)  {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;   
    }
    
    /// @notice unique contract that will be allowed to do tokens transfer
    /// @dev This contract is unique and no other contract will be allowed
    /// @param _contract ImmoTokenSale contract 

    function allowContract(address _contract) public returns (bool success){
        require(saleContract == address(0));
        saleContract = _contract;
        return true;
    }
    
    /// @notice transfer tokens from a holder to another 
    /// @dev check the balance is above value, then do the transfer from sender to receiver
    /// @param _to address of receiver
    /// @param _value tokens to transfer

    function transfer(address _to, uint256 _value) public returns (bool success) {
        // revert if sender credit is not enough
        require(balanceOf[msg.sender] >= _value);
        // transfer to the recipient from the sender 
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        // transfer event
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    /// @notice delegate approval 
    /// @dev check the balance is above value, then emit approval
    function approve(address _spender, uint256 _value) public returns (bool success){
        //require sender has enough tokens to allow
        require(_value <= balanceOf[msg.sender]);
        // allowance
        allowance[msg.sender][_spender] = _value;
        //Approve event
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /// @notice transfer from holder if approved
    /// @dev check the balance is above value, then emit transfer
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        //require _from has enough tokens
        require(_value <= balanceOf[_from]);
        //require allowance is big enough
        require(_value <= allowance[_from][msg.sender]);
        //change the balance
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        //update the allowance
        allowance[_from][msg.sender] -= _value;
        //transfer event
        emit Transfer(_from, _to, _value);
        //return a boolean
        return true;
    } 

    /// @notice transfer tokens from seller to buyer according to an offer 
    /// @dev check that the contract is allowed to make transfer, then the balance and do the transfer
    /// @param _from address of seller
    /// @param _to address of receiver
    /// @param _value number of tokens to transfer
    
 function offerTransfer(address _from, address _to, uint256 _value) public returns (bool success){
        //msg.sender needs to be the allowed saleContract
        require(msg.sender == saleContract);
        //require _from has enough tokens
        require(_value <= balanceOf[_from]);
        //change the balance
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        //transfer event
        emit Transfer(_from, _to, _value);
        //return a boolean
        return true;
    } 
  
} 