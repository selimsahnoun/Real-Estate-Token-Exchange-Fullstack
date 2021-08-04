// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

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
    struct Offer{
        uint256 amount;
        uint256 price;
    }
    event SellOffer(
        address _seller,
        uint256 _amount,
        uint256 _price
   );

    mapping(address => Offer[]) public offerBooking;

    constructor(ImmoToken _tokenContract, uint256 _tokenPrice) {
        //assign an admin
        admin = msg.sender;
        //token contract
        tokenContract = _tokenContract;
        //token price
        tokenPrice = _tokenPrice;
    }
      /** @dev Multiply function 
      */
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        if (a == 0) {
        return 0;
        }
        c = a * b;
        assert(c / a == b);
        return c;
    }
    /** @dev Allow user to buy ERC20 tokens.
      * @param _numberOfTokens Number of Tokens the user decided to buy.
      */
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
/** @dev Allow user to put tokens for sale, it is booked as an offer {amount: number of tokens to sell, price: price per token}.
      * @param _numberOfTokens number of tokens to sell.
      * @param _price price per token.
      * @return boolean indicating the success of the booking.
      */
    function bookOffer(uint256 _numberOfTokens, uint256 _price) public returns (bool) {
        //require msg.sender has enough tokens
        require(_numberOfTokens <= tokenContract.balanceOf(msg.sender));
        //book the offer
        offerBooking[msg.sender].push(Offer({amount:_numberOfTokens,price:_price}));
        //emit the event
        emit SellOffer(msg.sender, _numberOfTokens, _price);
        return true;
    }
/** @dev Allow user to buy the tokens that are for sale
      * @param _seller address of the seller.
      * @param _numberOfTokens number of tokens the buyer wants to buy.
      * @param _index index of the offer in the offerBooking array.
      * @return boolean indicating the success of the transaction.
      */
    function buyOffer(address _seller, uint256 _numberOfTokens, uint8 _index) public payable returns (bool){
        //require that there are enough tokens left to sale 
        require(_numberOfTokens <= offerBooking[_seller][_index].amount);
        //require that the value is equal to tokens 
        require(msg.value == mul(_numberOfTokens , offerBooking[_seller][_index].price));
        // transfer to the buyer from the seller
        require(tokenContract.offerTransfer(_seller, msg.sender, _numberOfTokens));
        offerBooking[_seller][_index].amount-= _numberOfTokens;
        return true;
    }
    //Ending Token Sale
    function endSale() public {
        //require that only an admin can do this
        require(msg.sender == admin);
        //transfer the amount of tokens left to the admin
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
        //destroy contract
        selfdestruct(payable(msg.sender));    
    }
}