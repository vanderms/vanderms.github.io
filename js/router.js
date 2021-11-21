import Blog from './blog.js';
import Portfolio from './portfolio.js';

class Router {

  constructor(){

    this.sections = {}
    this.sections.cover = document.querySelector('.section-cover');
    this.sections.portfolio = document.querySelector('.section-portfolio');
    this.sections.recentPosts = document.querySelector('.section-recent-posts');
    this.sections.contact = document.querySelector('.section-contact');  


    this.updateCallbacks = []    

    this.links = document.querySelectorAll('.router-link');
    this.links.forEach((link) =>{
      link.addEventListener('click', (e)=>{        
        this.update(link.hash);
      });
    });

    this.update(window.location.hash);
  }

  update(hash){
       
    const indexPaths = ['', '#', "#portfolio", '#contato'];    
    if(indexPaths.indexOf(hash) > -1){
      this.index();
    }

    this.updateCallbacks.forEach(callback => callback(hash));
  }

  onUpdate(callback){
    this.updateCallbacks.push(callback);
  }

  hideAll(){
    for(let section in this.sections){
      this.sections[section].classList.add('hidden');
    }
  }

  index(){
    
    this.hideAll();
    
    this.sections.cover.classList.remove('hidden');
    
    this.sections.portfolio.classList.remove('hidden');    
    Portfolio.renderIndexCards(1);
    
    this.sections.recentPosts.classList.remove('hidden');    
    Blog.renderIndexCards();

    this.sections.contact.classList.remove('hidden');
  }

}

export default new Router();