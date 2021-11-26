import Pagination from './pagination.js';


    

class Blog {

  constructor(){    
    this.posts = null; 
    this.section = document.querySelector(".section-blog");
    this.container = this.section.querySelector('.cards-container');
    this.template = this.container.querySelector(".template-card-post"); 
    this.cards = this.container.querySelectorAll('article');
    this.pagination = new Pagination(this.section.querySelector('.component-pagination'), 2, page =>{
      this.renderIndexCards(page);
    });            
    this.getPosts();
  }

  async getPosts(){

    if(this.posts == null){
      const response = await fetch('/assets/blog/blog.json');
      const data = await response.json();
      this.posts = data.posts;
    }    
    return this.posts;
  }
  
  async renderIndexCards(page){    
    
    const posts = await this.getPosts();  
    
    const start = (page - 1) * 2;            
    
    for(let i = start; i < (start + 2); i++){ 

      const card = this.cards[i % 2];    
      
      if(i >= posts.length){
        card.classList.add('hidden'); 
        return; 
      }
      card.classList.remove('hidden');
      card.classList.add('not-visible');
      
     
      if(i % 2 == 1){
        card.classList.add('reverse');
      }
      
      const post = posts[i];     
      
      const linkPath = `/#/posts/${post.id}/`;

      const imageLink = card.querySelector('.image-container a');
      imageLink.href = linkPath;

      const readMore = card.querySelector('.read-more');
      readMore.href = linkPath;

      const titleLink = card.querySelector('header a');
      titleLink.href = linkPath;

      const title = card.querySelector('header .title');
      title.textContent = post.title;

      const date = card.querySelector('.date.item span');
      date.textContent = post.date;

      const author = card.querySelector(".author.item span");
      author.textContent = post.author;

      const tags = card.querySelector(".tags.item span");
      tags.textContent = post.tags.join(", ");
      
      const image = card.querySelector('.image-container img');
      image.src = `/assets/images/960/${post.thumbnail}`;
      
      const response = await fetch(`/assets/blog/${post.id}.md`);

      if(response.ok){
        let text = await response.text();       
        const summary = card.querySelector('.summary-container .text');
        const converter = new showdown.Converter();
        text = text.substring(0, text.indexOf('\n'));
        let idx = text.lastIndexOf(" ", 140);
        text = text.substring(0, idx) + "...";
        summary.innerHTML = converter.makeHtml(text);        
      }
      else {
        console.log(`not found ${post.id}`);
      }

      card.classList.remove("not-visible");      
    }

    this.pagination.update(posts.length, page);
  }


  async renderSinglePost(id){

    const section = document.querySelector('.section-single-post');
    const posts = await this.getPosts();
    
    const post = posts.find(post => post.id === id);

    const title = section.querySelector('.title');
    title.textContent = post.title;

    const thumbnail = section.querySelector('.thumbnail');
    thumbnail.src = `/assets/images/960/${post.thumbnail}`;

    const response = await fetch(`/assets/blog/${post.id}.md`);

    const date = section.querySelector('.date.item span');
    date.textContent = post.date;

    const author = section.querySelector(".author.item span");
    author.textContent = post.author;

    const tags = section.querySelector(".tags.item span");
    tags.textContent = post.tags.join(", ");

    if(response.ok){
      const body = section.querySelector('.body');
      const text = await response.text();       
      const converter = new showdown.Converter();    
      const html  = converter.makeHtml(text);
      body.innerHTML = html;    
      body.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
      });  
    }
  } 
}


export default new Blog();