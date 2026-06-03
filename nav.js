// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const ul = document.querySelector('nav ul');
  if (toggle && ul) {
    toggle.addEventListener('click', function () {
      ul.classList.toggle('open');
    });
  }
});
