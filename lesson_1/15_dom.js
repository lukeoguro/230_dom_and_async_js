// Q1
document.getElementById('primary_heading').classList.add('heading');

// Q2
document.getElementById('list').classList.add('bulleted');

// Q3
document.getElementById('toggle').onclick = e => {
  e.preventDefault();
  let notice = document.getElementById('notice');
  notice.classList.toggle('hidden');
  notice.classList.toggle('visible');
}

// Q4
document.getElementById('notice').onclick = function (e) {
  e.currentTarget.classList.toggle('hidden');
  e.currentTarget.classList.toggle('visible');
};

// Q5
document.getElementById('multiplication').textContent = String(13 * 9);

// Q6
document.body.setAttribute('id', 'styled');