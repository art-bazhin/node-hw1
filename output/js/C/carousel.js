var buttonPrev = document.getElementsByClassName('carousel__move-button carousel__move-button--prev')[0];
var buttonNext = document.getElementsByClassName('carousel__move-button carousel__move-button--next')[0];
var items = document.getElementsByClassName('carousel__item');
var itemButtons = document.getElementsByClassName('carousel__item-button');
var itemsContainer = document.getElementsByClassName('carousel__items-container')[0];

function redrawItems() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].classList.contains('carousel__item--active')) {
      itemsContainer.style.transform = 'translateX(-' + (i * 100 / items.length) + '%)';
    }
  }
}

function nextItem(event) {
  event.preventDefault();

  var activeItem = document.getElementsByClassName('carousel__item carousel__item--active')[0];
  var activeButton = document.getElementsByClassName('carousel__item-button carousel__item-button--active')[0];
  activeItem.classList.remove('carousel__item--active')
  activeButton.classList.remove('carousel__item-button--active')

  if (activeItem.nextElementSibling != null) {
    activeItem.nextElementSibling.classList.add('carousel__item--active');
    activeButton.nextElementSibling.classList.add('carousel__item-button--active');

  } else {
    items[0].classList.add('carousel__item--active');
    itemButtons[0].classList.add('carousel__item-button--active');
  }
  
  redrawItems();
}

function prevItem(event) {
  event.preventDefault();

  var activeItem = document.getElementsByClassName('carousel__item carousel__item--active')[0];
  var activeButton = document.getElementsByClassName('carousel__item-button carousel__item-button--active')[0];
  activeItem.classList.remove('carousel__item--active')
  activeButton.classList.remove('carousel__item-button--active')

  if (activeItem.previousElementSibling != null) {
    activeItem.previousElementSibling.classList.add('carousel__item--active');
    activeButton.previousElementSibling.classList.add('carousel__item-button--active');

  } else {
    items[items.length - 1].classList.add('carousel__item--active');
    itemButtons[items.length - 1].classList.add('carousel__item-button--active');
  }
  
  redrawItems();
}

function itemButtonClick(event) {
  event.preventDefault();

  var activeItem = document.getElementsByClassName('carousel__item carousel__item--active')[0];
  var activeButton = document.getElementsByClassName('carousel__item-button carousel__item-button--active')[0];
  activeItem.classList.remove('carousel__item--active');
  activeButton.classList.remove('carousel__item-button--active');

  event.target.classList.add('carousel__item-button--active');

  for (var i = 0; i < itemButtons.length; i++) {
    if (itemButtons[i].classList.contains('carousel__item-button--active')) {
      items[i].classList.add('carousel__item--active');
    }
  }

  redrawItems();
}

buttonNext.onclick = nextItem;
buttonPrev.onclick = prevItem;

for (var i = 0; i < itemButtons.length; i++) {
  itemButtons[i].onclick = itemButtonClick;
}