/** CustomEvent name dispatched when an Amplitude event is tracked (for UI log). */
export const AMPLITUDE_TRACK_EVENT = "amplitude:track" as const;

/** Max number of events to keep in the event log panel. */
export const EVENT_LOG_MAX_SIZE = 10;

/** Duration in ms to highlight the latest event in the log. */
export const EVENT_LOG_FLASH_DURATION_MS = 1200;
