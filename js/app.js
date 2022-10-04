let filterBrand = document.getElementById("filter-brand");
let filterType = document.getElementById("filter-type");
let filterName = document.getElementById("filter-name");
let filterSort = document.getElementById("sort-type");

(async () => {
  let response = await fetch("data/products.json");

  loadProducts(await response.json(), filterSort.value);
})();

let productElement = document.querySelector(".catalog");

let productBrands = [];
let productTypes = [];
let products;
let productChilds;

function loadProducts(json, sortType) {
  const productsView = sortProducts(json, sortType)
    .map((product) => productItem(product))
    .join("");

  productElement.innerHTML = productsView;

  productChilds = Array.from(document.querySelectorAll(".product"));

  loadComboOptions(filterBrand, productBrands.uniq().sort());
  loadComboOptions(filterType, productTypes.uniq().sort());

  products = json;
}

function loadComboOptions(combo, data) {
  data.map((item) =>
    combo.insertAdjacentHTML("beforeend", `<option>${item}</option>`)
  );
}

//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
  productBrands = productBrands.concat([product.brand]);
  productTypes = productTypes.concat([product.product_type]);

  return `<div class="product" data-name="${product.name}" data-brand="${
    product.brand
  }" data-type="${product.product_type}" tabindex="${product.id}">
  <figure class="product-figure">
    <img src="${product.image_link}" width="215" height="215" alt="${
    product.name
  }" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${product.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${
      product.brand
    }</span>
<span class="product-brand background-price">R$ ${(
    parseFloat(product.price) * 5.5
  ).toFixed(2)}</span></div>
  </section>
  <section class="product-details">
  ${loadDetails(product)}
  </section>
</div>`;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = ["brand", "price", "rating", "category", "product_type"];

  return Object.entries(product)
    .filter(([name, value]) => details.includes(name))
    .map(([name, value]) => {
      `<div class="details-row">
          <div>${name}</div>
          <div class="details-bar">
            <div class="details-bar-bg" style="width= 250">${value}</div>
          </div>
        </div>`;
    })
    .join("");
}

function sortProducts(products, sortType) {
  switch (sortType) {
    case "Melhores Avaliados":
      return products.sort((prodA, prodB) =>
        prodA.rating > prodB.rating ? -1 : prodA.rating < prodB.rating ? 1 : 0
      );

    case "Menores Preços":
      return products.sort((prodA, prodB) =>
        prodA.price > prodB.price ? 1 : prodA.price < prodB.price ? -1 : 0
      );

    case "Maiores Preços":
      return products.sort((prodA, prodB) =>
        prodA.price > prodB.price ? -1 : prodA.price < prodB.price ? 1 : 0
      );

    case "A-Z":
      return products.sort((prodA, prodB) =>
        prodA.name > prodB.name ? 1 : prodA.name < prodB.name ? -1 : 0
      );

    case "Z-A":
      return products.sort((prodA, prodB) =>
        prodA.name > prodB.name ? -1 : prodA.name < prodB.name ? 1 : 0
      );
  }
}

filterBrand.addEventListener("change", loadFilters);
filterType.addEventListener("change", loadFilters);
filterName.addEventListener("keyup", loadFilters);
filterSort.addEventListener("change", (e) => {
  loadProducts(products, filterSort.value);
  loadFilters();
});

function loadFilters() {
  const brand = filterBrand.value;
  const type = filterType.value;
  const name = filterName.value;

  productChilds.forEach((product) => {
    if (validProduct(product, brand, type, name)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function validProduct(product, brand, type, name) {
  const search = new RegExp(name, "i");

  const checkName = search.test(product.dataset.name);
  const checkType = product.dataset.type.includes(type);
  const checkBrand = product.dataset.brand.includes(brand);

  return checkName && checkType && checkBrand;
}

Array.prototype.uniq = function () {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
