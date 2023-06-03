const reviewBox = document.querySelector('.reviews-box');
const range = document.querySelector('.range');

const sectionWidth = document.querySelector('.animals').offsetWidth;

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// Random animal cards

// const getAnimalsAPI = async function () {
//   // return;

//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "022dbd7f08msh68ac72496517fddp1d5c3djsnfc5f28bd12e7",
//       "X-RapidAPI-Host": "zoo-animals-api.p.rapidapi.com",
//     },
//   };
//   const res = await fetch("https://zoo-animals-api.p.rapidapi.com/animals/rand/10", options);
//   const data = await res.json();
//   console.log(data);

//   const arrAnimalsInfo = data.map((animal) => {
//     const { geo_range, image_link: img, name } = animal;
//     return { geo_range, img, name };
//   });

//   return arrAnimalsInfo;
// };

// const getInfoANimals = async function (classPosition, translate) {
//   // return;
//   const data = await getAnimalsAPI();
//   // console.log(data);

//   let html = "";

//   data.forEach((animal, index) => {
//     html += `
//           <div class="card card--${index + 1} ${classPosition}" ${translate}>
//             <div class="card__img-box" >
//               <img class="card__img"   src="${
//                 animal.img
//               }" onerror='this.src="https://s1.1zoom.ru/big0/475/Men_Clown_Makeup_Hair_Surprise_emotion_562052_1280x905.jpg"' alt="Animal photo" />
//             </div>
//             <div class="card__description">
//               <div class="card__text">
//                 <h5 class="card__h5">${animal.name}</h5>
//                 <p class="card__paragraph">${animal.geo_range}</p>
//               </div>
//               <svg class="card__icon-banan">
//                 <use href="./assets/icons/sprite.svg#banana_bamboo"></use>
//               </svg>
//             </div>
//           </div>
//     `;
//   });

//   const cardsBox = document.querySelector(".cards");
//   cardsBox.insertAdjacentHTML("beforeend", html);
//   return html;
// };

// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();
// getInfoANimals();

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// Random user Cards

const getRandomUserAPI = async function () {
  const res = await fetch(
    'https://randomuser.me/api/?results=11&inc=name,location,picture,registered'
  );
  const data = await res.json();
  // console.log(data);
  const arrUsersInfo = data.results.map((user) => {
    const {
      picture: { thumbnail: picture },
      name: { first },
      name: { last },
      location: { country },
      registered: { date },
    } = user;
    return { picture, first, last, country, date };
  });

  return arrUsersInfo;
};

getRandomUserAPI().then((e) => {
  // return;

  // В другом файле массив текста отзывов. Эта функция почти рандомно перемешивает массив. Чтоб был разный порядок отзывов.
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(reviewsText);

  let formatter = new Intl.DateTimeFormat('en-US', {
    // month: '2-digit',
    // day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: 'numeric',
  });

  setTimeout(() => {
    reviewBox.innerHTML = '';

    e.forEach((user, index) => {
      const dateUser = new Date(user.date);

      const haha = `
      <div class="parent-border parent-border-${index + 1} ${
        index >= 3 ? 'review-mobile-hidden' : ''
      }">
        <div class="reviews-card">
          <div class="reviews-card__header">
            <div>
              <img
                class="reviews-card__icon"
                src="${user.picture}"
                alt="person icon"
              />
            </div>
            <div>
              <p class="reviews-card__name">${user.first} ${user.last}</p>
              <p class="reviews-card__location">
                <span class="reviews-card__span-1">${user.country}</span>
                &bull;
                <span class="reviews-card__span-2">${formatter.format(dateUser)}</span>
              </p>
            </div>
          </div>
      
          <div class="reviews-card__body">
            <p class="reviews-card__text">
            ${reviewsText[index]}
            </p>
          </div>
        </div>
      </div>
      `;

      reviewBox.insertAdjacentHTML('beforeend', haha);
    });
  }, 500);
});

////////////////////////////////////////////////////////////
/////////////////////////
///// Scroll testimonials

range.addEventListener('input', function (e) {
  const reviews = document.querySelectorAll('.parent-border');
  reviews.forEach(
    (el, i) => (el.style.transform = `translateX(Calc((-100% - 29px) * ${this.value}))`)
  );
});

// Если сколл оставить в конце, и уменьшить окно, то из-за display:none; секция пустая, ибо элементы пропали, а отклонение скролла осталось. Костыль.
window.addEventListener('resize', function () {
  range.value = 0;
  const reviews = document.querySelectorAll('.parent-border');
  reviews.forEach((el, i) => (el.style.transform = `translateX(0%)`));
});

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// carousel

const btnLeft = document.querySelector('.btn-round--left');
const btnRight = document.querySelector('.btn-round--right');

const cardsContainer = document.querySelectorAll('.cards');
const carousel = document.querySelector('.carousel');

const cardsLeft = document.querySelector('.cards-left');
const cardsCur = document.querySelector('.cards-cur');
const cardsRight = document.querySelector('.cards-right');

createSixCards(cardsLeft);
createSixCards(cardsCur);
createSixCards(cardsRight);

function randomZeroToNumber(numb) {
  return Math.trunc(Math.random() * numb);
}

function left() {
  carousel.classList.add(`transition-left`);
  btnLeft.removeEventListener('click', left);
  btnRight.removeEventListener('click', right);

  cardsCur.classList.add('transition-down');
  cardsLeft.classList.add('transition-up');
}

function right() {
  carousel.classList.add(`transition-right`);
  btnLeft.removeEventListener('click', left);
  btnRight.removeEventListener('click', right);

  cardsCur.classList.add('transition-down');
  cardsRight.classList.add('transition-up');
}

btnLeft.addEventListener('click', left);
btnRight.addEventListener('click', right);

// End animation
carousel.addEventListener('animationend', (e) => {
  let changeCards;

  cardsLeft.classList.remove('transition-up');
  cardsCur.classList.remove('transition-down');
  cardsRight.classList.remove('transition-up');
  carousel.classList.remove('transition-left', 'transition-right');

  if (e.animationName === 'move-left') {
    cardsCur.innerHTML = cardsLeft.innerHTML;
    changeCards = cardsLeft;
    createSixCards(changeCards);
  }
  if (e.animationName === 'move-right') {
    cardsCur.innerHTML = cardsRight.innerHTML;
    changeCards = cardsRight;
    createSixCards(changeCards);
  }

  btnLeft.addEventListener('click', left);
  btnRight.addEventListener('click', right);
});

function createSixCards(cardsBox) {
  const all = new Set();
  while (all.size != 6) all.add(randomZeroToNumber(57));

  cardsBox.innerHTML = '';
  [...all].forEach((randomNumber, index) => {
    cardsBox.insertAdjacentHTML('afterbegin', newCard(randomNumber, index));
  });
}

function newCard(randomNumber, index) {
  return `
              <div class="card card--${6 - index}">
                <div class="card__img-box">
                  <img
                    class="card__img"
                    src="${animals[randomNumber].img}"
                    alt="${animals[randomNumber].name}"
                  />
                </div>
                <div class="card__description">
                  <div class="card__text">
                    <h5 class="card__h5">${animals[randomNumber].name}</h5>
                    <p class="card__paragraph">${animals[randomNumber].area}</p>
                  </div>
                  <svg class="card__${
                    animals[randomNumber].food == 'carn' ? 'icon-meet' : 'icon-banan'
                  }">
                    <use href="./assets/icons/sprite.svg#${
                      animals[randomNumber].food == 'carn' ? 'meet-fish-icon' : 'banana_bamboo'
                    }"></use>
                  </svg>
                </div>
              </div>              
  `;
}
