//Получение данных
async function getPosts() {
  try {
    const response = await fetch('https://29.javascript.htmlacademy.pro/kekstagram/data');

    if (!response.ok) {
      throw new Error(response.status);
    }

    const posts = await response.json();
    console.log(posts);
  } catch (error) {
    console.error('Не удалось загрузить данные', error);
  }
}


//Отправка данных
async function sendPosts() {
  return fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST'

  }).then((response) => response.json());
}

export { getPosts, sendPosts };
