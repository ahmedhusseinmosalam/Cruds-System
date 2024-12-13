var namee = document.getElementById("namee");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var count = document.getElementById("count");
var category = document.getElementById("category");
var searchInput = document.getElementById("searchInput");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var total = document.getElementById("total");
var index = 0;
var inputs = document.querySelectorAll('.bgInput');
for(var i = 0 ; i < inputs.length ; i++)
  {
    inputs[i].addEventListener('input',function()
    {
      validationInput(this)
    })
  };
  for(var i = 0 ; i < inputs.length ; i++)
    {
      inputs[i].addEventListener('keyup',function()
      {
        getTotal()
      })
    };
  btnAdd.addEventListener('click',function()
  {
    addProduct()
  });
  btnUpdate.addEventListener('click',function()
  {
    Update()
  });
  var searchTitle = document.getElementById('searchTitle');
  searchTitle.addEventListener('click',function()
  {
    searchByName()
  });
  searchTitle.addEventListener('keypress',function()
  {
    searchByName()
  });
  var searchCategory = document.getElementById('searchCategory');
  searchCategory.addEventListener('click',function()
  {
    searchByCategory()
  });
  searchCategory.addEventListener('keypress',function()
  {
    searchByCategory()
  });


var productList;
if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  display();
} else {
  productList = [];
}
function addProduct() {
  if (
    validationInput(namee) &&
    validationInput(price) &&
    validationInput(taxes) &&
    validationInput(ads) &&
    validationInput(discount) &&
    validationInput(count) &&
    validationInput(category) == true
  ) {
    var product = {
      name: namee.value,
      price: Number(price.value),
      taxes: Number(taxes.value),
      ads: Number(ads.value),
      discount: Number(discount.value),
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };
    if (product.count > 1) {
      for (var i = 0; i < product.count; i++) {
        productList.push(product);
      }
    } else {
      productList.push(product);
    }
    display();
    localStorage.setItem("products", JSON.stringify(productList));
    clear();
  }
}
function clear() {
  namee.value = null;
  price.value = null;
  taxes.value = null;
  ads.value = null;
  discount.value = null;
  count.value = null;
  category.value = null;
  total.innerHTML = "total  ";
  namee.classList.remove("is-valid");
  price.classList.remove("is-valid");
  taxes.classList.remove("is-valid");
  ads.classList.remove("is-valid");
  discount.classList.remove("is-valid");
  count.classList.remove("is-valid");
  category.classList.remove("is-valid");
  total.classList.remove("bg-success");
  total.classList.add("bg-danger");
  searchInput.value = null;
}
function display() {
  var box = "";
  for (var i = 0; i < productList.length; i++) {
    box += `     <tr>
                    <td>${i}</td>
                    <td>${productList[i].name}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].taxes}</td>
                    <td>${productList[i].ads}</td>
                    <td>${productList[i].discount}</td>
                    <td>${productList[i].total}</td>
                    <td>${productList[i].category}</td>
                    <td>
                        <button class="btn btn-outline-warning" type="button" onclick="setFormUpdate(${i})">update</button>
                        <button class="btn btn-outline-danger" type="button" onclick="deleteItem(${i})">delete</button>
                    </td>
                </tr>`;
  }
  document.getElementById("dataShow").innerHTML = box;
  var btnDelete = document.getElementById("btnDelete");
  if (productList.length > 0) {
    btnDelete.innerHTML = `<button class="btn btnColor rounded-pill fw-bold text-body" type="button" onclick="deleteAll()">Delete All (${productList.length})</button>`;
  } else {
    btnDelete.innerHTML = " ";
  }
}

function setFormUpdate(indexElement) {
  namee.value = productList[indexElement].name;
  price.value = productList[indexElement].price;
  taxes.value = productList[indexElement].taxes;
  ads.value = productList[indexElement].ads;
  discount.value = productList[indexElement].discount;
  count.classList.add("d-none");
  getTotal();
  category.value = productList[indexElement].category;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
  index = indexElement;
}
function Update(index) {
  if (
    validationInput(namee) &&
    validationInput(price) &&
    validationInput(taxes) &&
    validationInput(ads) &&
    validationInput(discount) &&
    validationInput(category) == true
  ) {
    var product = {
      name: namee.value,
      price: Number(price.value),
      taxes: Number(taxes.value),
      ads: Number(ads.value),
      discount: Number(discount.value),
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };

    productList.splice(index, 1, product);
    display();
    localStorage.setItem("products", JSON.stringify(productList));
    btnAdd.classList.remove("d-none");
    btnUpdate.classList.add("d-none");
    count.classList.remove("d-none");
    clear();
  }
}
function deleteItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  display();
}
function deleteAll() {
  localStorage.clear();
  productList.splice(0);
  display();
}
function searchByName() {
  var term = searchInput.value;
  var box = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true)
      box += `     <tr>
                    <td>${i}</td>
                    <td>${productList[i].name}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].taxes}</td>
                    <td>${productList[i].ads}</td>
                    <td>${productList[i].discount}</td>
                    <td>${productList[i].total}</td>
                    <td>${productList[i].category}</td>
                    <td>
                        <button class="btn btn-outline-warning" type="button" onclick="setFormUpdate(${i})">update</button>
                        <button class="btn btn-outline-danger" type="button" onclick="deleteItem(${i})">delete</button>
                    </td>
                </tr>`;
  }
  document.getElementById("dataShow").innerHTML = box;
  clear();
}
function searchByCategory() {
  var term = searchInput.value;
  var box = "";
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].category.toLowerCase().includes(term.toLowerCase()) == true
    )
      box += `     <tr>
                    <td>${i}</td>
                    <td>${productList[i].name}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].taxes}</td>
                    <td>${productList[i].ads}</td>
                    <td>${productList[i].discount}</td>
                    <td>${productList[i].total}</td>
                    <td>${productList[i].category}</td>
                    <td>
                        <button class="btn btn-outline-warning" type="button" onclick="setFormUpdate(${i})">update</button>
                        <button class="btn btn-outline-danger" type="button" onclick="deleteItem(${i})">delete</button>
                    </td>
                </tr>`;
  }
  document.getElementById("dataShow").innerHTML = box;
}

function getTotal() {
  if (price.value != "") {
    var result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = ` ${result}`;
    total.classList.add("bg-success");
    total.classList.remove("bg-danger");
  } else {
    total.classList.add("bg-danger");
    total.classList.remove("bg-success");
  }
}
function validationInput(element) {
  var text = element.value;
  var regex = {
    namee: /^[a-zA-Z]{2,}\s?\w*\s?\w*$/,
    price: /^[0-9]+$/,
    taxes: /^[0-9]+$/,
    ads: /^[0-9]+$/,
    discount: /^[0-9]+$/,
    count: /^[0-9]+$/,
    category: /^(Electrical appliances|Mobiles|electronics|Adaptations)$/,
  };
  if (regex[element.id].test(text) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
