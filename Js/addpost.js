let myPostsLink = document.querySelector('.my-posts-link')
let addPostLink = document.querySelector('.add-post-link')
let loginItem = document.querySelector('.login-item')
let exitBtn = document.querySelector('.exit-btn');
let headerInfo = document.querySelector('.header-info')
let postsList = document.querySelector('.posts-list');
let postForm = document.querySelector('.add-post-form')
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

postForm.addEventListener('submit', async(e)=> {
  e.preventDefault()
  try {
    let res = await fetch('https://webstar-post-app.onrender.com/api/post', {method: "POST", body: new FormData(e.target), headers: {'access_token': localStorage.getItem('access_token')}})

    let data = await res.json()
    alert(data.message);
    if(res.status == 201) {
      window.location.replace("../Html/index.html")
    }

  } catch (error) {
    console.log(error);
  }

})