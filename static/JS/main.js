// main.js — Portfolio interactions
// Scroll reveal · Counter animation · Card tilt · Nav shrink

(function () {

  // ── Scroll Reveal ─────────────────────────────────────────
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger')
    .forEach(function (el) { revealObserver.observe(el); });

  // trigger elements already in view on page load
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger')
    .forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });


  // ── Counter Animation ─────────────────────────────────────
  function animateCounter(el, target) {
    var duration  = 1400;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);         // ease-out cubic
      var suffix   = target === 100 ? '%' : '+';
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(function (el) {
          animateCounter(el, parseInt(el.dataset.count, 10));
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stats-grid').forEach(function (el) {
    counterObserver.observe(el);
  });


  // ── Project Card 3-D Tilt ─────────────────────────────────
  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x    = (e.clientX - rect.left) / rect.width  - 0.5;
      var y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = [
        'translateY(-8px)',
        'rotateX(' + (-y * 6) + 'deg)',
        'rotateY(' + ( x * 6) + 'deg)'
      ].join(' ');
    });

    card.addEventListener('mouseleave', function () {
      card.style.transition = 'transform .4s ease';
      card.style.transform  = '';
      setTimeout(function () { card.style.transition = ''; }, 400);
    });
  });


  // ── Nav Shrink on Scroll ──────────────────────────────────
  var nav = document.querySelector('nav');
  window.addEventListener('scroll', function () {
    nav.style.padding = window.scrollY > 40 ? '10px 0' : '18px 0';
  }, { passive: true });

})();
