async function searchApps() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    const loader = document.getElementById('loader');

    if (!query) {
        alert("Enter app name!");
        return;
    }

    resultsDiv.innerHTML = "";
    loader.style.display = "block";

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=software&limit=24`);
        const data = await response.json();
        
        loader.style.display = "none";

        if (data.results.length === 0) {
            resultsDiv.innerHTML = "<p style='text-align:center; width:100%;'>No apps found for this search.</p>";
            return;
        }

        data.results.forEach(app => {
            const card = document.createElement('div');
            card.className = 'app-card';
            card.innerHTML = `
                <img src="${app.artworkUrl100}" class="app-icon" alt="${app.trackName}">
                <div class="app-name">${app.trackName}</div>
                <div style="font-size:12px; color:#7f8c8d; margin-bottom:10px;">${app.primaryGenreName}</div>
                <a href="${app.trackViewUrl}" target="_blank" class="download-btn">GET APP</a>
            `;
            resultsDiv.innerHTML += card.outerHTML;
        });
    } catch (error) {
        loader.style.display = "none";
        resultsDiv.innerHTML = "<p>Something went wrong. Please check your internet.</p>";
    }
}
