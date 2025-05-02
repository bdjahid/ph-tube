console.log("added");

const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayData(data.categories))
    .catch((error) => console.error(error));
};

const displayData = (data) => {
  const categoryContainer = document.getElementById("category");
  //   console.log(data);
  data.forEach((item) => {
    // console.log(item);
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    categoryContainer.appendChild(button);
  });
};

const loadDataVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayDataVideos(data.videos))
    .catch((error) => console.error(error));
};

const displayDataVideos = (data) => {
  const videosContainer = document.getElementById("videos");
  data.forEach((item) => {
    console.log(item);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
  <figure class="h-[200px]">
    <img
    class="h-full w-full object-cover"
      src=${item.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
     <img class="w-10 h-10 rounded-full object-cover" src=${item.authors[0].profile_picture}/>
   </div>

   <div>
   <h2 class="font-bold">${item.title}</h2>
    <div class="flex items-center gap-2">
      <p class="text-gray-400">${item.authors[0].profile_name}</p>
        <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>
    </div>
   </div>
   
  </div>
    
    `;

    videosContainer.appendChild(card);
  });
};

loadDataVideos();
loadData();
