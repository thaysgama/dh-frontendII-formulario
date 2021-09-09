let inputs = document.querySelectorAll('input');
let containerCards = document.querySelector('.container-cards');
let form = document.querySelector('form')
let uf = document.getElementById('UF');
let json = {
  'image': [],
  'title:': [],
  'description': []
}

// cria todas as opções de UF 
let options = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

options.forEach(function(elemento, chave) {
    uf.appendChild(new Option(elemento, chave));
});

//mostrar o label do elemento se o input estiver selecionado
inputs.forEach(item => {
  item.addEventListener('focus', () => {
    item.labels[0].style.display = "block";
  })
});

//volta o label do elemento para o estado oculto quando não selecionado (blur é o oposto de focus)
inputs.forEach(item => {
  item.addEventListener('blur', () => {
    item.labels[0].style.display = "";
  })
});

let addCard = (event) => {
  let arrayValues = [];
  inputs.forEach(item => arrayValues.push(item.value))

  if (verificacao(arrayValues[0], arrayValues[1], arrayValues[2])) {
    // cria article para armazenar card
    let article = document.createElement("article");
    containerCards.appendChild(article);

    // imagem
    let img = document.createElement("img");
    img.setAttribute("src", arrayValues[2]);
    // localStorage.setItem('imagem', arrayValues[2])
    json.image.push(img);

    // titulo
    let titulo = document.createElement("h2");
    titulo.innerHTML += arrayValues[0];
    // localStorage.setItem('titulo', arrayValues[0])
    json.title.push(titulo)

    // descricão
    let descricao = document.createElement("p");
    descricao.innerHTML += arrayValues[1];
    json.description.push(descricao);

    localStorage.setItem('card', JSON.stringify(json));

    let elementos = [img, titulo, descricao];
    elementos.forEach((item) => article.appendChild(item));
  }

  //não atualiza a pagina quando enviar
  event.preventDefault();
}

let verificacao = (titulo, descricao, url) => {
  titulo = titulo.trim();
  descricao = descricao.trim();
  url = url.trim();
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
  } else {
    return true;
  }
}

// submit event fires on the <form> element itself, and not on any <button> or <input type="submit"> inside it.
form.addEventListener('submit', addCard);

window.onload = function () {
  let obj = localStorage.getItem('card');
  obj = JSON.parse(obj)

  for (elements in obj.image){
    containerCards.innerHTML += `<div><img src="${obj.image[elements]}">
                                  <h2>${obj.title[elements]}</h2>
                                  <p>${obj.description[elements]}</p></div>`
    // json.imagem.push(obj.image[elements])    
    // json.titulo.push(obj.title[elements])    
    // json.descricao.push(obj.description[elements])
  }

  //codigo da aula passada
    // let img = document.createElement('img');
    // img.setAttribute('src', localStorage.getItem('imagem'))
    // let article = document.createElement("article");
    // article.appendChild(img)
    // containerCards.appendChild(article);
}



function removeCards(){
  localStorage.removeItem('card')
}