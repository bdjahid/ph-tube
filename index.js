function gettimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minutes = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minutes} minutes ${remainingSecond} second ago`;
}

const loadDataCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // remove
      removeActiveClass();

      // active
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayDataVideos(data.category);
    })
    .catch((error) => console.error(error));
};

const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayData(data.categories))
    .catch((error) => console.error(error));
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  console.log("btn removes");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

const displayData = (data) => {
  const categoryContainer = document.getElementById("category");
  //   console.log(data);
  data.forEach((item) => {
    // console.log(item);
    const divContainer = document.createElement("div");
    divContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadDataCategory(${item.category_id})" class="btn category-btn">
    ${item.category}
    </button>
    `;

    categoryContainer.appendChild(divContainer);
  });
};

const loadDataVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayDataVideos(data.videos))
    .catch((error) => console.error(error));
};

// videoDetails()

const videoDetails = async (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  displayDetails(data.video);
};

const displayDetails = (video) => {
  // console.log(video);
  // console.log(video?.description);
  const detailsContainer = document.getElementById("modalDetails");
  detailsContainer.innerHTML = `
<img src=${video.thumbnail}/>
<p>${video.description}</p>
<p>${video.title}</p>
`;
  // way -1
  document.getElementById("showModal").click();
  // way-2
  // document.getElementById("customModal").showModal();
};

const displayDataVideos = (data) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";

  if (data.length == 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="min-h-[300px] flex justify-center items-center>
    <img src="./assets/Icon.png"/>
    <p class="text-red-500">HERE NO CONTENT</p>
    </div>
    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }
  data.forEach((item) => {
    console.log(item);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
  <figure class="h-[200px] relative">
    <img
    class="h-full w-full object-cover"
      src=${item.thumbnail}
      alt="Shoes" />

      ${
        item.others.posted_date?.length == 0
          ? ""
          : ` <span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${gettimeString(
              item.others.posted_date
            )}</span>`
      }
     
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
     <img class="w-10 h-10 rounded-full object-cover" src=${
       item.authors[0].profile_picture
     }/>
   </div>

   <div>
   <h2 class="font-bold">${item.title}</h2>
    <div class="flex items-center gap-2">
      <p class="text-gray-400">${item.authors[0].profile_name}</p>
      ${
        item.authors[0].verified == true
          ? ` <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
          : ""
      }
    </div>
   </div>
  <div>
   <button onclick="videoDetails('${
     item.video_id
   }')" class="bg-green-300 btn">Details</button>
   </div>
  </div>
    
    `;

    videosContainer.appendChild(card);
  });
};

document.getElementById("search-videos").addEventListener("keyup", (e) => {
  console.log(e.target.value);
  loadDataVideos(e.target.value);
});

loadDataVideos();
loadData();
