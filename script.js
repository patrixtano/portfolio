// -------------------------------------------
// Parallax Cloud Movement
// -------------------------------------------

const cloud1 = document.querySelector('.cloud1');
const cloud2 = document.querySelector('.cloud2');
const cloud3 = document.querySelector('.cloud3');

document.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    cloud1.style.transform =
        `translateX(${scrolled * 0.4}px) scale(0.8)`;

    cloud2.style.transform =
        `translateX(${scrolled * 0.2}px) scale(0.8)`;

    cloud3.style.transform =
        `translateX(${scrolled * -0.4}px) scale(0.8)`;
});

// ----------------------------------------------------------
// Live Pool Number Strip at Bottom of Page
// ----------------------------------------------------------

async function loadPoolStrip() {
    const gistURL = "https://gist.githubusercontent.com/patrixtano/18b9152b3bab7dbdde9c77f400f6e504/raw/latest-pool.tsv";

    try {
        const resp = await fetch(gistURL, { cache: "no-cache" });
        const text = await resp.text();

        const lines = text.trim().split("\n");
        if (lines.length <= 1) return;

        const header = lines[0].split("\t");
        const rows = lines.slice(1).map(line => {
            const cols = line.split("\t");
            return Object.fromEntries(header.map((h, i) => [h, cols[i]]));
        });

        const values = rows.map(r => parseInt(r.people, 10));

        // Take last 10 (or fewer)
        const lastValues = values.slice(-10);

        const container = document.getElementById("poolBar");
        container.innerHTML = "";

        const total = lastValues.length;

        lastValues.forEach((value, index) => {
            const age = total - index - 1; // 0 = newest, higher = older

            // Opacity gradient: newest = 1, oldest ~ 0.3
            const opacity = 1 - (age * 0.065);  
            
            const span = document.createElement("span");
            span.textContent = value;
            span.className = "pool-number";
            span.style.opacity = opacity.toFixed(2);

            container.appendChild(span);
        });

    } catch (err) {
        console.error("Pool bar load failed", err);
    }
}

// Load immediately and refresh every 5 min
loadPoolStrip();
setInterval(loadPoolStrip, 300000);
