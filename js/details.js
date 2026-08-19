let images = document.querySelectorAll('.thumbs img');
for (let im of images)
    im.addEventListener('click',function() {
        let main = document.getElementById('main-img');
        main.src=this.src;

    });

    function addComment(){
        if (confirm("Bạn chắc chắn thêm bình luận?")===true){
            let c = document.getElementById('comment-content');

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