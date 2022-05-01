//Getting all necessary elements
const profileimg = document.getElementById("profile-image");
const parentGallery = document.getElementById("grid-container");
const addbtn = document.getElementById("addbtn");
var imgs = window.localStorage.getItem("imagenes");

//Adding event to add Button
addbtn.addEventListener("click", addImage);

//Generating ID's
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

//Creando pictures list

function addImage() {
  let vector_inputs = document.querySelectorAll(".form-control");
  let url = document.getElementById("inputurl");
  let imgfile = document.getElementById("inputimg");
  let msg1 = document.getElementById("msg-1");
  let msg2 = document.getElementById("msg-2");
  let imagenes = {};
  vector_inputs.forEach((e) => {
    let value_input = e.value;
    imagenes = {
      ...imagenes,
      [e.name]: e.value,
    };
    console.log(imagenes);
    // if (value_input.length == 0) {
    //   msg1.classList.replace("hidden", "block");
    // }
  });

  if (url.value == "" && imgfile == "") {
    msg2.classList.replace("hidden", "block");
  }
  imagenes = {
    id: uuidv4(),
    ...imagenes,
    imagen: generatingUrl(),
  };
  let images = window.localStorage.getItem("imagenes");

  if (images == null) {
    window.localStorage.setItem("imagenes", JSON.stringify([imagenes]));
  } else {
    images = JSON.parse(images);

    images.push(imagenes);

    window.localStorage.setItem("imagenes", JSON.stringify(images));
    let imgmodel = getModelsPages();

    gallery(imgmodel[0]);
  }
}

//Creating grid (Gallery)
function gallery(imagenes) {
  if (imagenes.url != "") {
    template = `
                    <div id="${imagenes.id}" class="m-4 modify">
                    <img src="${imagenes.url}"/>
                        <div class="bg-cyan-500">
                                <p class="font-bold text-md text-white">${imagenes.tittle}</p>
                                <p class="text-sm text-white">${imagenes.description}</p>
                        </div>
                    
                    </div>
                  
                    
                `;
  } else {
    template = `
                    <div id="${imagenes.id}" class="m-4 modify">
                    <img src=${imagenes.imagen}/>
                        <div class="bg-cyan-500">
                                <p class="font-bold text-md text-white">${imagenes.tittle}</p>
                                <p class="text-sm text-white">${imagenes.description}</p>
                        </div>
                    
                    </div>
                  
                    
                `;
  }

  parentGallery.innerHTML = parentGallery.innerHTML + template;
}
if (imgs != null) {
  imgs = JSON.parse(imgs);

  imgs.forEach((img) => {
    gallery(img);
  });
}

//Pagination
function pagination() {
  let pagination = document.querySelector(".page");
  let models = JSON.parse(window.localStorage.getItem("imagenes"));
  let pages = Math.ceil(models.length / 3);
  let template = "";
  for (let i = 0; i < pages; i++) {
    template =
      template +
      ` <li>
                <a
                  href="#"
                  class="py-2 px-3 leading-tight text-cyan-500 bg-white border border-cyan-300 hover:bg-cyan-100 hover:text-cyan-700 dark:bg-cyan-800 dark:border-cyan-700 dark:text-cyan-400 dark:hover:bg-cyan-700 dark:hover:text-white"
                  >${i + 1}</a
                >
              </li>`;
  }
  pagination.innerHTML = template;
}
pagination();

function getModelsPages() {
  let models = JSON.parse(window.localStorage.getItem("imagenes"));
  let galleryPages = [];
  let model = [];
  let count = 0;

  for (let i = 0; i < models.length; i++) {
    model.push(models[i]);
    count++;
    if (count == 3 || i == models.length - 1) {
      count = 0;
      galleryPages.push(model);
      model = [];
    }
  }

  return galleryPages;
}
getModelsPages();

// let pagebutton = document.querySelector(".page");
// for (let i = 0; i < pagebutton.children.length; i++) {
//   const paginator = pagebutton.children[i].children[0];
//   paginator.addEventListener("click", () => {
//     let galleryPages = getModelsPages();
//     gallery(galleryPages[parseInt(paginator.innerText) - 1]);
//   });
// }

function generatingUrl() {
  let fileupload = document.getElementById("inputimg");
  let imagen = URL.createObjectURL(fileupload.files[0]);
  return imagen;
}
