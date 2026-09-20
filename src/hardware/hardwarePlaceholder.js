// ============================================================================
// HARDWARE INTEGRATION PLACEHOLDER
// ----------------------------------------------------------------------------
// This front-end prototype does NOT talk to the physical Arduino/servo tower.
// It only calls this function at the moment the real tower should shake.
//
// TODO: Hardware teammate will connect this event to Arduino/USB/servo control.
//
// Suggested future implementation ideas (not implemented here):
//   - Web Serial API call to send a command over USB to the Arduino
//   - WebSocket message to a local server that controls the servo
//   - fetch() call to a backend endpoint that triggers the shake
// ============================================================================

export function triggerTowerShake() {
  // eslint-disable-next-line no-console
  console.log("TOWER SHAKE TRIGGERED");
  // TODO: Hardware teammate will connect this event to Arduino/USB/servo control.
}
