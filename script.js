// Site thurakkumpol thanne apps varaan
document.addEventListener('DOMContentLoaded', () => {
    filterCategory('Trending', document.querySelector('.cat-btn'));
});

async function searchApps(query) {
    const grid = document.getElementById('app-grid');
    const title = document.getElementById('section-title');

    if (!query) return;

    title.innerText = `Result: ${query}`;
    grid.innerHTML = "<p>Fetching from Sathan Servers...</p>";

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=software&limit=30`);
        const data = await response.json();
        grid.innerHTML = "";

        if (data.results.length === 0) {
            grid.innerHTML = "<p>No Apps Found.</p>";
            return;
        }

        data.results.forEach(app => {
            const card = document.createElement('div');
            card.className = 'app-card';
            card.innerHTML = `
                <img src="${app.artworkUrl100}" class="app-icon" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1242/1242392.png'">
                <div class="app-name">${app.trackName}</div>
                <button class="dl-btn">GET APP</button>
            `;
            card.onclick = () => openModal(app);
            grid.appendChild(card);
        });
    } catch (error) {
        grid.innerHTML = "<p>Error: Check Connection</p>";
    }
}

// Categories filter cheyyaan
function filterCategory(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    let searchTerm = cat;
    if(cat === 'All') searchTerm = 'Top Apps';
    if(cat === 'Hacking') searchTerm = 'VPN Security Proxy';
    if(cat === 'Tools') searchTerm = 'System Cleaner';
    
    searchApps(searchTerm);
}

function openModal(app) {
    const modal = document.getElementById('appModal');
    const body = document.getElementById('modalBody');
    const dlLink = `https://www.google.com/search?q=${encodeURIComponent(app.trackName)}+apk+direct+download`;

    body.innerHTML = `
        <img src="${app.artworkUrl100}" style="width:80px; border-radius:15px; margin-bottom:15px;">
        <h3 style="color:white; margin:0;">${app.trackName}</h3>
        <p style="color:var(--primary); font-size:12px;">${app.primaryGenreName} • ${app.averageUserRating?.toFixed(1) || '4.8'} ⭐</p>
        <div style="font-size:11px; color:#aaa; margin:15px 0; max-height:100px; overflow-y:auto; text-align:left;">${app.description}</div>
        <a href="${dlLink}" target="_blank" class="dl-btn" style="display:block; text-decoration:none; text-align:center;">DIRECT DOWNLOAD</a>
    `;
    modal.style.display = "block";
}

function closeModal() { document.getElementById('appModal').style.display = "none"; }
window.onclick = (e) => { if (e.target.className === 'modal') closeModal(); }

// Search input-il ninnu direct function call cheyyaan
function searchAppsFromInput() {
    const val = document.getElementById('searchInput').value;
    searchApps(val);
}
