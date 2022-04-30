//Obteniendo cada uno de los elementos necesarios
const profileimg = document.getElementById("profile-image");
const parentGallery = document.getElementById("grid-container");
const addbtn = document.getElementById("addbtn");
var imgs = window.localStorage.getItem("imagenes");

//Añadiendo evento de crear al botón
addbtn.addEventListener("click", addImage);

//Generando ID's
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

//Creando la lista de imagenes

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
    if (value_input.length == 0) {
      msg1.classList.replace("hidden", "block");
    }
  });
  if (url.value == "" && imgfile == "") {
    msg2.classList.replace("hidden", "block");
  }
  imagenes = {
    id: uuidv4(),
    ...imagenes,
  };
  let images = window.localStorage.getItem("imagenes");

  if (images == null) {
    window.localStorage.setItem("imagenes", JSON.stringify([imagenes]));
  } else {
    images = JSON.parse(images);

    images.push(imagenes);

    window.localStorage.setItem("imagenes", JSON.stringify(images));
  }
  //gallery(imagenes);
}

//Creando Grid de imágenes (Galería)
function gallery(imagenes) {
  let template = `
                    <div id="${imagenes.id}" class="bg-[url('${imagenes.url}')] m-4">
                        <div class="bg-low-opacity-black anim-bottomup">
                                <p class="font-bold text-md text-white">${imagenes.tittle}</p>
                                <p class="text-sm text-white">${imagenes.description}</p>
                        </div>
                        
                    </div>
                `;
  parentGallery.innerHTML = parentGallery.innerHTML + template;
}
if (imgs != null) {
  imgs = JSON.parse(imgs);

  imgs.forEach((img) => {
    gallery(img);
  });
}
