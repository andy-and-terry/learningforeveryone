/* ============================================================
   DEVTOOLS RESISTANCE CONTINUUM (DRC)
   VERSION: unnecessarily-long-1.0.0
   PURPOSE: deterrence, annoyance, psychological warfare
   DISCLAIMER: not real security, just pain
   ============================================================ */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     SECTION 0: GLOBAL STATE THAT DOES NOT NEED TO EXIST
     ------------------------------------------------------------ */

  const DRC_STATE = {
    initialized: false,
    devtoolsSuspected: false,
    lastCheck: 0,
    suspicionLevel: 0,
    paranoiaMode: true,
    rage: 9001
  };

  const DRC_CONFIG = {
    CHECK_INTERVAL_MS: 500,
    SIZE_THRESHOLD: 160,
    MAX_SUSPICION: 5,
    CONSOLE_SPAM: true,
    BLOCK_CONTEXT_MENU: true,
    BLOCK_KEYS: true,
    REDIRECT_ON_DETECTION: false,
    REDIRECT_URL: "index.html"
  };

  /* ------------------------------------------------------------
     SECTION 1: UTILITY FUNCTIONS THAT COULD BE ONE LINE
     ------------------------------------------------------------ */

  function now() {
    return Date.now();
  }

  function log() {
    if (!DRC_CONFIG.CONSOLE_SPAM) return;
    try {
      console.log.apply(console, arguments);
    } catch (_) {}
  }

  function warn() {
    try {
      console.warn.apply(console, arguments);
    } catch (_) {}
  }

  function noop() {}

  /* ------------------------------------------------------------
     SECTION 2: KEYBOARD COMBINATION INTERCEPTOR
     ------------------------------------------------------------ */

  function isForbiddenCombo(e) {
    const k = (e.key || "").toLowerCase();

    return (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && k === "i") ||
      (e.ctrlKey && e.shiftKey && k === "j") ||
      (e.ctrlKey && e.shiftKey && k === "c") ||
      (e.ctrlKey && k === "u") ||
      (e.ctrlKey && k === "s")
    );
  }

  function blockKeyCombos() {
    document.addEventListener(
      "keydown",
      function (e) {
        if (!DRC_CONFIG.BLOCK_KEYS) return;

        if (isForbiddenCombo(e)) {
          e.preventDefault();
          e.stopPropagation();
          escalateSuspicion("Keyboard shortcut detected");
          return false;
        }
      },
      true
    );
  }

  /* ------------------------------------------------------------
     SECTION 3: CONTEXT MENU OBLITERATION
     ------------------------------------------------------------ */

  function blockContextMenu() {
    if (!DRC_CONFIG.BLOCK_CONTEXT_MENU) return;

    document.addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
        escalateSuspicion("Right click detected");
        return false;
      },
      true
    );
  }

  /* ------------------------------------------------------------
     SECTION 4: DEVTOOLS DETECTION — WINDOW SIZE HEURISTICS
     ------------------------------------------------------------ */

  function sizeHeuristicTriggered() {
    const wDiff = Math.abs(window.outerWidth - window.innerWidth);
    const hDiff = Math.abs(window.outerHeight - window.innerHeight);
    return wDiff > DRC_CONFIG.SIZE_THRESHOLD || hDiff > DRC_CONFIG.SIZE_THRESHOLD;
  }

  /* ------------------------------------------------------------
     SECTION 5: DEVTOOLS DETECTION — DEBUGGER TRAP
     ------------------------------------------------------------ */

  function debuggerTrapTriggered() {
    const start = now();
    debugger; // yes, intentionally
    const end = now();
    return end - start > 100;
  }

  /* ------------------------------------------------------------
     SECTION 6: DEVTOOLS DETECTION — CONSOLE BAIT
     ------------------------------------------------------------ */

  function consoleBaitTriggered() {
    let opened = false;
    const bait = new Image();
    Object.defineProperty(bait, "id", {
      get() {
        opened = true;
        return "bait";
      }
    });
    console.log(bait);
    return opened;
  }

  /* ------------------------------------------------------------
     SECTION 7: SUSPICION MANAGEMENT SYSTEM (OVERENGINEERED)
     ------------------------------------------------------------ */

  function escalateSuspicion(reason) {
    DRC_STATE.suspicionLevel++;
    DRC_STATE.devtoolsSuspected = true;

    warn("[DRC] Suspicion escalated:", reason);
    warn("[DRC] Level:", DRC_STATE.suspicionLevel);

    if (DRC_STATE.suspicionLevel >= DRC_CONFIG.MAX_SUSPICION) {
      reactToDetection();
    }
  }

  function reactToDetection() {
    warn("[DRC] DevTools activity detected.");

    if (DRC_CONFIG.REDIRECT_ON_DETECTION) {
      location.href = DRC_CONFIG.REDIRECT_URL;
    } else {
      log(
        "%cSTOP.",
        "font-size: 48px; color: red; font-weight: bold;"
      );
      log(
        "%cThis page does not support inspection.",
        "font-size: 16px;"
      );
      log(
        "%cLook at out github if you want to inspect; this is for privacy reasons. Thanks! If you REALLY REALLY WANT to see the source, pls just not do anything bad. We trust you (kinda).",
        "font-size: 16px;"
      );
    }
  }

  /* ------------------------------------------------------------
     SECTION 8: PERIODIC SCANNING LOOP (WHY NOT)
     ------------------------------------------------------------ */

  function periodicCheck() {
    if (sizeHeuristicTriggered()) {
      escalateSuspicion("Window size anomaly");
    }

    try {
      if (debuggerTrapTriggered()) {
        escalateSuspicion("Debugger delay detected");
      }
    } catch (_) {}

    try {
      if (consoleBaitTriggered()) {
        escalateSuspicion("Console inspection detected");
      }
    } catch (_) {}
  }

  function startScanner() {
    setInterval(periodicCheck, DRC_CONFIG.CHECK_INTERVAL_MS);
  }

  /* ------------------------------------------------------------
     SECTION 9: INIT
     ------------------------------------------------------------ */

  function init() {
    if (DRC_STATE.initialized) return;

    DRC_STATE.initialized = true;
    fakeBootLogs();
    blockKeyCombos();
    blockContextMenu();
    startScanner();
  }

  init();

})();
