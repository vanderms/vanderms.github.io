

class Blog {

  constructor(){

    this.callbacks = [];
    this.posts = null; 
    this.section = document.querySelector(".section-recent-posts");
    this.container = this.section.querySelector('.cards-container');
    this.cards = this.container.querySelectorAll(".card-post");      

    this.addListener((posts)=> this.updateCards(posts));    

    this.fetch();
  }

  async fetch(){
    
    const response = await fetch('/assets/blog/blog.json');
    const data = await response.json();
    this.posts = data.posts;
    this.callbacks.forEach(callback => callback(this.posts));        

  }

  addListener(callback){
    if (this.posts){
      callback(this.posts);
    }
    else {
      this.callbacks.push(callback);   
    } 
  }

  async updateCards(posts){
    
    this.cards.forEach( async (card, index) => {

      if(index >= posts.length){ return; }

      card.classList.add('not-visible');
      card.classList.remove("hidden");

      const post = posts[index];
      
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
        const text = await response.text();       
        const summary = card.querySelector('.summary-container .text');
        Blog.setEllipis(summary, text);
      }
      else{
        console.log(`not found ${post.id}`);
      }

      card.classList.remove("not-visible");
    });
  }


  static setEllipis(elem, text){
    
    const span = document.createElement("span");
    span.textContent = " [...]";
    
    let min = 0;
    let max = text.length - 1;
  
    while(max > min) {
      
      const middle = Math.ceil((min + max) / 2);
      elem.innerHTML = text.substring(0, middle).replaceAll('\n', '<br/>');
      elem.appendChild(span);
      const spanRect = span.getBoundingClientRect();
      const elemRect = elem.getBoundingClientRect();   

      const interval = spanRect.height - 5;
      
      if(spanRect.bottom - elemRect.bottom > interval){
        max = middle;      
      }

      else if(elemRect.bottom - spanRect.bottom > interval){
        min = middle;      
      }
      
      else if(elemRect.right - spanRect.right > 80){
        min = middle;      
      }
      

      else {
        const lastSpace = text.lastIndexOf(" ", middle);
        elem.innerHTML = text.substring(0, lastSpace).replaceAll('\n', '<br/>');
        elem.appendChild(span);     
        return true;
      }
    } 
  
    elem.innerHTML = text;
    return false;
  }

}


const instance = new Blog();
export default instance;