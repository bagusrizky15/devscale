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
  const URL = "https://v1.appbackend.io/v1/rows/DUKu3IUDT9y9";
  const todos = await getData(URL);
  console.log(todos);

  todos.data.forEach((todo) => {
    const todoContainer = document.createElement("div");

    const titletContainer = document.createElement("h3");
    const descContainer = document.createElement("p");

    titletContainer.textContent = todo.title;
    descContainer.textContent = todo.description;

    todoContainer.append(titletContainer, descContainer);
    document.body.append(todoContainer);
  });
}

main();
