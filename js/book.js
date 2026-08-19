function openRegisterModal(obj){
    let id = obj.getAttribute('rel');
    let e = document.getElementById(id);
    //e.style.visibility='visible';//cach 1 -- vi display rui ro dung visibility
    //e.setAttribute('style','display:flex'); ---cach 2

   // e.style.opacity=1;
   e.classList.remove('modal-hide');
   e.classList.add('modal-show');

   
}

function closeModal(obj){
    let id = obj.getAttribute('rel');
    let e= document.getElementById(id);
    // e.style.visibility='hidden';
    // e.style.opacity=0;
    e.classList.remove('modal-show');
    e.classList.add('modal-hide');
}

let inputs = document.querySelectorAll('.modal-content input');
for (let inp of inputs)
    inp.addEventListener('blur',function() {
        if(!this.value || this.value ===''){
            this.classList.add('error');
        }else{
            this.classList.remove('error');
        }



    })