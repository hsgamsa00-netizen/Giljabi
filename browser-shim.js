"use strict";
/* =========================================================
   감사 길잡이 — 비설치(브라우저)용 호환 shim
   Electron preload가 주입하던 window.api 를 브라우저 환경에서 대체한다.
   · 설정(OC): localStorage 에 저장 (Electron userData/settings.json 대체)
   · 법제처 OpenAPI 인앱 조문 조회: 브라우저 CORS 정책상 직접 호출 불가
       → 실패를 반환하면 렌더러가 자동으로 '국가법령정보센터' 외부 링크로 폴백
         (OC 미설정 시 기본 동작과 동일)
   · 네이티브 메뉴 이벤트(intro/follow/about): 화면 내 ❓ 도움말 버튼으로 대체 → no-op
   ========================================================= */
(function () {
  if (window.api) return;   // Electron 등에서 이미 주입됐으면 손대지 않음
  window.IS_WEB = true;     // 브라우저(비설치)판 표식 — 렌더러가 웹 전용 안내(OC 미지원 등) 분기에 사용
  function ls(get, key, val) {
    try { return get ? (window.localStorage.getItem(key) || "")
                     : (val ? window.localStorage.setItem(key, val) : window.localStorage.removeItem(key)); }
    catch (e) { return ""; }
  }
  window.api = {
    settings: {
      get: function () { return Promise.resolve({ lawApiOc: ls(true, "lawApiOc") }); },
      set: function (p) {
        if (p && typeof p.lawApiOc === "string") ls(false, "lawApiOc", p.lawApiOc.trim());
        return Promise.resolve({});
      },
    },
    law: {
      article: function () {
        return Promise.resolve({ ok: false,
          error: "브라우저(비설치)판은 인앱 조문 조회를 지원하지 않습니다 — ‘국가법령정보센터에서 보기’를 이용하세요" });
      },
      testOc: function () {
        return Promise.resolve({ ok: false, error: "브라우저(비설치)판은 법제처 연결 확인을 지원하지 않습니다" });
      },
    },
    onIntroReopen: function () {},
    onFollowStart: function () {},
    onAboutOpen: function () {},
  };
})();
