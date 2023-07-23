let commentList = document.querySelector('.comments-list')
let postCard = document.querySelector('.postCard')
let postId = localStorage.getItem("postId")

let exit = () => {
  localStorage.clear()
  window.location.replace("../Html/login.html")
}

let user = JSON.parse(localStorage.getItem('profil'))

let post = null

let showPost = (post) => {
  let result = `
  <h1 class="text-center">${post.title}</h1>

  <img width="500" class="d-block mx-auto img-fluid my-4" src="${post.image.url}" alt="${post.title}">
  <p class="text-center">${post.content}</p>
  <span>${`${post.createdAt}`.slice(0, 10)}</span>

  <div class="d-flex gap-2">
    <h4 class="me-auto">${post.author[0].email}</h4>
    <button onclick="likePost()" class="btn btn-outline-info ${post.like.includes(user.id) && 'btn-info text-dark'}">like: ${post.like.length}</button>
    <button onclick="dislikePost()" class="btn btn-outline-danger ${post.dislike.includes(user.id) && 'btn-danger text-white'}">dislike: ${post.dislike.length}</button>
    <button onclick="showComments()" class="btn btn-outline-success">comments: ${post.comments.length}</button>
  </div>
  `
  postCard.innerHTML = result;
}



let getPost = async () => {
  try{
    let res = await fetch(`https://webstar-post-app.onrender.com/api/post/${postId}`, {method: "GET"})
    let data = await res.json()
    showPost(data[0])
  } catch(error) {
    console.log(error);
  }
}
getPost()

let likePost = async () => {
  try {
    let res = await fetch(`https://webstar-post-app.onrender.com/api/like/${postId}`, {method: "GET", headers: {'access_token': localStorage.getItem('access_token')}});
    
    let data = await res.json()
    getPost()
  } catch (error) {
    console.log(error);
  }
}

let dislikePost = async () => {
  try {
    let res = await fetch(`https://webstar-post-app.onrender.com/api/dislike/${postId}`, {method: "GET", headers: {'access_token': localStorage.getItem('access_token')}});
    
    let data = await res.json()
    getPost()
  } catch (error) {
    console.log(error);
  }
}

function showComments () {
  post.comments.forEach(comment => {
    let liElement = document.createElement('li');
    liElement.innerHTML = `
    <h4>${comment.author[0].name}</h4>
    <p>${comment.content}</p>
    <span>${`${comment.createdAt}`.slice(0, 10)} </span>
    <hr>
    `
    commentList.appenChild(liElement)
  });
}