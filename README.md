# Etherente : Marketplace of tokenized Real Estate Investment

## Important : This project is for educational purposes only and the source code shouldn't be use in production

## Description 

Etherente is a marketplace for buying and exchanging ERC 20 tokens of real estate :house_with_garden: investments in order to receive a rent each month powered by blockchain technology, inspired by the US RealT plateform.
Ownership in most real estate properties is determined by paper deeds, on the Ethereum blockchain, on the other hand, they are denominated by digital tokens. 
Etherente replaces paper deeds with digital tokens; a new mechanism for asset ownership, based on the Ethereum blockchain. 

#### Reminder: this project is for educational purposes only, no ownership is transmitted through this project.

## What is Tokenization?

‘Tokenization’ refers to the process of defining ownership over something as ownership in a digital token on Ethereum, which an ‘off-chain asset’ becomes represented ‘on-chain’. On-chain refers to being included in the Ethereum blockchain. 

## Features

As a user:
1.	JWT Authentication 
2.	Login and registration through hashing of the password with a salt generation
3.	Buy tokens sold on the platform from owner of platform 
4.	Buy tokens sold on the platform from users of the platform 
5.	Sell tokens on the platform for desired amount and the desired price
6.	Claim rent through a micro channel payment system (receive an amount to claim, a nonce and a signature)

As an admin:
1.	JWT Authentication 
2.	Login and registration through hashing of the password with a salt generation
3.	Put tokens for sale on the platform 
4.	Send Ethereum to micro channel payment system and then sign a message to send to token holders

	
## :rocket:  Installation Steps
1.	Clone Repository
	
First of all, create a new folder and execute the command below: 

	git clone https://github.com/selimsahnoun/Real-Estate-Token-Exchange-Fullstack.git
	
2.	Run truffle 

Go to the specified directory and then run truffle installation guide [here](https://www.trufflesuite.com/docs/truffle/getting-started/installation)
	
	cd Real-Estate-Token-Exchange-Fullstack
	truffle migrate 

3.	Run server

Go to specified directory and run the server

	cd etherente
	npm run serve

5.	Run the build
 
The server calls a built directory so run at the same time and same directory 

	npm run build

You'll need [Ganache](https://www.trufflesuite.com/ganache) and [Web3](https://web3js.readthedocs.io/en/v3.0.0-rc.5/) to operate the contracts 

## :computer: Built with

* Vue 3 js 
* SCSS/CSS
* Node JS 
* Mongo DB (Atlas)
* Solidty
* Truffle
* Web3 js
* JWT Library

