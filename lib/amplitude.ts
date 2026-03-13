import * as amplitude from "@amplitude/analytics-browser";
import eventNames from "./event-names.json";

const eventMap: Record<string, string> = eventNames;

function getEventName(text: string): string {
  if (!text) return "button_clicked";
  return eventMap[text.trim()] ?? "button_clicked";
}

/**
 * 버튼/링크에 붙은 data-* 속성을 조회하여 이벤트 속성을 생성합니다.
 * @param el - 버튼/링크 요소
 * @param tagName - 버튼/링크 태그 이름
 * @returns 이벤트 속성
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

  let section = el.dataset.section ?? "";
  if (!section) {
    const sectionEl = el.closest("section[id]");
    if (sectionEl) section = (sectionEl as HTMLElement).id || "";
    if (!section) section = pathSegment;
  }

  let location = el.dataset.location ?? "";
  if (!location) location = section || pathSegment;

  const buttonType =
    el.dataset.buttonType ?? (tagName === "A" ? "link" : "button");

  return {
    buttonType,
    location: location || "page",
    section: section || "main",
  };
}

/**
 * 중복 텍스트 버튼/링크를 DOM 컨텍스트로부터 data-location 속성을 자동으로 삽입합니다.
 * @param el - 버튼/링크 요소
 * @returns 유추된 위치 레이블
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
 * 동일한 텍스트를 가진 버튼/링크에 data-location 속성을 자동으로 삽입합니다.
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

function scheduleAutoTag() {
  if (autoTagDebounceTimer) clearTimeout(autoTagDebounceTimer);
  autoTagDebounceTimer = setTimeout(() => {
    autoTagDuplicateElements();
    autoTagDebounceTimer = null;
  }, 200);
}

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

export function handleTrackEvent(
  logName: string,
  displayName: string,
  customFields: Record<string, string | number> = {}
) {
  amplitude.track(logName, {
    ...customFields,
    event_display_name: String(displayName || ""),
  });
}
