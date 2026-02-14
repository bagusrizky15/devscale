const URL = "https://v1.appbackend.io/v1/rows/GaH6DIALofj8";

async function getData() {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
}

async function main() {
  const datas = await getData();

  if (datas.data.length == 0) {
    const emptyMessage = document.createElement("p")
    emptyMessage.textContent = "Belum ada data"
    document.body.append(emptyMessage)

    return
  }

  datas.data.forEach((data) => {
    const itemContainer = document.createElement("div");
    const descContainer = document.createElement("span");
    const priceContainer = document.createElement("span");
    const divider = document.createElement("br");

    descContainer.textContent = data.description + " ";
    priceContainer.textContent = "Rp." + data.price;

    itemContainer.append(divider, descContainer, priceContainer);
    document.body.append(itemContainer);
  });
}

main();

const descInput = document.getElementById("desc");
const priceInput = document.getElementById("price");
const addButton = document.getElementById("submit");

addButton.addEventListener("click", async () => {
  try {
    const descValue = descInput.value;
    const priceValue = priceInput.value;

    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          description: descValue,
          price: priceValue,
        },
      ]),
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
});
