import * as amplitude from "@amplitude/analytics-browser";
import eventNames from "./event-names.json";
import { AMPLITUDE_TRACK_EVENT } from "./constants";

const eventMap: Record<string, string> = eventNames;

/**
 * 버튼/링크의 표시 텍스트를 event-names.json과 매칭해 Amplitude 이벤트 이름을 반환합니다.
 * @param text - 요소의 textContent (한글 등)
 * @returns snake_case 이벤트 이름. 매핑 없으면 "button_clicked"
 */
function getEventName(text: string): string {
  if (!text) return "button_clicked";
  return eventMap[text.trim()] ?? "button_clicked";
}

/**
 * 클릭한 요소에서 부모로 올라가며 시맨틱 태그를 찾아 location 레이블을 추론합니다.
 * data-location이 없을 때 사용. nav → "navbar", header/footer/main/aside/section[id] 등.
 * @param el - 클릭된 버튼/링크 요소
 * @returns "navbar" | "header" | "footer" | "main" | "aside" | section id | "section_N" | "page"
 */
function inferLocationFromDOM(el: HTMLElement): string {
  let current: HTMLElement | null = el.parentElement;
  while (current && current !== document.body) {
    const tag = current.tagName.toLowerCase();
    if (tag === "nav") return current.id || "navbar";
    if (tag === "header") return current.id || "header";
    if (tag === "footer") return current.id || "footer";
    if (tag === "main") return current.id || "main";
    if (tag === "aside") return current.id || "aside";
    if (tag === "section") {
      if (current.id) return current.id;
      const sections = Array.from(document.querySelectorAll("section"));
      const idx = sections.indexOf(current);
      return idx >= 0 ? `section_${idx + 1}` : "section";
    }
    current = current.parentElement;
  }
  return "page";
}

/**
 * 이벤트 속성에 넣을 location, section, buttonType을 결정합니다.
 * data-location / data-section / data-button-type이 있으면 우선 사용하고,
 * 없으면 inferLocationFromDOM 및 section[id], nav/header 여부로 추론합니다.
 * @param el - 클릭된 버튼/링크 요소
 * @param tagName - "BUTTON" | "A"
 * @returns { buttonType, location, section } (항상 값 있음, 기본값 "page" / "main" / "button"|"link")
 */
function inferContext(
  el: HTMLElement,
  tagName: string
): {
  buttonType: string;
  location: string;
  section: string;
} {
  const pathSegment =
    typeof window !== "undefined" && window.location?.pathname
      ? window.location.pathname.replace(/^\/|\/$/g, "").split("/")[0] ||
        "index"
      : "page";

  let location = el.dataset.location ?? "";
  if (!location) location = inferLocationFromDOM(el) || pathSegment;

  let section = el.dataset.section ?? "";
  if (!section) {
    const sectionEl = el.closest("section[id]");
    if (sectionEl) section = (sectionEl as HTMLElement).id || "";
    if (!section) {
      const inNav = el.closest("nav");
      const inHeader = el.closest("header");
      if (inNav || inHeader) section = "header";
      else section = pathSegment;
    }
  }

  const buttonType =
    el.dataset.buttonType ?? (tagName === "A" ? "link" : "button");

  return {
    buttonType,
    location: location || "page",
    section: section || "main",
  };
}

/**
 * autoTagDuplicateElements 전용: DOM 상위 탐색으로 location 레이블을 추론합니다.
 * inferLocationFromDOM과 동일 로직이나 nav일 때 "nav" 반환 (DOM 마킹용).
 * @param el - 버튼/링크 요소
 * @returns "nav" | "header" | "footer" | "main" | "aside" | section id | "section_N" | "page"
 */
function inferLocationLabel(el: HTMLElement): string {
  let current: HTMLElement | null = el.parentElement;
  while (current && current !== document.body) {
    const tag = current.tagName.toLowerCase();
    if (tag === "nav") return current.id || "nav";
    if (tag === "header") return current.id || "header";
    if (tag === "footer") return current.id || "footer";
    if (tag === "main") return current.id || "main";
    if (tag === "aside") return current.id || "aside";
    if (tag === "section") {
      if (current.id) return current.id;
      const sections = Array.from(document.querySelectorAll("section"));
      const idx = sections.indexOf(current);
      return idx >= 0 ? `section_${idx + 1}` : "section";
    }
    current = current.parentElement;
  }
  return "page";
}

