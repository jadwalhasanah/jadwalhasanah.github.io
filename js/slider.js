 const slides = document.querySelectorAll('.bg-slide');
  let slideIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  setInterval(() => {
    showSlide(slideIndex);
    slideIndex = (slideIndex + 1) % slides.length;
  }, 20000); // ganti gambar setiap 20 detik

  window.onload = function () {
    showSlide(slideIndex);
    waktuSholat();
  };