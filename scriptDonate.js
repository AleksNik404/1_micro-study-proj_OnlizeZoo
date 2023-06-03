const labels = document.querySelectorAll('.const');
const inputs = document.querySelectorAll('.range-donate__input');
const boxLabels = document.querySelector('.range-amount');
const boxInputs = document.querySelector('.range-donate');
const inputNumber = document.querySelector('.form-amount__input-number');

////////////////////////////////////////////
/// Labels orange colors - active class
boxLabels.addEventListener('click', (e) => {
  if (!e.target.classList.contains('const')) return;

  labels.forEach((e) => e.classList.remove('const--active'));
  e.target.classList.add('const--active');
});

////////////////////////////////////////////
/// block +,-,e
inputNumber.addEventListener('keydown', (key) => {
  if (key.keyCode != 8 && key.keyCode != 0 && !Number.isFinite(+key.key)) {
    key.preventDefault();
  }
});

////////////////////////////////////////////
///  Label orange color - after clicking on the checkox
boxInputs.addEventListener('click', (e) => {
  if (!e.target.classList.contains('range-donate__input')) return;

  const label = document.querySelector(`[for="${e.target.id}"]`);
  inputs.forEach((e) => e.classList.remove('const--active'));
  labels.forEach((e) => e.classList.remove('const--active'));
  label.classList.add('const--active');
});

////////////////////////////////////////////
///  checkbox activation after entering an equal amount and unchecked if amount !== value
inputNumber.addEventListener('input', function () {
  let checkbox = document.getElementById(`$${this.value}`);
  if (!checkbox) {
    inputs.forEach((e) => (e.checked = false));
    labels.forEach((e) => e.classList.remove('const--active'));
    return;
  }
  checkbox.checked = true;
  labels.forEach((e) => e.classList.remove('const--active'));
  document.querySelector(`[for="${checkbox.id}"]`).classList.add('const--active');
});

////////////////////////////////////////////
///  Max length 4 And exclude 0 by the first character
inputNumber.addEventListener('input', function () {
  if (inputNumber.value === '0') this.value = '';
  if (inputNumber.value.length > 4) this.value = this.value.slice(0, 4);
});

////////////////////////////////////////////
///  show the price in the inuput
boxInputs.addEventListener('change', (el) => {
  document.querySelector('.form-amount__input-number').value = el.target.id.slice(1);
});
