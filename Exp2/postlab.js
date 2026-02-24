const productsData = {
    products: [
        { id: 1, name: "Laptop", price: 55000, category: "Electronics" },
        { id: 2, name: "Headphones", price: 2500, category: "Electronics" },
        { id: 3, name: "Shoes", price: 3000, category: "Fashion" },
        { id: 4, name: "Watch", price: 1500, category: "Accessories" },
        { id: 5, name: "Phone", price: 40000, category: "Electronics" }
    ]
};

function displayProducts(products) {
    console.log("\n---- Product List ----");
    products.forEach(product => {
        console.log(
            `ID: ${product.id} | Name: ${product.name} | Price: ₹${product.price} | Category: ${product.category}`
        );
    });
}

function filterByMinPrice(products, minPrice) {
    return products.filter(product => product.price >= minPrice);
}

displayProducts(productsData.products);

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("\nEnter minimum price to filter: ", input => {
    const minPrice = Number(input);

    const filteredProducts = filterByMinPrice(productsData.products, minPrice);

    console.log(`\n---- Products with price >= ₹${minPrice} ----`);

    if (filteredProducts.length === 0) {
        console.log("No products found.");
    } else {
        displayProducts(filteredProducts);
    }

    readline.close();
});
