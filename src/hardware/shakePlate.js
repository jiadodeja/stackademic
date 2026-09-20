// ============================================================================
// SHAKE PLATE CONTROL
// ----------------------------------------------------------------------------
// Connects the game to the real shake plate over USB (see serialLink.js for
// the actual Web Serial connection code).
//
// If no hardware is connected yet, triggerTowerShake() just no-ops on the
// hardware side — the on-screen falling animation still plays either way,
// so the game is fully playable without the physical rig attached.
// ============================================================================

import { serialLink } from "./serialLink.js";

// Call this from a click handler (Web Serial requires a real user gesture —
// it can't be triggered automatically on page load).
export async function connectHardware() {
  await serialLink.connect();
}

export function isHardwareConnected() {
  return serialLink.connected;
}

export function triggerTowerShake() {
  if (serialLink.connected) {
    serialLink.sendWrong();
  } else {
    // eslint-disable-next-line no-console
    console.log("TOWER SHAKE TRIGGERED (no hardware connected)");
  }
}
