const hamburguer =document.querySelector(".hamburguer");
const headerMenu =document.querySelector(".menu-hamburguer");

function toggleMenu(){
    hamburguer.classList.toggle("active");
    headerMenu.classList.toggle("active");
}

hamburguer.addEventListener('click',toggleMenu);
