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
document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.querySelector('.all-menu-btn');
  const gnb = document.querySelector('.gnb');
  const depth1Links = document.querySelectorAll('.gnb-item > a');

  if (menuBtn && gnb) {
    // 햄버거 클릭 시 전체 메뉴 열고/닫기
    menuBtn.addEventListener('click', function () {
      const isOpen = gnb.classList.toggle('is-open');
      menuBtn.classList.toggle('is-active', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });
  }

  // 모바일에서 1차 메뉴를 눌렀을 때 서브메뉴 토글 (href="#" 일 때만)
  depth1Links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const parent = this.parentElement;
      const sub = parent.querySelector('.sub-menu');
      const href = this.getAttribute('href');

      // 화면이 모바일이고, 서브메뉴가 있고, 실제 링크가 없는 메뉴면 토글만
      if (window.innerWidth <= 768 && sub && (!href || href === '#')) {
        e.preventDefault();
        parent.classList.toggle('open');
      }
    });
  });

  // 화면 크기 다시 키우면 메뉴/스크롤 상태 초기화
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && gnb) {
      gnb.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      if (menuBtn) menuBtn.classList.remove('is-active');
    }
  });
});
// ===============================
// 모바일 GNB 상위메뉴 열기/닫기 토글
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const gnbItems = document.querySelectorAll('.gnb-item');

  gnbItems.forEach(function (item) {
    const link = item.querySelector(':scope > a');
    const subMenu = item.querySelector(':scope > .sub-menu');

    // 서브메뉴가 없는 상위 항목은 패스
    if (!link || !subMenu) return;

    link.addEventListener('click', function (e) {
      // PC에서는 원래 링크 동작 그대로 두기
      if (window.innerWidth > 768) return;

      // 모바일에서는 링크 이동 막고, 열기/닫기로만 사용
      e.preventDefault();

      const isOpen = item.classList.contains('open');

      if (isOpen) {
        // 이미 열린 상태 → 닫기
        item.classList.remove('open');
        subMenu.style.maxHeight = null;
      } else {
        // 닫힌 상태 → 열기 (다른 항목은 닫고 싶으면 아래 주석 해제)
        /*
        gnbItems.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('open');
            const otherSub = other.querySelector(':scope > .sub-menu');
            if (otherSub) otherSub.style.maxHeight = null;
          }
        });
        */
        item.classList.add('open');
        subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
      }
    });
  });

  // 화면을 가로로 키웠을 때(태블릿/PC로 전환) 메뉴 상태 리셋
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      gnbItems.forEach(function (item) {
        item.classList.remove('open');
        const subMenu = item.querySelector(':scope > .sub-menu');
        if (subMenu) subMenu.style.maxHeight = null;
      });
    }
  });
});
