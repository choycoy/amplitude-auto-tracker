"use client";

import { useState, useEffect, useRef } from "react";
import type { AmplitudeEvent } from "../types";
import {
  AMPLITUDE_TRACK_EVENT,
  EVENT_LOG_MAX_SIZE,
  EVENT_LOG_FLASH_DURATION_MS,
} from "../../lib/constants";

function formatTime(now: Date): string {
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => n.toString().padStart(2, "0"))
    .join(":");
}

export function useAmplitudeEventLog(): {
  eventLog: AmplitudeEvent[];
  flashId: number | null;
} {
  const [eventLog, setEventLog] = useState<AmplitudeEvent[]>([]);
  const [flashId, setFlashId] = useState<number | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const { name, displayName, props } = (e as CustomEvent).detail as {
        name: string;
        displayName: string;
        props: Record<string, string | number>;
      };
      const id = ++idRef.current;
      const time = formatTime(new Date());
      const location = String(props.location ?? props.section ?? "");
      setEventLog((prev) =>
        [{ id, name, displayName, location, time }, ...prev].slice(
          0,
          EVENT_LOG_MAX_SIZE
        )
      );
      setFlashId(id);
      setTimeout(() => setFlashId(null), EVENT_LOG_FLASH_DURATION_MS);
    };
    window.addEventListener(AMPLITUDE_TRACK_EVENT, handler);
    return () => window.removeEventListener(AMPLITUDE_TRACK_EVENT, handler);
  }, []);

  return { eventLog, flashId };
}
