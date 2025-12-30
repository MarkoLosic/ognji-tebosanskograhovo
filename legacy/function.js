///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

if (btnNavEl && headerEl) {
  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });
}

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    if (
      link.classList.contains("carousel-control-prev") ||
      link.classList.contains("carousel-control-next")
    ) {
      return;
    }
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll to other links
    if (href && href !== "#" && href.startsWith("#")) {
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link") && headerEl)
      headerEl.classList.remove("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

if (sectionHeroEl) {
  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];

      if (ent.isIntersecting === false) {
        document.body.classList.add("sticky");
      }

      if (ent.isIntersecting === true) {
        document.body.classList.remove("sticky");
      }
    },
    {
      // In the viewport
      root: null,
      threshold: 0,
      rootMargin: "-80px",
    }
  );
  obs.observe(sectionHeroEl);
}

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

checkFlexGap();

///////////////////////////////////////////////////////////
// Simple carousel controls (no Bootstrap JS dependency)
const carousels = document.querySelectorAll(".carousel");

carousels.forEach(function (carouselEl) {
  const items = Array.from(carouselEl.querySelectorAll(".carousel-item"));
  const indicators = Array.from(
    carouselEl.querySelectorAll(".carousel-indicators li")
  );
  const prevBtn = carouselEl.querySelector(".carousel-control-prev");
  const nextBtn = carouselEl.querySelector(".carousel-control-next");

  if (items.length === 0) return;

  let currentIndex = items.findIndex(function (item) {
    return item.classList.contains("active");
  });

  if (currentIndex === -1) currentIndex = 0;

  function setActive(index) {
    currentIndex = (index + items.length) % items.length;
    items.forEach(function (item, i) {
      item.classList.toggle("active", i === currentIndex);
    });
    indicators.forEach(function (indicator, i) {
      indicator.classList.toggle("active", i === currentIndex);
    });
  }

  function goToNext() {
    setActive(currentIndex + 1);
  }

  function goToPrev() {
    setActive(currentIndex - 1);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      goToPrev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      goToNext();
    });
  }

  indicators.forEach(function (indicator, i) {
    indicator.addEventListener("click", function (e) {
      e.preventDefault();
      setActive(i);
    });
  });

  if (carouselEl.getAttribute("data-ride") === "carousel") {
    setInterval(goToNext, 6000);
  }
});
