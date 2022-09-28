import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const markup = createGalleryMarkup(galleryItems);
gallery.innerHTML = markup;

// add an attribute "href" to tegs "a" with a value from img "data-source"
const galleryImages = document.querySelectorAll('.gallery__image');
galleryImages.forEach((img) => {
    img.closest('a').href = img.dataset.source;
})

let modal = '';

gallery.addEventListener('click', onGalleryPictureClick)


function createGalleryMarkup(listOfObjects) {
return listOfObjects.map(({preview, original, description}) =>  `<div class="gallery__item">
  <a class="gallery__link">
    <img
      class="gallery__image"
      src="${preview}"
      loading="lazy"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`).join('');
}

function onGalleryPictureClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== "IMG") {
        return;
    }

    const currentImgUrl = evt.target.dataset.source;

    modal = createModal(currentImgUrl);
    modal.show();

    if (modal.visible()) {
        document.addEventListener('keydown', onEscapeClick);
    }
}

function createModal(url) {
    return basicLightbox.create(`
    <img src="${url}">
`);
}

function onEscapeClick(evt) {
    if (evt.code !== "Escape") {
        return;
    }

    if (!modal.visible()) {
        document.removeEventListener('keydown', onEscapeClick);
        return;
    }

    console.log("Click")

    modal.close();
    document.removeEventListener('keydown', onEscapeClick);
}
