const URL = "https://v1.appbackend.io/v1/rows/GaH6DIALofj8"

async function getData(URL) {
    try {
        const res = await fetch(URL)
        const data = await res.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

async function main() {
    const datas = await getData(URL)
    
    datas.data.forEach((data) => {
        console.log(data)

        const itemContainer = document.createElement("div")
        const descContainer = document.createElement("span")
        const priceContainer = document.createElement("span")
        const divider = document.createElement("br")

        descContainer.textContent = data.description + " "
        priceContainer.textContent = data.price

        itemContainer.append(divider, descContainer, priceContainer)
        document.body.append(itemContainer)
    })
}

main()

const descInput = document.getElementById("desc")
const priceInput = document.getElementById("price")
const addButton = document.getElementById("submit")

addButton.addEventListener("click", async () => {
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

  window.location.reload()
});