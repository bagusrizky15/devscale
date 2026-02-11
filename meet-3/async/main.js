async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  const URL = "https://fakestoreapi.com/products";
  const products = await getData(URL);
  console.log(products);

  products.forEach((product) => {
    const newProductContainer = document.createElement("div");
    newProductContainer.classList.add("productCard");

    const newProductImage = document.createElement("img");
    const newProductTitle = document.createElement("h3");
    const newProductDesc = document.createElement("p");

    newProductImage.src = product.image;
    newProductTitle.textContent = product.title;
    newProductDesc.textContent = product.description;

    newProductContainer.append(
      newProductTitle,
      newProductDesc,
      newProductImage,
    );
    document.body.append(newProductContainer);
  });
}

main();
