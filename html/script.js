const container = document.getElementById('tablet-container');
const tabletObject = document.getElementById('tablet-svg');
const mdtScreen = document.getElementById('mdt-screen');

// Wait for SVG to load to attach listeners to internal buttons
tabletObject.addEventListener('load', () => {
    const svgDoc = tabletObject.contentDocument;
    if (!svgDoc) return;

    // Helper to bind clicks
    const bindClick = (id, callback) => {
        const el = svgDoc.getElementById(id);
        if (el) {
            el.addEventListener('click', callback);
            // Ensure cursor pointer to indicate interactivity
            el.style.cursor = 'pointer';
        }
    };

    // Bind specific buttons (IDs found in SVG analysis)
    // Adjust IDs if necessary based on SVG inspection
    bindClick('power_x5F_button', () => {
        // Example: Toggle screen content or close tablet
        console.log('Power button clicked');
    });

    bindClick('Windows_x5F_button', () => {
        console.log('Home button clicked');
        // Example: Go to home screen
    });
});

window.addEventListener('message', (event) => {
    const data = event.data;
    if (data.action === 'open') {
        container.style.display = 'block';
        // Optional: Inject initial content if provided
        if (data.content) {
            mdtScreen.innerHTML = data.content;
        }
    } else if (data.action === 'close') {
        container.style.display = 'none';
        // Close request to Lua
        fetch(`https://${GetParentResourceName()}/close`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({})
        });
    }
});

// Close when pressing ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        container.style.display = 'none'; // Immediate hide for responsiveness
        fetch(`https://${GetParentResourceName()}/close`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({})
        });
    }
});
