let initDate = new Date();

const calendar = new Calendar(
  initDate.getMonth(),
  initDate.getDate(),
  initDate.getFullYear()
);

const localeOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const input = document.getElementById('date');
input.addEventListener('input', onDateInputChange);
input.addEventListener('change', onDateInputChange);
input.addEventListener('keyup', ev => {
  if (ev.key === 'Enter') handleCreateCalendar();
});
const submit = document.getElementById('submit');
submit.addEventListener('click', handleCreateCalendar);
const calContainer = document.getElementById('calendar');
handleCreateCalendar();

const preview = document.querySelector('.preview');
preview.innerText = calendar.date.toLocaleString('en-us', localeOptions);

// Simple DOM manipulation for UI
function onDateInputChange(ev) {
  ev.preventDefault();
  if (!ev.target.value.length) {
    preview.innerText = 'Input a date';
    return;
  }
  initDate = new Date(ev.target.value);
  const dateString = initDate.toLocaleString('en-us', localeOptions);
  const errorMsg = 'Incomplete or wrong date format';
  preview.innerText = dateString !== 'Invalid Date' ? dateString : errorMsg;
  if (preview.innerText !== errorMsg) {
    submit.removeAttribute('disabled');
  } else {
    submit.setAttribute('disabled', true);
  }
}
function handleCreateCalendar(ev) {
  calendar.date = initDate;
  calContainer.innerHTML = '';
  const ul = document.createElement('ul');
  calContainer.appendChild(ul);
  const li = document.createElement('li');
  const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  weekdays.forEach((day, i) => {
    const currLi = li.cloneNode();
    currLi.innerText = day[0].toUpperCase() + day.slice(1);
    currLi.style.gridArea = `1 / ${i + 1}`;
    currLi.style.fontWeight = 800;
    ul.appendChild(currLi);
  });
  const currCalDayNum = calendar.date.getDate();
  calendar.getMonthGrid().forEach(day => {
    const currLi = li.cloneNode();
    currLi.innerText = day.day;
    currLi.style.gridArea = `${Math.ceil(day.position / 7) + 1} / ${
      day.weekday + 1
    }`;
    if (day.day === currCalDayNum) currLi.className = 'selected';
    ul.appendChild(currLi);
  });
  input.value = '';
}
