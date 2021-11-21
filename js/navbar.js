import Router from './router.js';

class Navbar {
  constructor(){

    this.navbar = document.querySelector(".navbar");
    this.closeBtn = this.navbar.querySelector('.close-btn');
    this.menuBtn = document.querySelector('.sidebar-bar .menu-btn');
    this.overlay = document.querySelector('.navbar-overlay');
    this.overlay.addEventListener('click', ()=> this.close());
    this.closeBtn.addEventListener('click', ()=> this.close());
    this.menuBtn.addEventListener('click', ()=> this.open());



  }

  setActiveLink(hash){
    

  }

  open(){
    [this.navbar, this.menuBtn, this.overlay].forEach(e => e.classList.remove('close'));  
  }

  close(){
    [this.navbar, this.menuBtn, this.overlay].forEach(e => e.classList.add('close')); 
  }


}


new Navbar();