const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function createElement({ tagName, className, attributes = {} }) {
  const element = document.createElement(tagName);
  if (className) {
    const classNames = className.split(' ').filter(Boolean);
    element.classList.add(...classNames);
  }
  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));
  return element;
}

function createHeader(date) {
  const header = createElement({
    tagName: 'header',
    className: 'calendar__header'
  });

  header.innerHTML =
    `<button class="button button--switch button--prev" id="prev">prev</button>
     <span class="month-year" id="month-year">${months[date.getMonth()]} ${date.getFullYear()}</span>
     <button class="button button--switch button--next" id="next">next</button>`
  return header;
}

const today = new Date();
const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
console.log(currentMonth);
function createTable(date) {
  const currentDay = new Date(date.getFullYear(), date.getMonth(), 1);
  currentDay.setDate(1 - date.getDay());
  const table = createElement({
    tagName: 'table',
    className: 'calendar__body',
    attributes: { id: 'table-calendar' }
  });
  table.innerHTML = `
    <tr class="week">
      <th>Su</th>
      <th>Mo</th>
      <th>Tu</th>
      <th>We</th>
      <th>Th</th>
      <th>Fr</th>
      <th>Sa</th>
    </tr>`

  for (let row = 0; row < 6; row++) {
    let tr = createElement({ tagName: 'tr' });
    for (let line = 0; line < 7; line++) {
      let td = createElement({ tagName: 'td', className: 'day' });
      if (currentDay.getMonth() != date.getMonth()) {
        td.classList.add("not-current");
      }
      else if (currentDay.getFullYear() == today.getFullYear() &&
        currentDay.getMonth() == today.getMonth() &&
        currentDay.getDate() == today.getDate()) {
        td.classList.add("today");
      }
      td.innerHTML = currentDay.getDate();
      tr.append(td);
      currentDay.setDate(currentDay.getDate() + 1);
    }
    table.append(tr);
  }
  return table;
}

const calendar = createElement({
  tagName: 'div',
  className: 'calendar',
  attributes: { id: 'calendar' }
});

function changeColor() {
  let selected = null;
  document.querySelector(".calendar__body").addEventListener("click", event => {
    if (event.target.closest(".day")) {
      if (selected) {
        selected.classList.remove("active");
      }

      selected = event.target;

      selected.classList.add("active");
    }
  }, false);
}

function moveToPrev() {
  const prev = document.getElementById('prev');
  prev.addEventListener('click', (event) => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    const monthYear = document.getElementById('month-year');
    monthYear.innerHTML = `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    const tableCalendar = document.getElementById('table-calendar');
    tableCalendar.remove();
    calendar.append(createTable(currentMonth));
    changeColor();
  });
}

function moveToNext() {
  const prev = document.getElementById('next');
  prev.addEventListener('click', (event) => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    const monthYear = document.getElementById('month-year');
    monthYear.innerHTML = `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    const tableCalendar = document.getElementById('table-calendar');
    tableCalendar.remove();
    calendar.append(createTable(currentMonth));
    changeColor();
  });
}

window.onload = function () {
  calendar.append(createHeader(currentMonth));
  calendar.append(createTable(currentMonth));
  document.body.append(calendar);

  changeColor();
  moveToPrev();
  moveToNext();
}