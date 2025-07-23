maptilersdk.config.apiKey = map_token;

const map = new maptilersdk.Map({
  container: "map",
  center: listing.geometry.coordinates,
  zoom: 10,
  style: maptilersdk.MapStyle.STREETS,
});

// custom marker div
const el = document.createElement("div");
el.className = "custom-marker";

// create marker
const marker = new maptilersdk.Marker({ element: el })
  .setLngLat(listing.geometry.coordinates)
  .addTo(map);

// create popup
const popup = new maptilersdk.Popup({ offset: 25 })
  .setHTML(`<h6>${listing.location}</h6>`);

// add hover listeners
marker.getElement().addEventListener('mouseenter', () => {
  popup.addTo(map).setLngLat(listing.geometry.coordinates);
});
marker.getElement().addEventListener('mouseleave', () => {
  popup.remove();
});

