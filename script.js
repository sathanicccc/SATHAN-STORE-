// 1. Splash Screen Timeout
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash').style.opacity = '0';
        setTimeout(() => { document.getElementById('splash').style.display = 'none'; }, 500);
    }, 2000);
});

// 2. Search Function
async function searchApps() {
    const query = document.getElementById('searchInput').value;
    const grid = document.getElementById('app-grid');
    const msg = document.getElementById('status-msg');

    if (!query) return;

    msg.innerText = `Searching SATHAN STORE for "${query}"...`;
    grid.innerHTML = "";

    try {
        const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=software&limit=30`);
        const data = await res.json();
        
        if (data.results.length === 0) {
            msg.innerText = "No Apps Found!";
            return;
        }

        msg.innerText = `${data.results.length} Apps Found`;

        data.results.forEach((app, i) => {
            const card = document.createElement('div');
            card.className = 'app-card';
            card.style.animationDelay = `${i * 0.05}s`;
            card.onclick = () => openModal(app);

            card.innerHTML = `
                <img src="${app.artworkUrl100}" class="app-icon">
                <div class="app-name">${app.trackName}</div>
                <button class="get-btn">GET APP</button>
            `;
            grid.appendChild(card);
        });
    } catch (err) {
        msg.innerText = "Error connecting to store.";
    }
}

// 3. Modal & Redirect Logic
function openModal(app) {
    const modal = document.getElementById('appModal');
    const body = document.getElementById('modalBody');
    
    // Direct link to APKPure or Google Search for the APK
    const apkDownloadUrl = `https://www.google.com/search?q=${encodeURIComponent(app.trackName)}+apk+download+apkpure`;

    body.innerHTML = `
        <img src="${app.artworkUrl100}" style="width:100px; border-radius:22px; margin-bottom:15px;">
        <h2>${app.trackName}</h2>
        <p style="color:#2ecc71; font-weight:bold; margin:10px 0;">${app.primaryGenreName} • ${app.averageUserRating?.toFixed(1) || '4.5'} ⭐</p>
        <div style="font-size:13px; color:#666; text-align:left; max-height:150px; overflow-y:auto; margin:15px 0;">${app.description}</div>
        <a href="${apkDownloadUrl}" target="_blank" class="get-btn" style="display:block; text-decoration:none; padding:12px;">DOWNLOAD APK</a>
    `;
    modal.style.display = "block";
}

function closeModal() { document.getElementById('appModal').style.display = "none"; }

window.onclick = (e) => { if (e.target.className === 'modal') closeModal(); }
