
//mostrar o label do elemento se o input estiver selecionado
document.querySelectorAll('input').forEach(item => {
  item.addEventListener('focus', ()=>{
    item.labels[0].style.display = "block";
  })
});

//volta o label do elemento para o estado oculto quando não selecionado
document.querySelectorAll('input').forEach(item => {
  item.addEventListener('blur', ()=>{
    item.labels[0].style.display = "";
  })
});