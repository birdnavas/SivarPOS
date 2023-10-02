// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract TaskContract{

    //contador(ID) registros.
    uint public taskCounter = 0;

    event TaskCreated(
        uint id,
        string title,
        string description,
        bool done,
        uint creatAt
    );

    event CambioDeMiTarea(uint _id, bool estado);
    

    //Definir lista
    struct Task{
        uint id;
        string title;
        string description;
        bool done;
        uint creatAt;
    }

    mapping ( uint256 => Task ) public tasks;

    function createTask(string memory _title, string memory _description) public {

        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);

        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);

    }

    function cambioEstado(uint _id) public {

        Task memory _task = tasks[_id];//buscando tarea

        _task.done = !_task.done;//Cambiando estado

        tasks[_id] = _task;//Actualiza elemento

        emit CambioDeMiTarea(_id, _task.done);
    }
}