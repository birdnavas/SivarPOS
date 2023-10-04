// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Productos{

    address public owner;
    uint256 public productCount;

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 stock;
        string expirationDate;
        uint256 price;
    }

    mapping(uint256 => Product) public products;

    event ProductAdded(uint256 productId, string name, string description, uint256 stock, string expirationDate, uint256 price, address seller);
    event ProductEdited(uint256 indexed productId, string newName, string newDescription, uint256 newStock, string newExpirationDate, uint256 newPrice);
    event ProductDeleted(uint256 indexed productId, string name, string description, uint256 stock, string expirationDate, uint256 price);
    event ProductPurchased(uint256 productId, string name, uint256 quantity, uint256 totalPrice, address buyer);

    constructor() {
        owner = msg.sender;
        productCount = 0;
    }

    // modifier onlyOwner() {
    //     require(msg.sender == owner, "Only the owner can call this function");
    //     _;
    // }

    function addProduct(string memory _name, string memory _description, uint256 _stock, string memory _expirationDate, uint256 _price) public {
        require(bytes(_name).length > 0, "Product name cannot be empty");
        require(bytes(_description).length > 0, "Product description cannot be empty");
        require(_stock > 0, "Product stock must be greater than 0");
        require(bytes(_expirationDate).length > 0, "Product expiration date cannot be empty");
        require(_price >= 0, "Product price cannot be negative"); // Updated validation

        productCount++;
        products[productCount] = Product(productCount, _name, _description, _stock, _expirationDate, _price);
        emit ProductAdded(productCount, _name, _description, _stock, _expirationDate, _price, msg.sender);
    }

    function editProduct(uint256 _productId, string memory _newName, string memory _newDescription, uint256 _newStock, string memory _newExpirationDate, uint256 _newPrice) public {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product storage product = products[_productId];
        require(msg.sender == owner, "Not authorized to edit this product");

        // Actualizar los detalles del producto
        product.name = _newName;
        product.description = _newDescription;
        product.stock = _newStock;
        product.expirationDate = _newExpirationDate;
        product.price = _newPrice;

        emit ProductEdited(_productId, _newName, _newDescription, _newStock, _newExpirationDate, _newPrice);
}

    function deleteProduct(uint256 _productId) public  {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product storage product = products[_productId];
        require(msg.sender == owner , "Not authorized to delete this product");

        // Guarda los detalles del producto antes de eliminarlo
        string memory name = product.name;
        string memory description = product.description;
        uint256 stock = product.stock;
        string memory expirationDate = product.expirationDate;
        uint256 price = product.price;

        // Elimina el producto
        delete products[_productId];

        emit ProductDeleted(_productId, name, description, stock, expirationDate, price);
}

    function purchaseProduct(uint256 _productId, uint256 _quantity) public payable {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product storage product = products[_productId];
        require(product.stock >= _quantity, "Not enough stock available");
        require(msg.value == product.price * _quantity, "Incorrect payment amount");

        // Transfer the payment to the seller
        payable(owner).transfer(msg.value);

        // Update the stock of the product
        product.stock -= _quantity;

        emit ProductPurchased(_productId, product.name, _quantity, msg.value, msg.sender);
    }

    function getProductDetails(uint256 _productId) public view returns (string memory name, string memory description, uint256 stock, string memory expirationDate, uint256 price){
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        Product storage product = products[_productId];
        return (product.name, product.description, product.stock, product.expirationDate, product.price);
    }

    function decrementarStock(uint256 _productId) public  {
    require(_productId > 0 && _productId <= productCount, "Invalid product ID");
    Product storage product = products[_productId];
    require(product.stock > 0, "No hay stock disponible para este producto");

    // Resta 1 al stock del producto
    product.stock--;

    emit ProductEdited(_productId, product.name, product.description, product.stock, product.expirationDate, product.price);
    }
}

// ! CODIGO DE BLOQUE PARA DOCKER: 20266

