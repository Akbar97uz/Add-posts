let myPostsLink = document.querySelector('.my-posts-link')
let addPostLink = document.querySelector('.add-post-link')
let loginItem = document.querySelector('.login-item')
let exitBtn = document.querySelector('.exit-btn');
let headerInfo = document.querySelector('.header-info')
let postsList = document.querySelector('.posts-list');

let token = localStorage.getItem("access_token") || null

if(token) {
  myPostsLink.style.display = "block"
  addPostLink.style.display = "block"
  loginItem.style.display = "none"
}else {
  myPostsLink.style.display = "none"
  addPostLink.style.display = "none"
  loginItem.style.display = "block"
  exitBtn.style.display = "none"
}
let exit = () => {
  localStorage.clear()
  window.location.replace("../Html/login.html")
}

let showPosts = (posts) => {
  let result = ''
  posts.forEach(post => {
      result = result + `
      <div class="col-12 col-md-6 col-lg-3 p-2">
      <div class="card mx-auto" style="max-width: 18rem;">
        <img src="${post.image.url}" class="card-img-top" alt="${post.title}">
        <div class="card-body">
          <h5 class="card-title">"${post.title}"</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <span>${`${post.createdAt}`.slice(0, 10)}</span>
          <a onclick=(savePostId("${post._id}")) href="./post.html" class="btn btn-primary">Read Move</a>
        </div>
      </div>
    </div>     
    `

  });

  postsList.innerHTML = result
}

let getPosts = async () => {
  try{
    let res = await fetch("https://webstar-post-app.onrender.com/api/post", {method: "GET"})
    let  posts = await res.json()
    showPosts(posts)
  } catch(error) {
    console.log(error);
  }
}
getPosts()

let savePostId = (id) => {
  localStorage.setItem("postId", id)
}

let userinfo = async () => {
  try {
    let res = await fetch(`https://webstar-post-app.onrender.com/api/`, {method: "GET", headers: {'access_token': localStorage.getItem('access_token')}});
    
    let data = await res.json()
    localStorage.setItem('profil', JSON.stringify(data.user))

    let userData = JSON.parse(localStorage.getItem('profil')) || null
    if(userData) {
      // let userBtn = `<button class="btn btn-outline-primary ms-2">${userData.name}</button>`
      let userBtn = document.createElement('button')
      userBtn.setAttribute('class', 'btn btn-outline-primary ms-2')
      userBtn.textContent = userData.name;
      headerInfo.appendChild(userBtn)
    }
  } catch (error) {
    console.log(error);
  }
}

userinfo()