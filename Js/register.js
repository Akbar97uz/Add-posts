let registerForm = document.querySelector('.register-form');
registerForm.addEventListener('submit', async (e)=> {
  e.preventDefault()
  try {
    let res =await fetch("https://webstar-post-app.onrender.com/api/signup", {method: "POST", body: new FormData(registerForm)})
    let data = await res.json()
    console.log(data);
    if(data.token) {
      localStorage.setItem("access_token", data.token)
      window.location.replace("../Html/login.html")
    }
    alert(data.message);
    if(res.status == 201) {
      window.location.replace("./index.html")
    }
  } catch (error) {
    console.log(error);
  }
})


