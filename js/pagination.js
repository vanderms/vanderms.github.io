class Pagination {
  
  constructor(root, itemsPerPage, updateCallback){
    this.root = root;
    this.itemsPerPage = itemsPerPage; 
    this.buttons = this.root.querySelectorAll('button');   
    
    
    this.buttons.forEach(button =>{
      button.addEventListener('click', ()=>{
        if(button.textContent != "..."){
          updateCallback(parseInt(button.textContent));
        }
      })
    });   
  }

  update(size, page){    
   
    const totalPages = Math.ceil(size / this.itemsPerPage);   
    
    if(totalPages == 1){
      this.buttons.forEach(btn => btn.classList.add('hidden'));
    }

    else if(totalPages <= 7){
      this.buttons.forEach((btn, index) =>{
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
      this.buttons.forEach((btn, index) =>{
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

      this.buttons.forEach((btn, index) =>{
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
      this.buttons.forEach((btn, index) =>{
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

    this.buttons.forEach((btn)=>{
      if(parseInt(btn.textContent) == page){
        btn.classList.add("active");
      } 
      else{
        btn.classList.remove('active');
      }
    })
  }

}

export default Pagination;