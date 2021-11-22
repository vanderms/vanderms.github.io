import Blog from './blog.js';
import Portfolio from './portfolio.js';

class Router {

  constructor(){

    this._sections = {}
    this._sections.cover = document.querySelector('.section-cover');
    this._sections.portfolio = document.querySelector('.section-portfolio');
    this._sections.blog = document.querySelector('.section-blog');
    this._sections.contact = document.querySelector('.section-contact');

    this._page = null;

    this.updateCallbacks = []    

    this.links = document.querySelectorAll('.router-link');
    this.links.forEach((link) =>{
      link.addEventListener('click', (e)=>{          
        this.update(link.hash);
      });
    });
    
    this.update(window.location.hash);
  }

  get sections(){
    return this._sections;
  }

  get page(){
    return this._page;
  }

  update(hash){

   
    if(hash === undefined) hash = window.location.hash;
       
    const indexPaths = ['', '#', "#portfolio", '#contato', "#artigos"];    
    if(indexPaths.indexOf(hash) > -1){
      this.index();
    }
  
    this.updateCallbacks.forEach(callback => {      
      callback(hash);
    });
  }

  onUpdate(callback){
    this.updateCallbacks.push(callback);
  }

  hideAll(){
    for(let section in this._sections){
      this._sections[section].classList.add('hidden');
    }
  }

  index(){
    
    if(this._page === 'index'){ return; }

    this.hideAll();
    
    this._sections.cover.classList.remove('hidden');
    
    this._sections.portfolio.classList.remove('hidden');    
    Portfolio.renderIndexCards(1);
    
    this._sections.blog.classList.remove('hidden');    
    Blog.renderIndexCards();

    this._sections.contact.classList.remove('hidden');

    this._page = 'index';
  }
}

export default new Router();