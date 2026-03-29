// Page load aagumpol Trending Apps kanikkan
window.onload = () => { filterCategory('All'); };

async function searchApps(keyword = null) {
    const query = keyword || document.getElementById('searchInput').value;
    const grid = document.getElementById('app-grid');
    const title = document.getElementById('section-title');

    if (!query) return;

    title.innerText = `Results for: ${query}`;
    grid.innerHTML = "<p>Scanning Sathan Servers...</p>";

    try {
        // Fetching from a wider database
        const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=software&limit=30`);
        const data = await res.json();
        grid.innerHTML = "";

        data.results.forEach(app => {
            const card = document.createElement('div');
            card.className = 'app-card';
            card.onclick = () => openModal(app);
            
            card.innerHTML = `
                <img src="${app.artworkUrl100}" class="app-icon">
                <div class="app-name">${app.trackName}</div>
                <button class="dl-btn">GET PREMIUM</button>
            `;
            grid.appendChild(card);
        });
    } catch (e) { grid.innerHTML = "<p>Connection Lost...</p>"; }
}

function filterCategory(cat) {
    // Buttons active state maattan
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event?.target.classList.add('active');

    if(cat === 'All') searchApps('Trending');
    else if(cat === 'Hacking') searchApps('Network Tool Security');
    else searchApps(cat);
}

function openModal(app) {
    const modal = document.getElementById('appModal');
    const body = document.getElementById('modalBody');
    
    // Direct APK link redirect to search
    const dlLink = `https://www.google.com/search?q=${encodeURIComponent(app.trackName)}+apk+direct+download`;

    body.innerHTML = `
        <img src="${app.artworkUrl100}" style="width:80px; border-radius:15px; margin-bottom:15px;">
        <h3 style="color:white;">${app.trackName}</h3>
        <p style="color:var(--primary); font-size:12px;">Category: ${app.primaryGenreName}</p>
        <div style="font-size:12px; color:#aaa; margin:15px 0; max-height:100px; overflow-y:auto;">${app.description}</div>
        <a href="${dlLink}" target="_blank" class="dl-btn" style="display:block; text-align:center; text-decoration:none;">DOWNLOAD FROM LOCAL SITE</a>
    `;
    modal.style.display = "block";
}

function closeModal() { document.getElementById('appModal').style.display = "none"; }

