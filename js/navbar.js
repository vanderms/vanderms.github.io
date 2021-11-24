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
    this.currentLink = "";   
    
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

    let lastY = window.scrollY;
    window.addEventListener('scroll', ()=> {
      if(Math.abs(lastY - window.scrollY) < 50){
        return;
      }     
      lastY = window.scrollY;
      this.monitorScroll();       
    });


  }


  setActiveLink(hash){

    this.removeAllActiveLinks();

    if(hash === '' || hash === '#'){
      this.links.home.classList.add('active'); 
    }
    else if(hash === "#portfolio" || hash.indexOf('#/portfolio/') == 0){
      this.links.portfolio.classList.add('active'); 
    }
    else if(hash === '#contato'){
      this.links.contato.classList.add('active');
    }
    else if(hash === "#artigos"){
      this.links.blog.classList.add('active');
    }
    this.currentLink = hash;
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


  monitorScroll(){
    
    if(Router.page === 'index'){
      let link = null;
      if(this.isSectionActive(Router.sections.cover)){
        link = "#";
      }      
      else if(this.isSectionActive(Router.sections.portfolio)){
        link = '#portfolio';
      }
      else if(this.isSectionActive(Router.sections.blog)){
        link = '#artigos';
      }
      else if(this.isSectionActive(Router.sections.contact)){
        link = '#contato';
      }

      if(link !== null && link !== this.currentLink){
        this.setActiveLink(link);        
      }
    }
  }

  isSectionActive(section){
    const rect = section.getBoundingClientRect();   
    return rect.top > -120 && rect.top < 80;
  }


}


new Navbar();