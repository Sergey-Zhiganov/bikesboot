let bikes = [];

document.addEventListener('DOMContentLoaded', function () {
  const bikeForm = document.getElementById('bikeForm');
  
  bikeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const nameInput = document.getElementById("name");
    const typeInput = document.getElementById("type");
    const weightInput = document.getElementById("weight");
    
    const name = nameInput.value.trim();
    const type = typeInput.value.trim();
    const weight = weightInput.value.trim();
    
    if (name === "" || type === "" || weight === "") {
      alert("Ошибка: заполните все поля");
      return;
    } else if (isNaN(weight) || weight <= 0) {
      alert("Ошибка: вес должен быть числом больше 0");
      return;
    } else if (/^\d+$/.test(name) || /^\d+$/.test(type)) {
      alert("Ошибка: Название и тип не могут состоять только из цифр");
      return;
    }
    
    const newBike = {
      name: name,
      type: type,
      weight: weight
    };
    
    bikes.push(newBike);
    
    nameInput.value = "";
    typeInput.value = "";
    
    displayBikes();
  });
});

function removeBike(index) {
  bikes.splice(index, 1);
  displayBikes();
}

function editBikeForm(index) {
  const bike = bikes[index];
  const bikeDiv = document.getElementById(`bike-${index}`);
  
  const editForm = document.createElement("form");
  editForm.innerHTML = `
    <div class="form-group">
      <label for="editName">Название:</label>
      <input type="text" class="form-control" id="editName" value="${bike.name}" required>
    </div>
    <div class="form-group">
      <label for="editType">Тип:</label>
      <input type="text" class="form-control" id="editType" value="${bike.type}" required>
    </div>
    <div class="form-group">
      <label for="editWeight">Вес:</label>
      <input type="number" class="form-control" id="editWeight" value="${bike.weight}" required>
    </div>
    <button type="button" class="btn btn-primary" onclick="updateBike(${index})">Update</button>
  `;
  
  bikeDiv.appendChild(editForm);
}

function updateBike(index) {
  const newName = document.getElementById(`editName`).value.trim();
  const newType = document.getElementById(`editType`).value.trim();
  const newWeight = document.getElementById(`editWeight`).value.trim();
  
  if (newName === "" || newType === "" || newWeight === "") {
    alert("Ошибка: заполните все поля");
    return;
  } else if (isNaN(newWeight) || newWeight <= 0) {
    alert("Ошибка: вес должен быть числом больше 0");
    return;
  } else if (/^\d+$/.test(newName) || /^\d+$/.test(newType)) {
    alert("Ошибка: Название и тип не могут состоять только из цифр");
    return;
  }
  
  bikes[index] = {
    name: newName,
    type: newType,
    weight: newWeight
  };
  
  displayBikes();
}

function displayBikes() {
  const bikesList = document.getElementById("bikes-list");
  bikesList.innerHTML = "";
  
  bikes.forEach((bike, index) => {
    const bikeDiv = document.createElement("div");
    bikeDiv.id = `bike-${index}`;
    bikeDiv.classList.add("bike-item", "card", "m-2");
    
    const bikeBody = document.createElement("div");
    bikeBody.classList.add("card-body");
    
    const namePara = document.createElement("p");
    namePara.textContent = `Название: ${bike.name}`;
    
    const typePara = document.createElement("p");
    typePara.textContent = `Тип: ${bike.type}`;

    const weightPara = document.createElement("p");
    weightPara.textContent = `Вес: ${bike.weight}`;
    
    const editBtn = document.createElement("button");
    editBtn.textContent = "Изменить";
    editBtn.classList.add("btn", "btn-primary", "mr-2");
    editBtn.onclick = () => editBikeForm(index);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.onclick = () => removeBike(index);
    
    bikeBody.appendChild(namePara);
    bikeBody.appendChild(typePara);
    bikeBody.appendChild(weightPara);
    bikeBody.appendChild(editBtn);
    bikeBody.appendChild(deleteBtn);
    
    bikeDiv.appendChild(bikeBody);
    
    bikesList.appendChild(bikeDiv);
  });
}
