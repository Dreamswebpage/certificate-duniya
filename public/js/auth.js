function login(){
  fetch("/.netlify/functions/login",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      email:email.value,
      password:pass.value
    })
  })
  .then(r=>r.json())
  .then(d=>{
    if(d.success){
      localStorage.setItem("token",d.token);
      location.href="/admin/dashboard.html";
    }else{
      alert("Invalid login credentials");
    }
  });
}

function logout(){
  localStorage.removeItem("token");
  location.href="/admin/login.html";
}
