import "./pages/index.css";
import { createCard,
         likeHandler
 } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupBuOverlay,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addCard,
  deleteCard,
  updateAvatar,
} from "./api.js";

let userId = null; 

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "form__input-error",
};

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");
const profileImage = document.querySelector(".profile__image");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const editCloseButton = editPopup.querySelector(".popup__close");
const editButtonElement = editForm.querySelector(".popup__button");

const addButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector(".popup_type_new-card");
const cardForm = document.querySelector(".popup_type_new-card .popup__form ");
const placeInput = cardForm.querySelector('[name="place-name"]');
const linkInput = cardForm.querySelector('[name="link"]');
const cardCloseButton = cardPopup.querySelector(".popup__close");
const cardButtonElement = cardForm.querySelector(".popup__button");

const popupTypeImage = document.querySelector(".popup_type_image");
const imagePopup = popupTypeImage.querySelector(".popup__image");
const imagePopupCloseButton = popupTypeImage.querySelector(".popup__close");
const imagePopupCaption = popupTypeImage.querySelector(".popup__caption");

const profileAvatar = document.querySelector(".profile__image");
const avatarOverlay = document.querySelector(".profile__avatar-overlay");
const avatarPopup = document.querySelector(".popup_type_avatar-edit");
const avatarForm = document.forms.avatarForm;
const avatarLinkInput = document.getElementById("avatar-link");
const avatarSubmitButton = avatarForm.querySelector(".popup__button");
const avatarCloseButton = avatarPopup.querySelector(
  ".popup__close_avatar-edit"
);


function openImagePopup(imageSrc, imageName) {
  imagePopup.src = imageSrc;
  imagePopup.alt = imageName;
  imagePopupCaption.textContent = imageName;
  openPopup(popupTypeImage);
}

function findCardElement(cardId) {
  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
  return cardElement;
}

function deleteCardCallback(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      const cardElement = findCardElement(cardId);
      if (cardElement) {
        cardElement.remove();
      } else {
        console.warn(`Не удалось найти cardElement с ID ${cardId}`);
      }
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

function renderLoading(button, isLoading, initialText = "Сохранить") {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = initialText;
    button.disabled = false;
  }
}

function renderCard(cardData, userId) {
  console.log("renderCard is being called");
  const cardElement = createCard(
    cardData,
    likeHandler,
    openImagePopup,
    (cardId) => {
      deleteCardCallback(cardId, findCardElement(cardId));
    },
    userId
  );
  placesList.append(cardElement);
}

function editFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newAbout = jobInput.value;

  renderLoading(editButtonElement, true);

  updateUserInfo(newName, newAbout)
    .then((response) => {
      setProfileInfo(response);
      closePopup(editPopup);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      renderLoading(editButtonElement, false, 'Сохранить');
    });
}

function addFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value,
  };

  renderLoading(cardButtonElement, true);

  addCard(newCardData.name, newCardData.link)
    .then((newCard) => {
      placesList.prepend(
        createCard(
          newCard,
          likeHandler,
          openImagePopup,
          deleteCardCallback,
          userId
        )
      );
      closePopup(cardPopup);
      cardForm.reset();
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
    })
    .finally(() => {
      renderLoading(cardButtonElement, false, 'Создать');
    });
}

avatarOverlay.addEventListener("click", () => {
  avatarLinkInput.value = "";
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

avatarCloseButton.addEventListener("click", () => closePopup(avatarPopup));
avatarPopup.addEventListener("mousedown", closePopupBuOverlay);

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatarUrl = avatarLinkInput.value;
  renderLoading(avatarSubmitButton, true);

  updateAvatar(avatarUrl)
    .then(() => {
      profileAvatar.style.backgroundImage = `url(${avatarUrl})`;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      renderLoading(avatarSubmitButton, false, "Сохранить");
    });
});

editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  clearValidation(editForm, validationConfig);
  openPopup(editPopup);
});

editCloseButton.addEventListener("click", function () {
  closePopup(editPopup);
});

editPopup.addEventListener("click", closePopupBuOverlay);
cardPopup.addEventListener("click", closePopupBuOverlay);
popupTypeImage.addEventListener("click", closePopupBuOverlay);

addButton.addEventListener("click", function () {
  placeInput.value = "";
  linkInput.value = "";
  clearValidation(cardForm, validationConfig);
  openPopup(cardPopup);
});

cardCloseButton.addEventListener("click", function () {
  closePopup(cardPopup);
});

imagePopupCloseButton.addEventListener("click", function () {
  closePopup(popupTypeImage);
});

const setProfileInfo = (userData) => {
  profileTitle.textContent = userData.name;
  profileSubtitle.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
};

async function initializePage() {
  try {
    const userData = await getUserInfo();
    const userId = userData._id;
    setProfileInfo(userData);

    const initialCards = await getInitialCards();
    initialCards.forEach((cardData) => {
      renderCard(cardData, userId);
    });
  } catch (error) {
    console.error("Ошибка при инициализации страницы:", error);
  }
}

editForm.addEventListener("submit", editFormSubmit);
cardForm.addEventListener("submit", addFormSubmit);
enableValidation(validationConfig);
initializePage();
