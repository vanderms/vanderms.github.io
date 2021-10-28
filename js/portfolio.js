const callbacks = [];
let projects = null;

const onFetch = (callback)=>{
  if(projects){
    callback(projects);
  } else {
    callbacks.push(callback);
  }
}
    
fetch('/assets/portfolio/portfolio.json')
  .then(response => response.json())
  .then(data => {
    projects = data.projects;
    callbacks.forEach(callback => callback(projects))
  })
  .catch(error => console.log(error.message));


const updateCards = (projects, start)=>{

  const portfolio = document.querySelector(".section-portfolio");
  const cardContainer = portfolio.querySelector('.cards-container');
  const cards = cardContainer.querySelectorAll(".card");

  for(let i = start; i < (start + 6) && i < projects.length; i++){   
    
    const icons = cards[i].querySelector('.icons-container');
    cards[i].querySelector("img").src = `/assets/images/960/${projects[i].thumbnail}`;
    cards[i].querySelector("a").href = `?project=${projects[i].link}`;
    cards[i].querySelector(".title").textContent = projects[i].title;
    let hasIcon = false;

    projects[i].categories.forEach((category) =>{
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

    cards[i].classList.remove("hidden");
  }
}


onFetch((projects)=>{ updateCards(projects, 0); })





export default {onFetch: onFetch}