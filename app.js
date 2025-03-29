const connectApi = async () => {
  const res = await fetch("https://fortnite-api.com/v2/shop");
  const data = await res.json();

  const { date } = await data.data; //accede a la fecha de la tienda
  dateShop(date);

  const { entries } = await data.data; //accede al arreglo de todos los items
  console.log(entries);

  drawBundleCard(entries);
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

const drawBundleCard = (items) => {
  //Imprime solo los bundles de la api
  let bundleShop = [];
  

  //Este for recorre todo el arreglo de items de la api y guarda en otro arreglo solo los que sean bundle
  items.forEach((i) => {
    if (i.bundle) {
      bundleShop.push(i);
    }
  });

  shop.innerHTML=" "
  bundleShop.forEach((i) => {
    console.log(i)
    const bundleCard = document.createElement("article");
    bundleCard.classList.add("bundleCard");
    bundleCard.innerHTML = `
    <img src="${i.bundle.image}" alt="bundle Fortnite">
    <h3 id="fortnite-name"> ${i.bundle.name}</h3>
  `;
  shop.appendChild(bundleCard)
  });
};

connectApi();

/*<img src="" alt="">

<h2 id="fortnite-price"></h2>*/
