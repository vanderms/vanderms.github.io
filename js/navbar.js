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
    
    this.links = {
      home: this.navbar.querySelector('.home-link'),
      portfolio: this.navbar.querySelector('.portfolio-link'),
      contato: this.navbar.querySelector('.contato-link'),
      blog: this.navbar.querySelector('.blog-link')
    }

    for(let link in this.links){
      this.links[link].addEventListener('click', ()=>{this.close()});

    }

    Router.onUpdate((hash)=>this.setActiveLink(hash));
    this.setActiveLink(window.location.hash); 

  }


  setActiveLink(hash){

    this.removeAllActiveLinks();
    if(hash === '' || hash === '#'){
      this.links.home.classList.add('active'); 
    }
    else if(hash === "#portfolio"){
      this.links.portfolio.classList.add('active'); 
    }
    else if(hash === '#contato'){
      this.links.contato.classList.add('active');
    }
  }

  removeAllActiveLinks(){
    for(let link in this.links){    
      this.links[link].classList.remove('active');
    }    
  }



  open(){
    [this.navbar, this.menuBtn, this.overlay].forEach(e => e.classList.remove('close'));  
  }

  close(){
    [this.navbar, this.menuBtn, this.overlay].forEach(e => e.classList.add('close')); 
  }


}


new Navbar();