const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: 'c2f1728d-36bf-4a4c-a59e-660c1ede0cb1',
    'Content-Type': 'application/json'
  }
};

const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
  .then(checkResponse);
};

const getInitialCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
  .then(checkResponse);
};

const updateUserInfo = (name, about) => {
  const requestBody = JSON.stringify({
    name: name,
    about: about
  });
  console.log('Отправляемый запрос:', {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: requestBody
  });

  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: requestBody
  })
  .then(checkResponse);
};

const addCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse);
};

const deleteCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then(checkResponse);
};

const likeCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
  .then(checkResponse);
};

const unlikeCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then(checkResponse);
};

const updateAvatar = (avatarUrl) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
  .then(checkResponse);
};

export { getUserInfo, getInitialCards, updateUserInfo, addCard, deleteCard, likeCard, unlikeCard, updateAvatar, apiConfig };