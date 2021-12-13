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
      const bodyRect = document.body.getBoundingClientRect();
      const sectionRect = this.section.getBoundingClientRect();
      const offset   = sectionRect.top - bodyRect.top;   
      window.scrollTo(0, offset);
    });      
    this.getProjects();
  }

  async getProjects(){
    if(this.projects == null){
      const response = await fetch('/assets/portfolio/portfolio.json');
      const data = await response.json();
      this.projects = data.projects.reverse();       
    }      
    return this.projects;       
  }


  async renderIndexCards(page){
    const projects = await this.getProjects();
    this.updateCards(projects, page);
    this.pagination.update(projects.length, page);
  }


  async renderSingleProject(id){

    const section = document.querySelector('.section-single-project');
    const projects = await this.getProjects();
    
    const project = projects.find(project => project.id === id);

    const title = section.querySelector('.title');
    title.textContent = project.title;

    const thumbnail = section.querySelector('.thumbnail');
    thumbnail.src = `/assets/images/960/${project.thumbnail}`;

    const techs = section.querySelector('.techs');
    techs.textContent = `Main technologies used in this project: ${project.categories.join(', ')}.`

    const live = section.querySelector('.see-live');
    if(project.live){    
      live.classList.remove('hidden');
      live.href = project.live;
    }
    else {
      live.classList.add('hidden');
    }

    const sourceCode = section.querySelector('.see-source-code');
    if(project.github){
      sourceCode.classList.remove('hidden');
      sourceCode.href = project.github;
    }
    else{
      sourceCode.classList.add('hidden');
    }
    
    const response = await fetch(`/assets/portfolio/${project.id}.md`);

    if(response.ok){
      const description = section.querySelector('.description');
      const text = await response.text();       
      const converter = new showdown.Converter();    
      description.innerHTML  = converter.makeHtml(text);
      description.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
      });
    }
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
      
      card.querySelectorAll("a").forEach(anchor =>{
        anchor.href = `/#/portfolio/${project.id}/`;
      })

      card.querySelector(".title").textContent = project.title;
      let hasIcon = false;
      icons.innerHTML = "";


      let category = project.categories[0];
      if(category){
        category = category.trim().toLowerCase();
        const icon = document.querySelector(`.icon-${category}`);     
      
        if (icon){       
          icons.appendChild(icon.content.cloneNode(true));
          hasIcon = true;
        }
      }


      if(!hasIcon){
        const default_icon = document.querySelector(`.icon-project-default`); 
        icons.appendChild(default_icon.content.cloneNode(true));   
      }
      card.classList.remove("hidden");
    });   
    
   
  }
}


export default new Portfolio();
