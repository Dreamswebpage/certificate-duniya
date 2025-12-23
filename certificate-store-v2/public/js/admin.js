const token = localStorage.getItem("token");
if(!token) location.href="/admin/login.html";

// LOAD CERTIFICATES
fetch("/.netlify/functions/getCertificates")
.then(r=>r.json())
.then(d=>{
  const box=document.getElementById("list");
  if(!box) return;
  d.forEach(c=>{
    box.innerHTML+=`
      <div>
        ${c.title} - ${c.type}
      </div>`;
  });
});

// ADD CERTIFICATE
function addCert(){
  fetch("/.netlify/functions/addCertificate",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+token
    },
    body:JSON.stringify({
      title:title.value,
      provider:provider.value,
      type:type.value,
      link:link.value
    })
  }).then(()=>alert("Added"));
}
