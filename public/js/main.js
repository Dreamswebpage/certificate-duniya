// Custom cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Demo certificates (real data backend me aayega)
const demoData = [
  { title: "Google Cyber Security", provider: "Google" },
  { title: "AWS Cloud Basics", provider: "Amazon" },
  { title: "Microsoft Azure", provider: "Microsoft" }
];

const box = document.getElementById("certList");
if (box) {
  demoData.forEach(c => {
    box.innerHTML += `
      <div class="card">
        <h3>${c.title}</h3>
        <p>${c.provider}</p>
      </div>
    `;
  });
}
