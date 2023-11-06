const myMap = L.map('map').setView([22.9074872, 79.07306671], 5);
const titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors, Coded by Vaibhav Bhagat ';

const tileLayer = L.tileLayer(titleUrl, {attribution});
tileLayer.addTo(myMap);



function generateList(){
    const ul = document.querySelector('.list');
    storeList.forEach((shop) =>{
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');
        a.addEventListener('click', () => {
              flyToStore(shop);
        });
        div.classList.add('shop-item');
        a.innerText = shop.properties.name;
        a.href = '#';
        p.innerText = shop.properties.address;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });
}

generateList();

function makePopupContent(shop){
    return`
        <div>
           <h4>${shop.properties.name}</h4>
           <p>${shop.properties.address}</p>
           <div class="phone-number">
                 <a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
           </div>
        </div>
    `;
}
function onEachFeature(feature, layer){
       layer.bindPopup(makePopupContent(feature), {closeButton: false, offset: L.point(10, 0) });
}

var myIcon = L.icon({
    iconUrl: '../../img/mapll.png',
    iconSize: [30,35],

});

const shopLayer  = L.geoJSON(storeList, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng){
            return L.marker(latlng, { icon: myIcon });
    }
});

shopLayer.addTo(myMap);

function flyToStore(store){
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];

     myMap.flyTo([lat, lng], 17, {
        duration: 4  
     });

     setTimeout(() => {
        L.popup( {closeButton: false, offset: L.point(0, -2)} )
        .setLatLng([lat, lng])
        .setContent(makePopupContent(store))
        .openOn(myMap);
     },4000);
     
}


