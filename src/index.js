import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, likeClick } from "./components/card.js";
import { openPopup, closePopup, closePopupBuOverlay, deleteCard } from "./components/modal.js";
import avatarUrl from './images/avatar.jpg';

document.querySelector('.profile__image').style.backgroundImage = `url(${avatarUrl})`;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editForm = document.querySelector(".popup_type_edit .popup__form");
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="description"]');
const editCloseButton = editPopup.querySelector(".popup__close");

const addButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector(".popup_type_new-card");
const cardForm = document.querySelector(".popup_type_new-card .popup__form ");
const placeInput = document.querySelector('[name="place-name"]');
const linkInput = document.querySelector('[name="link"]');
const cardCloseButton = cardPopup.querySelector(".popup__close");

const popupTypeImage = document.querySelector(".popup_type_image");
const imagePopup = popupTypeImage.querySelector(".popup__image");
const imagePopupCloseButton = popupTypeImage.querySelector(".popup__close");
const imagePopupCaption = popupTypeImage.querySelector(".popup__caption");

function openImagePopup(imageSrc, imageName) {
  imagePopup.src = imageSrc;
  imagePopup.alt = imageName;
  imagePopupCaption.textContent = imageName;
  openPopup(popupTypeImage);
}

function renderCard(cardData) {
    console.log("renderCard is being called");
  placesList.append(createCard(cardData, likeClick, openImagePopup, deleteCard));
}

function editFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editPopup);
}

function addFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value,
  };
  placesList.prepend(createCard(newCardData, likeClick, openImagePopup, deleteCard));
  closePopup(cardPopup);
  cardForm.reset();
}

editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(editPopup);
});

editForm.addEventListener("submit", editFormSubmit);

editCloseButton.addEventListener("click", function () {
  closePopup(editPopup);
});

editPopup.addEventListener("click", closePopupBuOverlay);
cardPopup.addEventListener("click", closePopupBuOverlay);
popupTypeImage.addEventListener("click", closePopupBuOverlay);

addButton.addEventListener("click", function () {
  openPopup(cardPopup);
});

cardForm.addEventListener("submit", addFormSubmit);

cardCloseButton.addEventListener("click", function () {
  closePopup(cardPopup);
});

imagePopupCloseButton.addEventListener("click", function () {
  closePopup(popupTypeImage);
});

initialCards.forEach(renderCard);
