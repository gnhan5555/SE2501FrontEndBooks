let images = document.querySelectorAll('.thumbs img');
for (let im of images)
    im.addEventListener('click',function() {
        let main = document.getElementById('main-img');
        main.src=this.src;

    });

    async function addComment(){
        if (confirm("Bạn chắc chắn thêm bình luận?")===true){
            let c = document.getElementById('comment-content');

            let res= await fetch('https://6a8e39bbbaf2ac84246da4ba.mockapi.io/comments', {
                method:'post',
                body:JSON.stringify({
                    'content': c.value,
                    'created_date':new Date().getTime(),
                    'user':'images/avatar.webp'
                }),
                headers:{
                    'content-type': 'application/json'
                }
            });



            let h=`
            <li class="comment flex">
                <div class="col10">
                    <img src="images/avatar.webp" alt="vinfat"/>
                </div>
                <div class="col90">
                    <h4>${c.value}</h4>
                    <p>${moment(new Date().getTime()).locale('vi').fromNow()}</p>
                </div>
            </li>
            `;

            // cách 1
            // let parent = document.querySelector('.comment-list');
            // parent.innerHTML=h+parent.innerHTML;
            //cách 2
            let s=document.querySelector('.comment-list > li:first-child');
            s.insertAdjacentHTML('beforebegin',h);

        }
    }


    let loadComments = async ()=>{
        let res = await fetch('https://6a8e39bbbaf2ac84246da4ba.mockapi.io/comments')
        let data = await res.json();

        let c = document.querySelector('.comment-list')

        let html ='';
        for(let com of data){
            html +=`
            <li class="comment flex">
                <div class="col10">
                    <img src="${com.user}" alt="vinfat"/>
                </div>
                <div class="col90">
                    <h4>${com.content}</h4>
                    <p>${moment(com.created_date).locale('vi').fromNow()}</p>
                </div>
            </li>
            `;
        }
        c.innerHTML=html;
    }

    window.onload =()=>{ 

        loadComments();
    }