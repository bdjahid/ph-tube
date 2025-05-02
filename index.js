console.log("added");

const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayData(data.categories))
    .catch((error) => console.error(error));
};

const displayData = (data) => {
  const categoryContainer = document.getElementById("category");
  console.log(data);
  data.forEach((item) => {
    console.log(item);
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    categoryContainer.appendChild(button);
  });
};
loadData();
