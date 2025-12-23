/**
 * API helper file
 * Used for:
 * - Loading certificates (Free / Paid / All)
 * - Loading single certificate
 * - Future scalability
 */

const API_BASE = "/.netlify/functions";

/* ===============================
   LOAD ALL / FREE / PAID CERTIFICATES
================================= */
async function loadCertificates(type = "ALL") {
  try {
    const res = await fetch(`${API_BASE}/getCertificates`);
    if (!res.ok) throw new Error("Failed to fetch certificates");

    const data = await res.json();
    const box = document.getElementById("certList");

    if (!box) return;

    box.innerHTML = "";

    const filtered =
      type === "ALL" ? data : data.filter(c => c.type === type);

    if (filtered.length === 0) {
      box.innerHTML = `<p>No certificates found</p>`;
      return;
    }

    filtered.forEach(c => {
      box.innerHTML += `
        <div class="card">
          <h3>${c.title}</h3>
          <p><b>Provider:</b> ${c.provider}</p>
          <p><b>Type:</b> ${c.type}</p>
          <a class="btn" href="/certificate.html?id=${c.id}">
            View Details
          </a>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    alert("Error loading certificates");
  }
}

/* ===============================
   LOAD SINGLE CERTIFICATE (DETAIL PAGE)
================================= */
async function loadSingleCertificate() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const res = await fetch(`${API_BASE}/getCertificates`);
    const data = await res.json();

    const cert = data.find(c => String(c.id) === id);
    if (!cert) {
      document.body.innerHTML = "<h2>Certificate not found</h2>";
      return;
    }

    document.getElementById("title").innerText = cert.title;
    document.getElementById("provider").innerText = cert.provider;
    document.getElementById("type").innerText = cert.type;
    document.getElementById("link").href = cert.link;
  } catch (err) {
    console.error(err);
    alert("Error loading certificate details");
  }
}
