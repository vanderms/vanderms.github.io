import Pagination from "./pagination.js";


class Portfolio {

  constructor(){
    this.callbacks = [];
    this.projects = null; 
    this.section = document.querySelector(".section-portfolio");
    this.container = this.section.querySelector('.cards-container');
    this.cards = this.container.querySelectorAll(".card");  
    this.pagination = new Pagination(this.section.querySelector('.component-pagination'), 6, page =>{
      this.renderIndexCards(page);
    });      
    this.getProjects();
  }

  async getProjects(){
    if(this.projects == null){
      const response = await fetch('/assets/portfolio/portfolio.json');
      const data = await response.json();
      this.projects = data.projects;
    }   
    return this.projects;       
  }


  async renderIndexCards(page){
    const projects = await this.getProjects();
    this.updateCards(projects, page);
    this.pagination.update(projects.length, page);
  }


  updateCards(projects, page){
   
    const start = (page - 1) * 6;    

    this.cards.forEach((card, index)=>{
      
      if(start + index >= projects.length){
        card.classList.add("hidden");
        return;
      }
      
      const project = projects[start + index];      

      const icons = card.querySelector('.icons-container');
      card.querySelector("img").src = `/assets/images/960/${project.thumbnail}`;
      card.querySelector("a").href = `?project=${project.id}`;
      card.querySelector(".title").textContent = project.title;
      let hasIcon = false;
      icons.innerHTML = "";

      project.categories.forEach((category) =>{
        category = category.trim();
        const icon = document.querySelector(`.icon-${category}`);     
      
        if (icon){       
          icons.appendChild(icon.content.cloneNode(true));
          hasIcon = true;
        }
      });

      if(!hasIcon){
        const default_icon = document.querySelector(`.icon-project-default`); 
        icons.appendChild(default_icon.content.cloneNode(true));   
      }
      card.classList.remove("hidden");
    });    
  }  
}


export default new Portfolio();
