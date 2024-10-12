import { login, logout } from './login';
import '@babel/polyfill';
import { updateData } from './updateSeetings';
import { bookTour } from './stripe';

document.getElementById('logout')?.addEventListener('click', (e) => {
  console.log('logout');
  e.preventDefault();
  logout();
});
document.querySelector('.form--login')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});

document.querySelector('.form-user-data')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append('name', document.getElementById('name').value);
  form.append('email', document.getElementById('email').value);
  form.append('photo', document.getElementById('photo').files[0]);
  console.log(form);
  updateData(form, 'data');
});

document
  .querySelector('.form-user-password')
  ?.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    updateData({ passwordCurrent, password, passwordConfirm }, 'password');
  });
document.getElementById('book-tour')?.addEventListener('click', (e) => {
  e.target.textContent = 'processing';
  const { tourId } = e.target.dataset;
  bookTour(tourId);
});
