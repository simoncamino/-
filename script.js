// 메인 슬라이드
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let slideInterval = null;

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === index);
  });
  dots.forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  let next = currentSlide + 1;
  if (next >= slides.length) next = 0;
  showSlide(next);
}

function startSlide() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

// 점 클릭 이벤트
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);
    showSlide(index);
    startSlide();
  });
});

// 처음 시작
if (slides.length > 0) {
  showSlide(0);
  startSlide();
}

// 탭 메뉴
const tabItems = document.querySelectorAll(".tab-item");
const tabPanels = document.querySelectorAll(".tab-panel");

tabItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = item.dataset.tab;

    tabItems.forEach((t) => t.classList.remove("active"));
    item.classList.add("active");

    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === targetId);
    });
  });
});
// 순례길 코스 탭 전환
const routeTabs = document.querySelectorAll(".route-tab");
const routePanels = document.querySelectorAll(".route-panel");

routeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    // 탭 active 변경
    routeTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // 패널 active 변경
    routePanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.target === target);
    });
  });
});
