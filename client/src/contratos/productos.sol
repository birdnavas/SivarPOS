// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Productos {

    address public owner;
    uint256 public productCount;

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 stock;
        string expirationDate;
        string price; // Changed to string
        string url;
    }

    mapping(uint256 => Product) public products;

    event ProductAdded(uint256 productId, string name, string description, uint256 stock, string expirationDate, string price, string url, address seller);
    event ProductEdited(uint256 indexed productId, string newName, string newDescription, uint256 newStock, string newExpirationDate, string newPrice, string newUrl);
    event ProductDeleted(uint256 indexed productId, string name, string description, uint256 stock, string expirationDate, string price, string url);
    event StockDecremented(uint256 indexed productId, uint256 newStock);

    constructor() {
        owner = msg.sender;
        productCount = 0;
    }

    function addProduct(string memory _name, string memory _description, uint256 _stock, string memory _expirationDate, string memory _price, string memory _url) public {
        require(bytes(_name).length > 0, "Product name cannot be empty");
        require(bytes(_description).length > 0, "Product description cannot be empty");
        require(_stock > 0, "Product stock must be greater than 0");
        require(bytes(_expirationDate).length > 0, "Product expiration date cannot be empty");
        require(bytes(_price).length > 0, "Product price cannot be empty"); // Price is now a string

        productCount++;
        products[productCount] = Product(productCount, _name, _description, _stock, _expirationDate, _price, _url);
        emit ProductAdded(productCount, _name, _description, _stock, _expirationDate, _price, _url, msg.sender);
    }

    function editProduct(uint256 _productId, string memory _newName, string memory _newDescription, uint256 _newStock, string memory _newExpirationDate, string memory _newPrice, string memory _newUrl) public {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product storage product = products[_productId];

        product.name = _newName;
        product.description = _newDescription;
        product.stock = _newStock;
        product.expirationDate = _newExpirationDate;
        product.price = _newPrice;
        product.url = _newUrl;

        emit ProductEdited(_productId, _newName, _newDescription, _newStock, _newExpirationDate, _newPrice, _newUrl);
    }

    function deleteProduct(uint256 _productId) public {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product storage product = products[_productId];

        string memory name = product.name;
        string memory description = product.description;
        uint256 stock = product.stock;
        string memory expirationDate = product.expirationDate;
        string memory price = product.price; // Price is now a string
        string memory url = product.url;

        delete products[_productId];

        emit ProductDeleted(_productId, name, description, stock, expirationDate, price, url);
    }

    function decrementarStock(uint256 _productId) public {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product storage product = products[_productId];
        require(product.stock > 0, "No hay stock disponible para este producto");

        product.stock--;

        emit StockDecremented(_productId, product.stock);
    }
}