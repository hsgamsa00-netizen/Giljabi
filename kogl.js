"use strict";
/* 공공누리 제4유형 마크 — KOGL 공식 배포 원본 이미지(img_opentype04.jpg, 488×130) 로컬 표시.
   100% 로컬 정적 <img>(외부요청 0·망분리 유지). 변형금지 준수: 비율 보존(object-fit)·여백(흰 카드)·필터/오버레이 없음.
   [data-kogl4] 요소에 자동 주입. window.koglMark4()로도 호출 가능. */
window.koglMark4 = function () {
  return '<span class="kogl-card"><img class="kogl-img" src="img/img_opentype04.jpg" decoding="async" ' +
         'alt="공공누리 제4유형 — 출처표시·상업적 이용금지·변경금지(공공저작물 자유이용 허락)"></span>';
};
document.addEventListener("DOMContentLoaded", function () {
  try { document.querySelectorAll("[data-kogl4]").forEach(el => { el.innerHTML = window.koglMark4(); }); } catch (e) {}
});
