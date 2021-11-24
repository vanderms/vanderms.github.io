

class Contact{
  constructor(){    
    this.form = document.querySelector('.section-contact form');
    this.name = this.form.querySelector('#name');
    this.email = this.form.querySelector("#email");
    this.message = this.form.querySelector("#message");
    this.spinner = document.querySelector('.section-contact .overlay-spinner');
    this.modal = document.querySelector('.section-contact .modal');
    this.form.addEventListener('submit', (event)=>{ this.sendEmail(event) });
    this.modal.querySelector('.close-btn').addEventListener('click', ()=>{
      this.modal.classList.add('hidden');
    });

    this.modal.querySelector('.overlay').addEventListener('click', ()=>{
      this.modal.classList.add('hidden');
    });
   

  }

  sendEmail(event){
   
    event.preventDefault();
    this.spinner.classList.remove('hidden');
    
    const formData = new FormData();
    formData.append('name', this.name.value);
    formData.append('email', this.email.value);
    formData.append('message', this.message.value);
    
    
    fetch("https://www.pwcode.com.br/functions/vanderms-io-contact-form.php", {
      body: formData,
      method: "post"
    })
    .then( response => response.text())
    .then(text =>{
      if(text === 'success'){
        this.openModal('success', 'A sua mensagem foi enviada com sucesso!');          
        this.name.value = '';
        this.email.value = '';
        this.message.value = '';       
      }
      else {
        this.openModal('danger', "Falha no envio da mensagem. Tente novamente mais tarde ou envie um email para: vanderms.84@gmail.com");         
      }
    })
    .catch(e => { console.log(e.message)})
    .finally(()=>{
      this.spinner.classList.add('hidden');
    });
      
  }


  openModal(type, message){
    
    const text = this.modal.querySelector('.text');
    const box = this.modal.querySelector('.message');
    text.textContent = message;

    if(type === 'success'){
      box.classList.remove('danger');
      box.classList.add('success');
    } else{
      box.classList.remove('success');
      box.classList.add('danger');
      
    }

    this.modal.classList.remove('hidden');
  }
}

new Contact();