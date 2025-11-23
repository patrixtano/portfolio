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
// Vertical Pool Number Bar (JSON from GitHub Gist)
// ----------------------------------------------------------

async function loadPoolStripVertical() {
    const gistURL = "https://gist.githubusercontent.com/patrixtano/18b9152b3bab7dbdde9c77f400f6e504/raw/latest.json";

    try {
        const resp = await fetch(gistURL, { cache: "no-cache" });
        if (!resp.ok) throw new Error("Failed to fetch gist");

        const json = await resp.json();

        // Convert to numbers
        const values = json.map(row => parseInt(row.people, 10));

        // Last 10 values, newest last → reverse so newest is first
        const lastValues = values.slice(-10).reverse();

        const container = document.getElementById("poolBarVertical");
        container.innerHTML = "";

        const total = lastValues.length;

        lastValues.forEach((value, index) => {
            const age = index; // top = age 0
            const opacity = Math.max(1 - age * 0.3, 0.3);
            const div = document.createElement("div");
            div.textContent = value;
            div.className = "pool-number-vertical";
            div.style.opacity = opacity.toFixed(2);

            container.appendChild(div);
        });

    } catch (err) {
        console.error("Vertical pool bar load failed:", err);
    }
}

// Load immediately and refresh every 5 min
loadPoolStripVertical();
setInterval(loadPoolStripVertical, 60000);
