// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

function deleteCard(cardElement) {
    cardElement.remove();
}

function createCard(cardData) { 
    const cardElement = cardTemplate.content.cloneNode(true).firstElementChild

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    
    return cardElement;
}


function renderCard(cardData) {
    placesList.append(createCard(cardData));
}

initialCards.forEach(renderCard);