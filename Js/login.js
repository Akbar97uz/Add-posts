let loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', async (e)=> {
  e.preventDefault()
  try{
    let res =await fetch("https://webstar-post-app.onrender.com/api/login", {method: "POST", body: new FormData(loginForm)})
    let data = await res.json()
    
    if(data.token) {
      localStorage.setItem("access_token", data.token)
    }
    alert(data.message);
    if(res.status == 200) {
      window.location.replace("./index.html")
    }
  }
  catch (error) {
    console.log(error);
  }
})


