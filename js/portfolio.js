class Portfolio {

  constructor(){    

    this.callbacks = [];
    this.projects = null; 
    this.section = document.querySelector(".section-portfolio");
    this.container = this.section.querySelector('.cards-container');
    this.cards = this.container.querySelectorAll(".card");  
    this.pagination = this.section.querySelectorAll('.pagination button');     

    this.addListener((projects)=>{ this.update(projects, 1); });    

    this.pagination.forEach(button =>{
      button.addEventListener('click', ()=>{
        if(button.textContent != "..."){
          this.update(this.projects, parseInt(button.textContent));
        }
      })
    });
    this.fetchData();
  }

  async fetchData(){
    try { 
      const response = await fetch('/assets/portfolio/portfolio.json');
      const data = await response.json();
      this.projects = data.projects;
      this.callbacks.forEach(callback => {
        try { callback(this.projects) }
        catch(error){ console.log(error.message); }
      });
    }
    catch(error){
      console.log(error.message);
    }    
  }

  addListener(callback){
    if (this.projects){
      callback(this.projects);
    }
    else {
      this.callbacks.push(callback);   
    } 
  }


  update(projects, page){    
    this.updateCards(projects, page);
    this.setPagination(projects, page);
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
      card.querySelector("a").href = `?project=${project.link}`;
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

  setPagination(projects, page){

    const totalPages = Math.ceil(projects.length / 6);   
    
    if(totalPages == 1){
      this.pagination.forEach(btn => btn.classList.add('hidden'));
    }

    else if(totalPages <= 7){
      this.pagination.forEach((btn, index) =>{
        index++;       
        if(index <= totalPages){
          btn.textContent = index;
          btn.classList.remove('hidden');
        } else{
          btn.classList.add('hidden');
        }
      });
    }

    else if(page < 4){     
      this.pagination.forEach((btn, index) =>{
        index++;
        btn.classList.remove('hidden');
        if(index <= 5){
          btn.textContent = index;          
        }
        else if(index == 6){
          btn.textContent = "...";
        }
        else {
          btn.textContent == totalPages;
        }
      });
    }

    else if ((totalPages - page) < 4){

      this.pagination.forEach((btn, index) =>{
        index++;
        btn.classList.remove('hidden');
        if(index == 1){
          btn.textContent = index;
        }
        else if(index == 2){
          btn.textContent = "...";
        }
        else {
          btn.textContent = totalPages - 5 + (index - 2);
        }
      });
    }

    else {
      this.pagination.forEach((btn, index) =>{
        index++;
        btn.classList.remove('hidden');
        if(index == 1){
          btn.textContent = index;
        }
        else if(index == 7){
          btn.textContent = totalPages;
        }
        else if(index == 2 || index == 6){
          btn.textContent = "...";
        }
        else{
          btn.textContent = page + (index - 4);
        }
      });
    }

    this.pagination.forEach((btn)=>{
      if(parseInt(btn.textContent) == page){
        btn.classList.add("active");
      } 
      else{
        btn.classList.remove('active');
      }
    })
  }
}


const instance = new Portfolio();

export default instance;


