const connectApi = async () => {
  const res = await fetch("https://fortnite-api.com/v2/shop");
  const data = await res.json();
  

  const { date } = await data.data; //accede a la fecha de la tienda
  const {vbuckIcon} = await data.data //accede a la imagen de los pavos
 
  dateShop(date);

  const { entries } = await data.data; //accede al arreglo de todos los items
  console.log(entries);

  drawBundleCard(vbuckIcon, entries);

  drawTracks(vbuckIcon, entries)
};

const dateShop = (update) => {
  //imprime la fecha de la tienda en html
  const weekDate = document.getElementById("dateText");
  const dateNumber = document.getElementById("dateNumber");
  const dateMonth = document.getElementById("dateMonth");
  const lastUpdate = document.getElementById("lastUpdate");

  const date = new Date();
  weekDate.innerText = `${date.toLocaleDateString("es", { weekday: "long" })}/`;
  dateNumber.innerText = `${date.toLocaleDateString("es", {
    day: "numeric",
  })}/`;
  dateMonth.innerText = date.toLocaleDateString("es", { month: "long" });
  lastUpdate.innerText = `Last update: ${update}`;
};

const drawBundleCard = (vBuckIcon, items) => {
  //Imprime solo los bundles de la api
  let bundleShop = [];
  

  //Este for recorre todo el arreglo de items de la api y guarda en otro arreglo solo los que sean bundle
  items.forEach((i) => {
    if (i.bundle) {
      bundleShop.push(i);
    }
  });

  console.log("!!!", bundleShop)
  //esta parte imprime todos los elementos del arreglo en un article
  bundles.innerHTML= " "
  bundleShop.forEach((i) => {
    const bundleCard = document.createElement("article");
    bundleCard.classList.add("itemCard");
    bundleCard.innerHTML = `
    <img src="${i.bundle.image}" alt="bundle Fortnite">
    <h3 id="fortnite-bundle-name"> ${i.bundle.name}</h3>
    <h3 id="fortnite-bundle-price"> ${i.finalPrice} <img id= "vBucks" src="${vBuckIcon}"> </h3>
    
  `;
  bundles.appendChild(bundleCard)
  });
};



const drawTracks = (vBuckIcon, items) =>{
  let tracks = []
  items.forEach((i) => {
    if (i.tracks) {
      tracks.push(i);
    }
  });


  console.log("///", tracks)
  trackSection.innerHTML=" "  //Seccion de canciones html
  tracks.forEach((i) =>{
    const trackCard = document.createElement("article")
    trackCard.classList.add("itemCard")
    trackCard.innerHTML=
    `
    <img src="${i.tracks[0].albumArt}" alt="tracks Fortnite">
    <h3 id="fortnite-tracks-title"> ${i.tracks[0].title}</h3>
    <h3 id="fortnite-tracks-artist"> ${i.tracks[0].artist}</h3>
    <h3 id="fortnite-tracks-price"> ${i.regularPrice} <img id= "vBucks" src="${vBuckIcon}"> </h3>
    `
    trackSection.appendChild(trackCard)
  })
}

connectApi();
