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
        users[userCounter] = User(userCounter, _name, _walletAddress, true, block.timestamp);

        nameExists[_name] = true;
        walletAddressExists[_walletAddress] = true;

        emit UserRegistered(userCounter, _name, _walletAddress, true, block.timestamp);
    }

    function changeStatus(uint _id) public {
        User storage user = users[_id];
        require(user.registered, "El usuario ya se ha registrado.");
        
        user.registered = false;
        emit StatusChange(_id, false);
    }
}


// ! VIEJO CONTRATO
// pragma solidity ^0.8.16;

// contract TaskContract{

//     //contador(ID) registros.
//     uint public taskCounter = 0;

//     event TaskCreated(
//         uint id,
//         string title,
//         string description,
//         bool done,
//         uint creatAt
//     );

//     event CambioDeMiTarea(uint _id, bool estado);
    

//     //Definir lista
//     struct Task{
//         uint id;
//         string title;
//         string description;
//         bool done;
//         uint creatAt;
//     }

//     mapping ( uint256 => Task ) public tasks;

//     function createTask(string memory _title, string memory _description) public {

//         taskCounter++;
//         tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);

//         emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);

//     }

//     function cambioEstado(uint _id) public {

//         Task memory _task = tasks[_id];//buscando tarea

//         _task.done = !_task.done;//Cambiando estado

//         tasks[_id] = _task;//Actualiza elemento

//         emit CambioDeMiTarea(_id, _task.done);
//     }
// }

// // ! NUMERO DE BLOQUE PARA DOCKER: 20386