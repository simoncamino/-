// main.js
document.addEventListener('DOMContentLoaded', function () {
  const allMenuBtn = document.querySelector('.all-menu-btn');
  const gnb = document.querySelector('.gnb');
  const body = document.body;

  // 햄버거 버튼 클릭 시 전체 메뉴 열기/닫기
  if (allMenuBtn && gnb) {
    allMenuBtn.addEventListener('click', function () {
      gnb.classList.toggle('is-open');
      allMenuBtn.classList.toggle('is-open');
      body.classList.toggle('no-scroll'); // 모바일에서 뒷배경 스크롤 방지용
    });
  }

  // 상위 메뉴 클릭 시 서브메뉴 토글 (모바일)
  const topLinks = document.querySelectorAll('.gnb-item > a');

  topLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const parentLi = this.parentElement;
      const subMenu = parentLi.querySelector('.sub-menu');

      // 서브메뉴가 있는 경우에만 동작
      if (subMenu) {
        e.preventDefault();

        const isAlreadyOpen = parentLi.classList.contains('open');

        // 다른 메뉴는 닫기
        document.querySelectorAll('.gnb-item.open').forEach(function (item) {
          item.classList.remove('open');
        });

        // 이미 열려 있지 않았다면 이번 것 열기
        if (!isAlreadyOpen) {
          parentLi.classList.add('open');
        }
      }
    });
  });
});
