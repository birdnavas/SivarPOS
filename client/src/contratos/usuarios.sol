// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract UserRegistration {

    uint public userCounter = 0;

    event UserRegistered(
        uint id,
        string name,
        string walletAddress,
        bool registered,
        uint createdAt
    );

    event StatusChange(uint _id, bool status);

    struct User {
        uint id;
        string name;
        string walletAddress;
        bool registered;
        uint createdAt;
    }

    mapping(uint256 => User) public users;
    mapping(string => bool) public nameExists;
    mapping(string => bool) public walletAddressExists;

  function registerUser(string memory _name, string memory _walletAddress) public {
        require(!nameExists[_name], "Usuario con el mismo nombre ya registrado.");
        require(!walletAddressExists[_walletAddress], "Direccion de billetera ya registrada.");

        userCounter++;
        users[userCounter] = User(userCounter, _name, _walletAddress, false, block.timestamp);

        nameExists[_name] = true;
        walletAddressExists[_walletAddress] = true;

        emit UserRegistered(userCounter, _name, _walletAddress, false, block.timestamp); 
    }

function changeStatus(uint _id) public {
        User storage user = users[_id];

        user.registered = !user.registered;
        emit StatusChange(_id, user.registered);
    }
}
