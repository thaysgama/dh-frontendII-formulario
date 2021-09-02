let inputs = document.querySelectorAll('input');
let containerCards = document.querySelector('.container-cards');
let form = document.querySelector('form')

//mostrar o label do elemento se o input estiver selecionado
inputs.forEach(item => {
  item.addEventListener('focus', ()=>{
    item.labels[0].style.display = "block";
  })
});

//volta o label do elemento para o estado oculto quando não selecionado (blur é o oposto de focus)
inputs.forEach(item => {
  item.addEventListener('blur', ()=>{
    item.labels[0].style.display = "";
  })
});

let addCard = (event) =>{
  // cria article para armazenar card
  let article = document.createElement('article')
  containerCards.appendChild(article);

  let arrayValues=[];
  inputs.forEach(item=>arrayValues.push(item.value))

  // imagem
  let img = document.createElement('img')
  img.setAttribute('src', arrayValues[2]);

  // titulo
  let titulo = document.createElement('h2')
  titulo.innerHTML+=arrayValues[0]
  
  // descricão
  let descricao = document.createElement('p')
  descricao.innerHTML+=arrayValues[1]

  let elementos = [img,titulo,descricao];
  elementos.forEach(item => article.appendChild(item))
  
  //não atualiza a pagina quando enviar
  event.preventDefault();
}

// submit event fires on the <form> element itself, and not on any <button> or <input type="submit"> inside it.
form.addEventListener('submit', addCard);