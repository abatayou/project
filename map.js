const map = window.map;

const defaultStyle = { color: '#666', weight: 1, fillOpacity: 0.15 };
const highlightStyle = { color: '#ff6600', weight: 2, fillOpacity: 0.6 };


fetch('countries.json')
  .then(res => res.json())
  .then(geojsonData => {
    const geoLayer = L.geoJSON(geojsonData, {
      style: feature => {
    
        return feature.properties.adm0_a3 === 'USA' ? highlightStyle : defaultStyle;
      },
      onEachFeature: (feature, layer) => {
        // Add click event
        layer.on('click', function() {
          if (feature.properties.adm0_a3 === 'USA') {
            window.location.href = 'american.html';
          }
        });
        
        // Add hover effects
        layer.on('mouseover', function() {
          layer.setStyle(highlightStyle);
        });
        
        layer.on('mouseout', function() {
          layer.setStyle(feature.properties.adm0_a3 === 'USA' ? highlightStyle : defaultStyle);
        });
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error('Error loading GeoJSON:', error);
  });