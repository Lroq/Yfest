// gestion de la map
var map = L.map('map').setView([43.6043, 1.4437], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Requête Overpass API pour obtenir les bars et boîtes de nuit
        var query = "[out:json];(node[\"amenity\"=\"bar\"](43.5,1.3,43.7,1.5);node[\"amenity\"=\"nightclub\"](43.5,1.3,43.7,1.5););out;";
        var url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.elements.forEach(element => {
                    if (element.lat && element.lon) {
                        var name = element.tags.name || "Inconnu";
                        var type = element.tags.amenity === "bar" ? "Bar 🍹" : "Boîte de nuit 🎶";
                        L.marker([element.lat, element.lon])
                            .addTo(map)
                            .bindPopup(`<b>${name}</b><br>${type}`);
                    }
                });
            })
            .catch(error => console.error("Erreur lors du chargement des données :", error));