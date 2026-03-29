// Site thurakkumpol auto-load aakan
document.addEventListener('DOMContentLoaded', () => {
    // Initial load: Trending apps
    fetchData('Top Apps');
});

// Main Fetch Function
async function fetchData(query) {
    const grid = document.getElementById('app-grid');
    const title = document.getElementById('section-title');

    if (!query) return;

    title.innerText = `Scanning for: ${query}...`;
    grid.innerHTML = "<p style='color:#00ff88; text-align:center; width:100%;'>Accessing Sathan Servers...</p>";

    try {
        // iTunes API use cheyyunnu
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=software&limit=30`;
        const response = await fetch(url);
        const data = await response.json();
        
        grid.innerHTML = "";

        if (!data.results || data.results.length === 0) {
            grid.innerHTML = "<p style='color:red; text-align:center; width:100%;'>No apps found in this world.</p>";
            title.innerText = "No Results Found";
            return;
        }

        title.innerText = `${query} Results`;

        data.results.forEach(app => {
            const card = document.createElement('div');
            card.className = 'app-card';
            
            // App Icon fixed
            const icon = app.artworkUrl100 || 'https://cdn-icons-png.flaticon.com/512/1242/1242392.png';
            
            card.innerHTML = `
                <img src="${icon}" class="app-icon" loading="lazy">
                <div class="app-name">${app.trackName}</div>
                <button class="dl-btn">GET PREMIUM</button>
            `;
            
            // Click cheythal modal thurakkan
            card.onclick = () => openModal(app);
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Fetch Error:", error);
        grid.innerHTML = "<p style='color:red;'>Connection Blocked. Try Again.</p>";
    }
}

// Search Button or Enter key logic
function searchApps() {
    const query = document.getElementById('searchInput').value;
    if(query.trim() !== "") {
        fetchData(query);
    }
}

// Category filter logic
function filterCategory(cat, btn) {
    // Buttons active state maattan
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    let searchTerm = cat;
    if(cat === 'All') searchTerm = 'Trending';
    if(cat === 'Hacking') searchTerm = 'Cyber Security';
    if(cat === 'Tools') searchTerm = 'Utilities';
    
    fetchData(searchTerm);
}

// Modal functions
function openModal(app) {
    const modal = document.getElementById('appModal');
    const body = document.getElementById('modalBody');
    
    // Download link (Google Search/APKPure logic)
    const dlLink = `https://www.google.com/search?q=${encodeURIComponent(app.trackName)}+apk+direct+download`;

    body.innerHTML = `
        <img src="${app.artworkUrl100}" style="width:90px; border-radius:18px; border:2px solid #00ff88; margin-bottom:15px;">
        <h3 style="color:white; margin:0;">${app.trackName}</h3>
        <p style="color:#00ff88; font-size:12px; margin:5px 0;">${app.primaryGenreName} • ${app.averageUserRating?.toFixed(1) || '4.5'} ⭐</p>
        <div style="font-size:11px; color:#aaa; margin:15px 0; max-height:150px; overflow-y:auto; text-align:left; line-height:1.5;">${app.description}</div>
        <a href="${dlLink}" target="_blank" class="dl-btn" style="display:block; text-decoration:none; text-align:center; padding:12px; font-size:14px;">DOWNLOAD FROM CLOUD</a>
    `;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('appModal').style.display = "none";
}

// Modal-nu purathu click cheythal close aakan
window.onclick = (e) => {
    const modal = document.getElementById('appModal');
    if (e.target === modal) closeModal();
}
