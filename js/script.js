let inputs = document.querySelectorAll('input');
let containerCards = document.querySelector('.container-cards');
let form = document.querySelector('form');
let titleCardSection = document.querySelector('.title-card-section');
let uf = document.getElementById('UF');
let json = {
  'image': [],
  'title': [],
  'description': [],
  'unidadeFederativa': []
}

// cria todas as opções de UF 
let options = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

options.forEach(function(elemento, chave) {
    uf.appendChild(new Option(elemento, chave));
});

//mostrar o label do elemento se o input estiver selecionado
inputs.forEach(item => {
  item.addEventListener('focus', () => {
    item.labels[0].style.color = "#1A1A1A";
    item.style.paddingTop = "8px"
  })
});

//volta o label do elemento para o estado oculto quando não selecionado (blur é o oposto de focus)
inputs.forEach(item => {
  item.addEventListener('blur', () => {
    item.labels[0].style.color = "transparent";
    item.style.paddingTop = "0px"
  })
});

let addCard = (event) => {
  let arrayValues = [];
  inputs.forEach(item => arrayValues.push(item.value))
  arrayValues.push(uf.options[uf.selectedIndex].text)

  if (verificacao(arrayValues[0], arrayValues[1], arrayValues[2], arrayValues[3])) {
    // cria article para armazenar card
    let article = document.createElement("article");
    containerCards.appendChild(article);

    // imagem
    let img = document.createElement("img");
    img.setAttribute("src", arrayValues[2]);
    json.image.push(arrayValues[2]);

    // div titulo - uf
    let div = document.createElement("div");

    // titulo
    let titulo = document.createElement("h4");
    titulo.innerHTML += arrayValues[0];
    json.title.push(arrayValues[0])
    
    //uf
    let estado = document.createElement("h4")
    estado.innerHTML += arrayValues[3]
    json.unidadeFederativa.push(arrayValues[3])

    // descricão
    let descricao = document.createElement("p");
    descricao.innerHTML += arrayValues[1];
    json.description.push(arrayValues[1]);

    localStorage.setItem('card', JSON.stringify(json));


    let elementos = [img, div, descricao];
    elementos.forEach((item) => article.appendChild(item));
    div.appendChild(titulo);
    div.appendChild(estado);

    titleCardSection.classList.remove('inactive');
    
  }

  //não atualiza a pagina quando enviar
  event.preventDefault();
}

let verificacao = (titulo, descricao, url, estado) => {
  titulo = titulo.trim();
  descricao = descricao.trim();
  url = url.trim();
  estado = estado.trim()
  if (titulo == "") {
    alert("O campo título não pode estar vazio")
    return false;
  } else if (descricao == "") {
    alert("O campo descrição não pode estar vazio")
    return false;
  } else if (url == "") {
    alert("O campo url não pode estar vazio")
    return false;
  } else if (titulo.length >= 30) {
    alert("O campo título não pode ter mais de 30 caracteres")
    return false;
  } else if (descricao.length >= 300) {
    alert("O campo descrição não pode ter mais de 300 caracteres")
    return false;
  } else if (estado === 'Selecione seu estado'){
    alert("O campo UF não foi escolhido")
    return false
  }
  else {
    return true;
  }
}

// submit event fires on the <form> element itself, and not on any <button> or <input type="submit"> inside it.
form.addEventListener('submit', addCard);


window.onload = function () {
  let obj = localStorage.getItem('card');
  obj = JSON.parse(obj)
  if(!obj) return
  for (elements in obj.image){
    containerCards.innerHTML += `<article><img src="${obj.image[elements]}">
                                  <div><h4>${obj.title[elements]}</h4>
                                  <h4>${obj.unidadeFederativa[elements]}</h4></div>
                                  <p>${obj.description[elements]}</p></article>`
    json.image.push(obj.image[elements])    
    json.title.push(obj.title[elements])    
    json.description.push(obj.description[elements])
    json.unidadeFederativa.push(obj.unidadeFederativa[elements])
    titleCardSection.classList.remove('inactive');
  }
}



function removeCards(){
  localStorage.removeItem('card')
}

// removeCards()
