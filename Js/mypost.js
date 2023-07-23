let myPostsLink = document.querySelector('.my-posts-link')
let addPostLink = document.querySelector('.add-post-link')
let loginItem = document.querySelector('.login-item')
let exitBtn = document.querySelector('.exit-btn');
let headerInfo = document.querySelector('.header-info')
let titleInput = document.querySelector('.title-input')
let contentInput = document.querySelector('.content-input')
let postImg = document.querySelector('.post-img')
let editForm = document.querySelector('.edit-form')
let postsList = document.querySelector('.posts-list')
let btnClose = document.querySelector('.btn-close')


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

let userData = JSON.parse(localStorage.getItem('profil')) || null
if(userData) {
  // let userBtn = `<button class="btn btn-outline-primary ms-2">${userData.name}</button>`
  let userBtn = document.createElement('button')
  userBtn.setAttribute('class', 'btn btn-outline-primary ms-2')
  userBtn.textContent = userData.user;
  headerInfo.appendChild(userBtn)
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
          <span>${'${post.createdAt}'.slice(0, 10)}</span>
          <a onclick=(savePostId("${post._id}")) href="./post.html" class="btn btn-primary">Read Move</a>
          <button onclick=(editPost("${post._id}")) class="btn btn-success my-2" data-bs-toggle="modal" data-bs-target="#exampleModal"> Edit </button>
          <button onclick=(deletePost("${post._id}")) class="btn btn-danger my-2"> Delete </button>

        </div>
      </div>
    </div>     
    `

  });

  postsList.innerHTML = result
}

let getPosts = async() => {
  try{
    let res = await fetch("https://webstar-post-app.onrender.com/api/my", {method: "GET", headers: {'access_token': localStorage.getItem('access_token')}})
    let  posts = await res.json()
    showPosts(posts)
  } catch (error) {
    console.log(error);
  }
}
getPosts()

let savePostId = (id) => {
  localStorage.setItem("postId", id)
}


let deletePost = async(id)=> {
  try{
    let res = await fetch(`https://webstar-post-app.onrender.com/api/post/${id}`, {method: "Delete", headers: {'access_token': localStorage.getItem('access_token')}})
    let  data = await res.json()
    console.log(data);
    alert(data.message)
    getPosts()
  } catch (error) {
    console.log(error);
  }
}

let editPost = async(id)=> {
  savePostId(id)
  try{
    let res = await fetch(`https://webstar-post-app.onrender.com/api/post/${id}`, {method: "GET", headers: {'access_token': localStorage.getItem('access_token')}})
    let data = await res.json()
    console.log(data[0]);
    titleInput.value = data[0].title
    contentInput.value = data[0].content
    postImg.setAttribute('src', data[0].image.url)
  } catch (error) {
    console.log(error);
  }
}

editForm.addEventListener('submit', async(e)=> {
  e.preventDefault()
  let id = localStorage.getItem('postId')
  try {
    let res = await fetch(`https://webstar-post-app.onrender.com/api/post/${id}`, {method: "PUT", body: new FormData(e.target), headers: {'access_token': localStorage.getItem('access_token')}})

    let data = await res.json()
    alert(data.message);

    if(res.status == 200) {
      getPosts()
      btnClose.click()
    }
  } catch (error) {
    console.log(error);
  }

})