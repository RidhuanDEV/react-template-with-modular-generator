// skills-cli/telemetry/watchdog/main.ts
import process2 from "node:process";
import readline from "node:readline";
import { parseArgs } from "node:util";

// skills-cli/telemetry/types.ts
var WatchdogMessageType = {
  LOG_EVENT: "log-event"
};

// skills-cli/telemetry/watchdog/ClearcutSender.ts
var MAX_BUFFER_SIZE = 1e3;
var DEFAULT_CLEARCUT_ENDPOINT = "https://play.googleapis.com/log?format=json_proto";
var LOG_SOURCE = 2921;
var CLIENT_TYPE = 50;
var REQUEST_TIMEOUT_MS = 1e4;
var SHUTDOWN_TIMEOUT_MS = 5e3;
function logger(...args) {
  if (process.env.DEBUG_MWG_TELEMETRY === "1") {
    console.error("[ClearcutSender]", ...args);
  }
}
var ClearcutSender = class {
  #clearcutEndpoint;
  #includePidHeader;
  #buffer = [];
  constructor(config = {}) {
    this.#clearcutEndpoint = config.clearcutEndpoint ?? DEFAULT_CLEARCUT_ENDPOINT;
    this.#includePidHeader = config.includePidHeader ?? false;
  }
  enqueueEvent(event) {
    logger("Enqueuing telemetry event", JSON.stringify(event, null, 2));
    if (this.#buffer.length >= MAX_BUFFER_SIZE) {
      this.#buffer.shift();
      logger("Telemetry buffer overflow: dropped oldest event");
    }
    this.#buffer.push({
      event,
      timestamp: Date.now()
    });
  }
  async sendShutdownEvent() {
    if (this.#buffer.length === 0) {
      return;
    }
    const eventsToSend = [...this.#buffer];
    this.#buffer = [];
    try {
      await Promise.race([
        this.#sendBatch(eventsToSend),
        new Promise((resolve) => setTimeout(resolve, SHUTDOWN_TIMEOUT_MS))
      ]);
      logger("Final flush completed");
    } catch (error) {
      logger("Final flush failed:", error);
    }
  }
  async #sendBatch(events) {
    logger(`Sending batch of ${events.length} events`);
    const requestBody = {
      log_source: LOG_SOURCE,
      request_time_ms: Date.now().toString(),
      client_info: {
        client_type: CLIENT_TYPE
      },
      log_event: events.map(({ event, timestamp }) => ({
        event_time_ms: timestamp.toString(),
        source_extension_json: JSON.stringify(event)
      }))
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(this.#clearcutEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.#includePidHeader ? { "X-Watchdog-Pid": process.pid.toString() } : {}
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        logger("Telemetry error status:", response.status);
      }
    } catch (err) {
      clearTimeout(timeoutId);
      logger("Fetch failed:", err);
    }
  }
};

// skills-cli/telemetry/watchdog/main.ts
function parseWatchdogArgs() {
  const { values } = parseArgs({
    options: {
      "clearcut-endpoint": { type: "string" },
      "clearcut-include-pid-header": { type: "boolean" }
    },
    strict: true
  });
  const clearcutEndpoint = values["clearcut-endpoint"];
  const clearcutIncludePidHeader = values["clearcut-include-pid-header"];
  return {
    clearcutEndpoint,
    clearcutIncludePidHeader
  };
}
function main() {
  const {
    clearcutEndpoint,
    clearcutIncludePidHeader
  } = parseWatchdogArgs();
  const sender = new ClearcutSender({
    clearcutEndpoint,
    includePidHeader: clearcutIncludePidHeader
  });
  let isShuttingDown = false;
  function onParentDeath() {
    if (isShuttingDown) {
      return;
    }
    isShuttingDown = true;
    sender.sendShutdownEvent().then(() => process2.exit(0)).catch(() => process2.exit(1));
  }
  process2.stdin.on("end", () => onParentDeath());
  process2.stdin.on("close", () => onParentDeath());
  process2.on("disconnect", () => onParentDeath());
  const rl = readline.createInterface({
    input: process2.stdin,
    terminal: false
  });
  rl.on("line", (line) => {
    try {
      if (!line.trim()) {
        return;
      }
      const msg = JSON.parse(line);
      if (msg.type === WatchdogMessageType.LOG_EVENT && msg.payload) {
        sender.enqueueEvent(msg.payload);
      }
    } catch (err) {
      console.error("Failed to parse IPC message", err);
    }
  });
}
try {
  main();
} catch (err) {
  console.error("Watchdog fatal error:", err);
  process2.exit(1);
}
/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
