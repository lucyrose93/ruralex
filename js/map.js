// Initialise the map
const map = L.map('ruralex-map');

// Add the map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// RURALEX research sites
const sites = [
    {
        name: "Catalan Pyrenees, Northeast Spain",
        coordinates: [42.45, 1.75],
        description: "Bureaucratic forest management marginalizes traditional knowledge. As climate change raises the threat of megafires, this project uses ethnographic fieldwork to explore and identify alternative ways to build fire-resilient landscapes and communities.",
        link: "case_pyrenees.html"
    },
    {
        name: "Lower Danube, The Danube Delta, Romania",
        coordinates: [44.15, 27.75],
        description: "Socialist Romania and Bulgaria introduced Asian carp as a protein source. It escaped into the Danube, becoming an invasive species. We examine fish reproduction and infrastructure, tracking how neoliberal reforms reshape interspecies relations.",
        link: "case_danube.html"
    },
    {
        name: "Mallorca, Balearic Islands, Spain",
        coordinates: [39.62, 2.98],
        description: "Agricultural and environmental practices in Mallorca are changing and so are broader political and social debates. This case study explores resilience and adaptation in labour, trade, and livelihoods, while documenting past agricultural systems and landscapes.",
        link: "case_mallorca.html"
    },
    {
        name: "Trentino Province, Italy",
        coordinates: [46.15, 11.12],
        description: "Abandonment of traditional agriculture, depopulation, and rewilding have turned the landscape into a site of political contention. These transformations spark conflict as local actors negotiate shifting land use and identities.",
        link: "case_trentino.html"
    },
    {
        name: "Matsalu National Park, Estonia",
        coordinates: [58.75, 23.65],
        description: "Reed beds and flooded meadows along the Kasari River support major Arctic bird migration and foster artisanal innovations. Biodiversity conservation, cultural tradition, and economic viability are negotiated, revealing tensions and adaptations in managing this distinctive landscape and its livelihoods.",
        link: "case_matsalu.html"
    },
    {
        name: "Sussex, Southern UK",
        coordinates: [50.92, -0.32],
        description: "At Knepp, grazing and beaver reintroduction are shaping new wetlands, raising questions about how social values guide future licensing. At Railway Land Wildlife Trust, Lewes, chalk stream restoration created biodiverse wetlands and fosters ecocentric cultures.",
        link: "case_sussex.html"
    },
    {
        name: "Sør-Varanger, Northern Norway and Sápmi",
        coordinates: [69.73, 30.05],
        description: "Using the spread of invasive pink salmon as a focal point, the case study foregrounds curatorial practice, local art history and educational initiatives, as a way of activating local knowledge of human–environment relations.",
        link: "case_norway.html"
    },
    {
        name: "Bitterfeld-Wolfen, Eastern Germany",
        coordinates: [51.62, 12.32],
        description: "Around Bitterfeld-Wolfen in eastern Germany, restored lakes, forests, and recreation landscapes mask a recent history of coal mining and pollution. The project addresses emerging land-use conflicts, particularly around wind farms and solar parks, and their contemporary socio-political significance.",
        link: "case_bitterfeld.html"
    }
];

const ruralexIcon = L.icon({
    iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41"><path fill="%232d96a5" stroke="%23ffffff" stroke-width="1.5" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z"/><circle cx="12.5" cy="12.5" r="4" fill="%23ffffff"/></svg>',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
});

// Add markers
const markers = {};

sites.forEach(site => {
    const marker = L.marker(site.coordinates, {
        icon: ruralexIcon
    })
        .addTo(map)
        .bindPopup(`
            <h3>${site.name}</h3>
            <p>${site.description}</p>
            <a href="${site.link}">Explore →</a>
        `);

    markers[site.name] = marker;
});

// Automatically fit the map to all research sites
const bounds = L.latLngBounds(sites.map(site => site.coordinates));

map.fitBounds(bounds, {
    padding: [10, 10]
});

map.setMinZoom(map.getZoom());

function updateMapBounds() {
    if (window.matchMedia("(min-width: 1025px)").matches) {
        map.setMaxBounds(bounds.pad(0.55));
        map.options.maxBoundsViscosity = 1.0;
    } else {
        map.setMaxBounds(null);
        map.options.maxBoundsViscosity = 0;
    }
}

updateMapBounds();

window.addEventListener("resize", updateMapBounds);

document.querySelectorAll('.map-view-link').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const siteName = link.dataset.site;
        const marker = markers[siteName];

        if (!marker) return;

        document.querySelector('#ruralex-map').scrollIntoView({
            behavior: 'smooth'
        });

        setTimeout(() => {
            map.flyTo(marker.getLatLng(), map.getZoom(), {
                duration: 1
            });

            marker.openPopup();
        }, 500);
    });
});