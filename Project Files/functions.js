// code by William Moore and Paul Murnane

function fetchData() {
  fetch("/getfavdata")
    .then((response) => response.json())
    .then((data) => {
      if (!scriptExecuted) {
        for (let i = 0; i < data.results.length; i++) {
          displayCar(i, data.results[i]);
        }
        scriptExecuted = true;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayCar(car_id, carData) {
  const carContainer = document.getElementById("carContainer");
  const carBox = document.createElement("div");
  carBox.classList.add("col");

  const imageUrl = carData.car_image;
  const carName = `${carData.car_year} ${carData.makename} ${carData.car_model}`;
  const carDesc = carData.car_desc;
  const carPrice = carData.car_price;
  const carID = carData.car_id;

  carBox.innerHTML = `
      <div class="card shadow-sm">
        <img class="bd-placeholder-img card-img-top" width="100%" height="100%" src="${imageUrl}" alt="${car_id}">
        <div class="card-body">
          <b><p class="card-text" id="carname${car_id}">${carName}</p></b>
          <p class="card-text" id="desc${car_id}">${carDesc}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <a type="button" class="btn btn-sm btn-outline-secondary" href="/details?carID=${carData.car_id}" style="color: rgb(135, 218, 135); border-color: green;">View</a>
              <a href="checkout" class="btn btn-sm btn-outline-secondary" style="color: rgb(135, 218, 135); border-color: green;">Favourite</a>
            </div>
            <small class="text-body-secondary" id="price${car_id}">Price: $${carPrice}</small>
          </div>
        </div>
      </div>
    `;

  carContainer.appendChild(carBox);
}