/**
 * 같은 텍스트를 가진 버튼/링크가 여러 개일 때, data-location이 없는 요소에만
 * DOM 추론 결과를 data-location으로 넣어 Amplitude에서 구분 가능하게 합니다.
 * DOMContentLoaded 후 한 번, 이후 MutationObserver로 DOM 변경 시 디바운스 후 재실행.
 */
function autoTagDuplicateElements() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>("button, a")
  );

  const groups = new Map<string, HTMLElement[]>();
  for (const el of elements) {
    const text = el.textContent?.trim();
    if (!text) continue;
    if (!groups.has(text)) groups.set(text, []);
    groups.get(text)!.push(el);
  }

  for (const [, els] of groups) {
    if (els.length <= 1) continue;
    for (const el of els) {
      if (!el.dataset.location) {
        el.dataset.location = inferLocationLabel(el);
      }
    }
  }
}

let trackingInitialized = false;
let autoTagDebounceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * autoTagDuplicateElements를 200ms 디바운스로 예약합니다.
 * MutationObserver 콜백에서 연속 DOM 변경 시 한 번만 실행되도록 합니다.
 */
function scheduleAutoTag() {
  if (autoTagDebounceTimer) clearTimeout(autoTagDebounceTimer);
  autoTagDebounceTimer = setTimeout(() => {
    autoTagDuplicateElements();
    autoTagDebounceTimer = null;
  }, 200);
}

/**
 * Amplitude SDK를 초기화하고 자동 클릭 추적을 설정합니다.
 * - SDK 기본 추적(세션, 페이지뷰, 폼, 다운로드) 활성화
 * - 중복 텍스트 요소에 data-location 자동 부여 (autoTagDuplicateElements)
 * - button/a 클릭 시 event-names.json + inferContext로 이벤트 전송
 * 중복 호출 시 한 번만 실행됩니다.
 */
export function initAmplitude() {
  amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || "", undefined, {
    defaultTracking: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
      fileDownloads: true,
    },
  });

  if (typeof window === "undefined") return;
  if (trackingInitialized) return;
  trackingInitialized = true;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoTagDuplicateElements);
  } else {
    autoTagDuplicateElements();
  }

  const observer = new MutationObserver(scheduleAutoTag);
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const tagName = target.tagName;
    const ctx = inferContext(target, tagName);

    if (tagName === "BUTTON") {
      const buttonText = target.textContent?.trim() || "";
      handleTrackEvent(getEventName(buttonText), buttonText, {
        button_text: buttonText,
        button_class: target.className || "",
        element_id: target.id || "",
        element_type: "button",
        text_length: buttonText.length,
        button_type: ctx.buttonType,
        location: ctx.location,
        section: ctx.section,
      });
    }

    if (tagName === "A") {
      const linkText = target.textContent?.trim() || "";
      handleTrackEvent(getEventName(linkText), linkText, {
        link_text: linkText,
        link_href: (target as HTMLAnchorElement).href || "",
        element_id: target.id || "",
        element_type: "link",
        text_length: linkText.length,
        button_type: ctx.buttonType,
        location: ctx.location,
        section: ctx.section,
      });
    }
  });
}

/**
 * Amplitude에 이벤트를 전송하고, 동일 payload로 AMPLITUDE_TRACK_EVENT 커스텀 이벤트를 발생시킵니다.
 * @param logName - Amplitude 이벤트 이름 (snake_case)
 * @param displayName - event_display_name에 들어갈 표시용 텍스트 (한글 등)
 * @param customFields - 추가 이벤트 속성 (button_text, location, section 등)
 */
export function handleTrackEvent(
  logName: string,
  displayName: string,
  customFields: Record<string, string | number> = {}
) {
  amplitude.track(logName, {
    ...customFields,
    event_display_name: String(displayName || ""),
  });

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(AMPLITUDE_TRACK_EVENT, {
        detail: { name: logName, displayName, props: customFields },
      })
    );
  }
}
