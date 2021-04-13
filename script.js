const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = []

// Unsplash API
const count = 30;
const apiKey = 'V0N3mkgg4vyIjMiJd8tXFKk5ja6UCBAY6ZZPGpYUB5s';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//  Check if all images were loaded
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
}
// Helper Function to set Attributs on DOM
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for links and photos and ad to DOM

function displayPhotos() {
    imagesLoaded = 0
    totalImages = photoArray.length
        // Run For each object in an array
    photoArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttribute(item, {
                href: photo.links.html,
                target: '_blank',
            })
            // Create <img for photo 
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttribute(img, {
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.alt_description,
            })
            // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put the img inside <a> and put then inside  imgContainer
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}


// Get Photos from Unsplash API

async function getPhotos() {
    try {
        const res = await fetch(apiUrl)
        photoArray = await res.json()
        displayPhotos()
    } catch (e) {
        //  Catch error

    }
}

// Check t see if scrolling near of bottom page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos();
    }
})

// on load
getPhotos()