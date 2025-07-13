"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const arrowBttn = document.querySelector(".arrow-bttn");
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 10) {
      header.classList.add("scrolled");
      arrowBttn.classList.add("active");
    } else {
      header.classList.remove("scrolled");
      arrowBttn.classList.remove("active");
    }
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  const container = document.querySelector(".services-container");
  const scrollLeftBtn = document.querySelector(".scroll-left");
  const scrollRightBtn = document.querySelector(".scroll-right");
  const scrollAmount = container.clientWidth * 0.5;

  scrollRightBtn.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  scrollLeftBtn.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  function updateArrows() {
    const maxScroll = container.scrollWidth - container.clientWidth;
    scrollLeftBtn.style.display = container.scrollLeft > 10 ? "flex" : "none";
    scrollRightBtn.style.display =
      container.scrollLeft < maxScroll - 10 ? "flex" : "none";
  }

  container.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);
  updateArrows();

  // === COUNTER ANIMATION ===
  const counters = document.querySelectorAll(".counter-value");
  let hasAnimated = false;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.textContent;
      let frame = 0;
      const duration = 2500;
      const frameRate = 60;
      const totalFrames = Math.round((duration / 1000) * frameRate);
      const increment = target / totalFrames;

      counter.textContent = "0";

      const counterInterval = setInterval(() => {
        frame++;
        const value = Math.min(Math.round(increment * frame), target);
        counter.textContent = value;

        if (value >= target) {
          clearInterval(counterInterval);
        }
      }, 1000 / frameRate);
    });
  };

  const section = document.querySelector(".three");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  });

  if (section) {
    observer.observe(section);
  }

  // === SIDEBAR TOGGLE ===
  const contentWrapper = document.getElementById("content-wrapper");

  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const body = document.body;

  let menuOpen = false;

  const closeMenu = () => {
    menuOpen = false;
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    contentWrapper.classList.remove("shifted");
    body.style.overflow = "auto";
    body.style.pointerEvents = "auto";
    contentWrapper.style.pointerEvents = "auto";
  };

  burger.addEventListener("click", () => {
    menuOpen = !menuOpen;

    sidebar.classList.toggle("active", menuOpen);
    overlay.classList.toggle("active", menuOpen);
    contentWrapper.classList.toggle("shifted", menuOpen);

    if (menuOpen) {
      body.style.overflow = "hidden";
      body.style.pointerEvents = "none";
      contentWrapper.style.pointerEvents = "none";
      sidebar.style.pointerEvents = "auto";
    } else {
      closeMenu();
    }
  });

  overlay.addEventListener("click", closeMenu);
});
