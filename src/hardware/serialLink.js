// ============================================================================
// SERIAL LINK TO THE SHAKE PLATE (ESP32-S3-DevKitC-1)
// ----------------------------------------------------------------------------
// Talks to the physical board over USB using the Web Serial API, which is
// built into Chrome and Edge. No extra library or backend server needed.
//
// Protocol: single characters sent over serial.
//   'W' = wrong answer, board runs the shake routine
//   'C' = correct answer, board does nothing (not currently sent, kept here
//         in case you want an explicit "do nothing" ack later)
//
// Requirements:
//   - Chrome or Edge only (Safari/Firefox don't support Web Serial)
//   - Page must be served over http://localhost or https://, not file://
//   - connect() must be called from inside a user click/tap, browsers block
//     navigator.serial.requestPort() from running on page load
// ============================================================================

class SerialLink {
  constructor() {
    this.port = null;
    this.writer = null;
    this.reader = null;
    this.connected = false;
  }

  async connect() {
    if (!("serial" in navigator)) {
      throw new Error(
        "Web Serial isn't supported in this browser. Use Chrome or Edge."
      );
    }

    this.port = await navigator.serial.requestPort();
    await this.port.open({ baudRate: 9600 });

    const encoder = new TextEncoderStream();
    this._writableClosed = encoder.readable.pipeTo(this.port.writable);
    this.writer = encoder.writable.getWriter();

    const decoder = new TextDecoderStream();
    this._readableClosed = this.port.readable.pipeTo(decoder.writable);
    this.reader = decoder.readable.getReader();

    this.connected = true;
    this._readLoop();
  }

  async _readLoop() {
    let buffer = "";
    try {
      while (this.connected) {
        const { value, done } = await this.reader.read();
        if (done) break;
        if (value) {
          buffer += value;
          let lineEnd;
          while ((lineEnd = buffer.indexOf("\n")) >= 0) {
            const line = buffer.slice(0, lineEnd).trim();
            buffer = buffer.slice(lineEnd + 1);
            if (line) {
              // eslint-disable-next-line no-console
              console.log("Shake plate says:", line);
            }
          }
        }
      }
    } catch (err) {
      console.error("Serial read error:", err);
    }
  }

  async sendWrong() {
    await this._send("W");
  }

  async sendCorrect() {
    await this._send("C");
  }

  async _send(char) {
    if (!this.writer) return; // not connected — caller decides whether that matters
    try {
      await this.writer.write(char);
    } catch (err) {
      console.error("Serial write error:", err);
    }
  }

  async disconnect() {
    this.connected = false;
    try {
      if (this.reader) await this.reader.cancel();
      if (this.writer) await this.writer.close();
      if (this.port) await this.port.close();
    } catch (err) {
      console.warn("Error during serial disconnect:", err);
    }
  }
}

// One shared connection for the whole app.
export const serialLink = new SerialLink();
