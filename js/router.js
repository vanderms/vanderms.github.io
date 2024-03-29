import Blog from './blog.js';
import Portfolio from './portfolio.js';

class Router {

  constructor(){

    this._sections = {}
    this._sections.cover = document.querySelector('.section-cover');
    this._sections.portfolio = document.querySelector('.section-portfolio');
    this._sections.blog = document.querySelector('.section-blog');
    this._sections.contact = document.querySelector('.section-contact');
    this._sections.singleProject = document.querySelector('.section-single-project');
    this._sections.singlePost = document.querySelector('.section-single-post');

    this._page = null;

    this.updateCallbacks = []    

    this.links = document.querySelectorAll('.router-link');
    this.links.forEach((link) =>{
      link.addEventListener('click', (e)=>{          
        this.update(link.hash);
      });
    });

    window.addEventListener('popstate', ()=>{         
      this.update(window.location.hash);
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
    const portfolio = '#/portfolio/';
    const posts = "#/posts/";
       
    const indexPaths = ['', '#', "#portfolio", '#contato', "#artigos"];    
    if(indexPaths.indexOf(hash) > -1){
      this.index();
    }
    else if(hash.indexOf(portfolio) == 0){
      const id = hash.slice(portfolio.length, -1);
      this.singleProject(id);
    }
    else if(hash.indexOf(posts) == 0){
      const id = hash.slice(posts.length, -1);
      this.singlePost(id);
    }
  
    this.updateCallbacks.forEach(callback => {      
      callback(hash);
    });
   
  }
  
  singleProject(id){
    this.hideAll();
    window.scrollTo(0, 0);
    Portfolio.renderSingleProject(id);
    this._sections.singleProject.classList.remove('hidden');
    this._page = 'single-project';
  }

  singlePost(id){
    this.hideAll();
    window.scrollTo(0, 0);
    Blog.renderSinglePost(id);
    this._sections.singlePost.classList.remove('hidden');
    this._page = 'single-project';
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
    Blog.renderIndexCards(1);

    this._sections.contact.classList.remove('hidden');

    this._page = 'index';
  }
}

export default new Router();