pragma solidity ^0.5.16;

contract ImmoToken {
    string public name = "Immo Token";
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
    
    constructor(uint256 _initialSupply) public  {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;   
    }

    function allowContract(address _contract) public returns (bool success){
        require(saleContract == address(0));
        saleContract = _contract;
        return true;
    }
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
    //Delegated transfer
        //Approve 
    function approve(address _spender, uint256 _value) public returns (bool success){
        //require sender has enough tokens to allow
        require(_value <= balanceOf[msg.sender]);
        // allowance
        allowance[msg.sender][_spender] = _value;
        //Approve event
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    //TransferFrom
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