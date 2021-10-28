
const navbar = document.querySelector(".navbar");

const closeBtn = navbar.querySelector('.close-btn');
const menuBtn = document.querySelector('.sidebar-bar .menu-btn');
const overlay = document.querySelector('.navbar-overlay');

const closeSidebar = ()=>{
  [navbar, menuBtn, overlay].forEach(e => e.classList.add('close'));  
}

const openSidebar = ()=>{
  [navbar, menuBtn, overlay].forEach(e => e.classList.remove('close'));  
}


overlay.addEventListener('click', closeSidebar);
closeBtn.addEventListener('click', closeSidebar);
menuBtn.addEventListener('click', openSidebar);


export default { open: openSidebar, close: closeSidebar };