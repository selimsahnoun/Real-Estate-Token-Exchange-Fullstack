pragma solidity ^0.5.16;

import './ImmoToken.sol';

contract ImmoTokenSale {
    address admin; 
    ImmoToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    event Sell(
        address _buyer,
        uint256 _amount
    );

    constructor(ImmoToken _tokenContract, uint256 _tokenPrice) public{
        //assign an admin
        admin = msg.sender;
        //token contract
        tokenContract = _tokenContract;
        //token price
        tokenPrice = _tokenPrice;
    }
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        if (a == 0) {
        return 0;
        }
        c = a * b;
        assert(c / a == b);
        return c;
    }
    function buyTokens(uint256 _numberOfTokens) public payable{
        //require that the value is equal to tokens 
        require(msg.value == mul(_numberOfTokens , tokenPrice));
        //require that there are enough tokens left to sale
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        //require transfer is successful
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        //keep track of tokens sold
        tokensSold += _numberOfTokens;
        //trigger sell event
        emit Sell(msg.sender,_numberOfTokens);
    }
    //Ending Token Sale
    function endSale() public {
        //require that only an admin can do this
        require(msg.sender == admin);
        //transfer the amount of tokens left to the admin
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
        //destroy contract
        selfdestruct(msg.sender);
    }
}