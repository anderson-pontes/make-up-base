//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
  const item = `<div class="product" data-name="NYX Mosaic Powder Blush Paradise" data-brand="nyx" data-type="bronzer" tabindex="508">
                  <figure class="product-figure">
                    <img src="https://d3t32hsnjxo7q6.cloudfront.net/i/deedb7bd74bda43f062a09aab2ee1ec8_ra,w158,h184_pa,w158,h184.png" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
                  </figure>
                  <section class="product-description">
                    <h1 class="product-name">NYX Mosaic Powder Blush Paradise</h1>
                    <div class="product-brands">
                      <span class="product-brand background-brand">Nyx</span>
                      <span class="product-brand background-price">R$ 57.70</span>
                    </div>
                  </section>
                  // CARREGAR OS DETALHES
                </div>`;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">nyx</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">10.49</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">5</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250"></div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">bronzer</div>
        </div>
      </div></section>`;
}

function catalagoDetails(product) {
  return`<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.price * 5.50}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.category}</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.product_type}</div>
        </div>
      </div></section>`;
}

function catalagoItem(product) {
  return `<div class="product" data-name="NYX Mosaic Powder Blush Paradise" data-brand="nyx" data-type="bronzer" tabindex="508">
            <figure class="product-figure">
              <img src="${product.api_featured_image}" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
            </figure>
            <section class="product-description">
              <h1 class="product-name">${product.name}</h1>
              <div class="product-brands">
                <span class="product-brand background-brand">${product.brand}</span>
                <span class="product-brand background-price">R$ ${product.price * 5.5}</span>
              </div>
            </section>
              ${catalagoDetails(product)}
          </div>`;
}

var sectionCatalog      = document.getElementById("catalog");
var filtroName          = document.getElementById("filter-name");
var filtroMarca         = document.getElementById("filter-brand");
var filtroTipo          = document.getElementById("filter-type");
var filtroClassificacao = document.getElementById("sort-type");

const catalago = null;
const url = `http://makeup-api.herokuapp.com/api/v1/products.json`;
const catalogoArray = []
const marcasArray = []
const tipoArray = []

const fetchCountries = async () => {
  catalogoArray.push(await fetch(url).then((res) => res.json()));

  // Busca as marcas dos produtos
  for (let index = 0; index < catalogoArray[0].length; index++) {
    if (marcasArray.indexOf('Todos') === -1) {
      marcasArray.push('Todos');
    }

    if (marcasArray.indexOf(catalogoArray[0][index].brand) === -1) {
      marcasArray.push(catalogoArray[0][index].brand);
    }
  }

  // Busca os tipos de produtos
  for (let index = 0; index < catalogoArray[0].length; index++) {
    if (tipoArray.indexOf('Todos') === -1) {
      tipoArray.push('Todos');
    }

    if (tipoArray.indexOf(catalogoArray[0][index].product_type) === -1) {
      tipoArray.push(catalogoArray[0][index].product_type);
    }    
  }

  // Carrega as marcas
  if (marcasArray.length > 0)  {
    for (let index = 0; index < marcasArray.length; index++) {
      filtroMarca.innerHTML =  filtroMarca.innerHTML +
        '<option value="' + index + '">' + marcasArray[index] + '</option>';            
    }
  }

  // Carrega as Tipos
  if (tipoArray.length > 0)  {
    for (let index = 0; index < tipoArray.length; index++) {
      filtroTipo.innerHTML =  filtroTipo.innerHTML +
        '<option value="' + index + '">' + tipoArray[index] + '</option>';            
    }
  }

  let catalagoAll = null;  
  if (catalogoArray[0].length > 0) {
    for (produto of catalogoArray[0]) {
      if (catalagoAll === null) {
        catalagoAll = catalagoItem(produto);
      } else  {
        catalagoAll =
          catalagoAll + catalagoItem(produto);
      }
    }
  }

  sectionCatalog.innerHTML = catalagoAll;
};

function filtrarClassificacao() {

  var text = filtroClassificacao.options[filtroClassificacao.selectedIndex].text;
  var text = filtroMarca.options[filtroMarca.selectedIndex].text;
  const marcasFiltro = catalogoArray[0].filter((vptMarca) => {
    return (vptMarca.brand === text);
  })  

  let catalagoAll = null;  
  for (marca of marcasFiltro) {
    if (catalagoAll === null) {
      catalagoAll = catalagoItem(marca);
    } else  {
      catalagoAll =
        catalagoAll + catalagoItem(marca);
    }
  }  

  sectionCatalog.innerHTML = catalagoAll;  
}

function filtrarCatalogo() {

  let catalagoAll = null;
  let catalogoObj = null;

  // Pego todos os parametros da tela.
  let name          = filtroName.value;
  let marca         = filtroMarca.options[filtroMarca.selectedIndex].text;
  let tipo          = filtroTipo.options[filtroTipo.selectedIndex].text;
  let classificacao = filtroClassificacao.options[filtroClassificacao.selectedIndex].text;

  if (name !== null) {
    catalogoObj = catalogoArray[0].filter((vptMarca) => {
      return (vptMarca.name === name);
    });    
  };

  if (marca !== 'Todos') {
    catalogoObj = catalogoArray[0].filter((vptMarca) => {
      return (vptMarca.brand === marca);
    })      
  };

  if (tipo !== 'Todos') {
    catalogoObj = catalogoArray[0].filter((vptTipo) => {
      return (vptTipo.product_type === tipo);
    })       
  };
// analisar
 /* if (classificacao === 'Maiores Preços') {
     catalogoObj = catalogoObj.sort(function(a, b) {
     return (b.price - a.price);
    })    
  } else if (classificacao === 'Menor Preços') {
    catalogoObj = catalogoObj.sort(function(a, b) {
      return (a.price - b.price);
    })    
  } else if (classificacao === 'A-Z') {
   catalogoObj.sort();
   } else if (classificacao === 'Z-A') {
    catalogoObj.sort();
   catalogoObj.reverse();
 }
*/
  // Carrega todo o catálogo
  if ((name === "") && (marca === 'Todos') && (tipo === 'Todos')) {
    catalogoObj = catalogoArray[0];
  }

  if (catalogoObj.length > 0) {
    for (produto of catalogoObj) {
      if (catalagoAll === null) {
        catalagoAll = catalagoItem(produto);
      } else  {
        catalagoAll =
          catalagoAll + catalagoItem(produto);
      }
    }
  }    

  sectionCatalog.innerHTML = catalagoAll;    
}

fetchCountries();