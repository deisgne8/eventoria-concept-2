(() => {
  const replacement=document.querySelector('#proof-redesign');
  const clients=document.querySelector('.clients');
  if(replacement&&clients)clients.before(replacement);
})();
