## `ImmoTokenSale`

A plateform that handles Real Estate token exchange. You can use this contract for only the most basic simulation


This is an experimental contract, no real estate goods are linked to it


### `constructor(contract ImmoToken _tokenContract, uint256 _tokenPrice)` (public)

assign an admin, connect to the ImmoToken contract and a price for a single token


The Admin will never change


### `mul(uint256 a, uint256 b) → uint256 c` (internal)

Simple Multiply function



### `buyTokens(uint256 _numberOfTokens)` (public)

Allow user to buy ERC20 tokens.


check the Ether value is equal to price of tokens, there is enough tokens remaining, then run the transfer.


### `bookOffer(uint256 _numberOfTokens, uint256 _price) → bool` (public)

Allow user to put tokens for sale, it is booked as an offer {amount: number of tokens to sell, price: price per token}.


check that the seller has enough tokens to sell, then push the offer in an array of bookings then emit the corresponding event.


### `buyOffer(address _seller, uint256 _numberOfTokens, uint8 _index) → bool` (public)

Allow user to buy the tokens that are for sale


check there are enough tokens left for sale in the offer, he sends the correct ether value, then run the transfer


### `endSale()` (public)

Allow admin to end sale


checks the sender is admin and trnasfer the remaining tokens to the admin then selfdestruct


### `Sell(address _buyer, uint256 _amount)`





### `SellOffer(address _seller, uint256 _amount, uint256 _price, uint256 _index)`





