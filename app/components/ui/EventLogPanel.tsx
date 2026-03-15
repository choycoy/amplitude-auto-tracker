"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import type { AmplitudeEvent } from "../../types";

interface EventLogPanelProps {
  events: AmplitudeEvent[];
  isOpen: boolean;
  onToggle: () => void;
  flashId: number | null;
}

export function EventLogPanel({
  events,
  isOpen,
  onToggle,
  flashId,
}: EventLogPanelProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <div className="bg-gray-950 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm font-mono font-semibold">
              Amplitude 이벤트
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full font-mono font-semibold">
              LIVE
            </span>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </button>

        {isOpen && (
          <div className="max-h-64 overflow-y-auto">
            {events.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-500 text-xs font-mono">
                버튼을 클릭하면 Amplitude 이벤트가 표시됩니다
              </div>
            ) : (
              <ul>
                {events.map((ev) => (
                  <li
                    key={ev.id}
                    className={`px-4 py-2.5 border-t border-gray-800 transition-colors duration-300 ${flashId === ev.id ? "bg-green-900/40" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-green-400 text-xs font-mono font-semibold truncate max-w-[200px]">
                        {ev.name}
                      </span>
                      <span className="text-gray-500 text-xs font-mono ml-2 flex-shrink-0">
                        {ev.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-gray-400 text-xs truncate">
                        {ev.displayName}
                      </span>
                      {ev.location && ev.location !== "index" && (
                        <span className="bg-indigo-900/60 text-indigo-300 text-xs px-1.5 py-0.5 rounded font-mono flex-shrink-0">
                          📍 {ev.location}
                        </span>
                      )}
                      <span className="text-gray-600 text-xs flex-shrink-0">
                        → api2.amplitude.com
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
