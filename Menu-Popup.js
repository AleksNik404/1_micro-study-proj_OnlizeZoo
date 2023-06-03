const btnMenu = document.querySelector('.btn-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');

const reviewContainer = document.querySelector('.reviews-box');
const reviewCard = document.querySelector('.rev-popup');

////////////////////////////////////////////
/// btn menu

// Hide menu, overlay, popup.
const closeOverlayMenu = function () {
  mobileMenu.classList.remove('mobile-menu--open');
  btnMenu.classList.remove('btn-menu--active');
  overlay.classList.add('hidden');

  if (reviewCard) {
    reviewCard.classList.remove('rev-popup--active');
    reviewCard.classList.remove('rev-popup--target');
  }
  // mobileMenu.classList.remove("bgScale");
};

const switchMenu = function () {
  // Без условия есть противоречия. Где нажимая на кнопку, overlay убирается. Т.к. уже стоит от картчоки отзыва.
  if (mobileMenu.classList.contains('mobile-menu--open')) overlay.classList.add('hidden');
  else overlay.classList.remove('hidden');

  mobileMenu.classList.toggle('mobile-menu--open');
  btnMenu.classList.toggle('btn-menu--active');

  if (reviewCard) {
    reviewCard.classList.remove('rev-popup--active');
    reviewCard.classList.remove('rev-popup--target');
  }
  // mobileMenu.classList.add("bgScale");
};

// Open menu and overlay
btnMenu.addEventListener('click', switchMenu);
overlay.addEventListener('click', closeOverlayMenu);
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (overlay.classList.contains('hidden')) return;

  closeOverlayMenu();
});

////////////////////////////////////////////////////////////
/////////////////////////
///// Popup

// Функция для замены кода у карточки.
const changeInfoCard = function (userInfo) {
  const img = userInfo.querySelector('.reviews-card__icon').src;
  const name = userInfo.querySelector('.reviews-card__name').textContent;
  const country = userInfo.querySelector('.reviews-card__span-1').textContent;
  const date = userInfo.querySelector('.reviews-card__span-2').textContent;
  const text = userInfo.querySelector('.reviews-card__text').textContent;

  reviewCard.innerHTML = `    
        <div class="rev-closeBtn-box">
          <svg class="rev-closeBtn">
            <use href="./assets/icons/sprite.svg#rev-closeBtn"></use>
          </svg>
        </div>
        <div class="rev-card">
          <div class="rev-card__header">
            <img class="rev-card__icon" src="${img}" alt="User photo" />
            <div>
              <p class="rev-card__name">${name}</p>
              <p class="rev-card__location">
                <span class="rev-card__span-1">${country}</span>
                &bull;
                <span class="rev-card__span-2">${date}</span>
              </p>
            </div>
          </div>
          <div class="rev-card__body">
            <p class="rev-card__text">
            ${text}
            </p>
          </div>
        </div>   
  `;
};

// Функция для открытия отзыва который имеет cursor:pointer. А он висит только на mobile адаптиве
// IF условие костыль. Этот файл на 2 страницах, и на второй ошибка. Вот проверка на существование.
if (reviewContainer) {
  reviewContainer.addEventListener('click', function (e) {
    const card = e.target.closest('.parent-border');

    if (!card) return;
    if (!(getComputedStyle(card)['cursor'] === 'pointer')) return;

    //На основе текущей рандомной карточки, наполняю с неё инфой popup карточку. Генерация нового целого блока кода и и вставка.
    changeInfoCard(card);

    reviewCard.classList.add('rev-popup--active');
    reviewCard.classList.add('rev-popup--target');
    // reviewCard.classList.remove("hidden");
    overlay.classList.remove('hidden');

    // Снова захватываю кнопку для хакрытия карточки, ибо в глобальной области не реагирует. Надо захватывать уже у перерисованого.
    const revCloseBtn = document.querySelector('.rev-closeBtn-box');
    revCloseBtn.addEventListener('click', closeOverlayMenu);
  });
}
