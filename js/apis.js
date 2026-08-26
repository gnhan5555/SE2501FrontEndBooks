let loading =()=>{
    return `<div class="glass-loader"></div>`
    // hoac return <i class="fa-solid fa-spinner fa-spin"></i>
}


let loadCategories = async ()=>{
    let res = await fetch('data/categories.json');
    let data = await res.json();

    return data
}

let loadBooks = async (kw)=>{
    let url = 'https://6a8e39bbbaf2ac84246da4ba.mockapi.io/books';

    if(kw){
        url+=`?title=${kw}`;
    }
    
    let res = await fetch(url);
    let data = await res.json();

    return data
}

let deleteBooks = async (id)=>{
    let url = `https://6a8e39bbbaf2ac84246da4ba.mockapi.io/books/${id}`;
    
    let res = await fetch(url,{
        method:"delete"
    });
    return res.status
    
}

window.onload = () => {
    let m=document.querySelector('.submenu');
    m.innerHTML-`<li>${loading()}</li>`

    //nap danh muc
//trong th nay sd then data thay vi let data=loadcategories();
    loadCategories().then(data => {
        //console.table(data); cai nay de test

        let html=''
        for(let d of data){
            html+=`<li><a href="#">${d.name}</a></li>`
        }

        
        m.innerHTML=html;
    })

    let loadBooksHTML=(kw)=>{
        let b=document.querySelector('.books');
        b.innerHTML=loading();
        
        loadBooks(kw).then(data=>{
        let html='';

        for(let t of data){
            html+=`
                <div class="book">
                    <div>
                        <a href="details.html"><img src="${t.image}" alt="Book"/></a>
                        <h3>${t.title}</h3>
                        <p>${t.price.toLocaleString('en')} VNĐ</p>
                        <a href="#" class="close" rel=${t.id}>&times;</a>
                    </div>
                </div>
                `;
            }

            b.innerHTML=html;
        }).then(()=> {

            let closes = document.getElementsByClassName('close');
            for(let c of closes){
                c.addEventListener('click',function(){
                    if(confirm('Bạn chắc chắn xóa không?')===true){
                        let id = this.getAttribute("rel");

                        deleteBooks(id).then(status =>{
                            if(status===200){
                                b.removeChild(this.parentElement.parentElement);
                                alert("Xóa sách thành công!");
                            } else {
                                alert("Xóa sách thất bại!");
                            }
                        })

                
                    }


                })
            }
        });
    }
    //nap sach
    loadBooksHTML();
    // let b=document.querySelector('.books')
    // loadBooks().then(data=>{
    //     let html='';

    //     for(let t of data){
    //         html+=`
    //             <div class="book">
    //             <div>
    //                 <a href="details.html"><img src="${t.image}" alt="Book"/></a>
    //                 <h3>${t.title}</h3>
    //                 <p>${t.price.toLocaleString('en')} VNĐ</p>
    //                 <a href="#" class="close">&times;</a>
    //             </div>
    //             </div>
    //         `;
    //     }

    //     b.innerHTML=html;
    // });

    //xu ly su kien tim kiem
    let t= document.querySelector('input[type=search]');
    t.addEventListener('change',function(){
        loadBooksHTML(this.value);
    });
}
