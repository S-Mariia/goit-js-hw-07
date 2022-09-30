import { galleryItemsPlus } from './gallery-items-plus.js';

const gallery = document.querySelector('.gallery');
const markup = createGalleryMarkup(galleryItemsPlus);
gallery.innerHTML = markup;

let modal = '';

gallery.addEventListener('click', onGalleryPictureClick);

function createGalleryMarkup(listOfObjects) {
return listOfObjects.map(({preview, original, description}) =>  `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
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
}

function createModal(url) {
    return basicLightbox.create(`
    <img src="${url}">`, {
	onShow: () => window.addEventListener('keydown', onEscapeClick),
  onClose: () => window.removeEventListener('keydown', onEscapeClick),
    });
}

function onEscapeClick(evt) {
    if (evt.code !== "Escape") {
        return;
    }
    
    modal.close();
}


    

