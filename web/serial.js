// Stackademic — Web Serial link to the Arduino UNO Q.
// Works in Chrome/Edge only (Web Serial API). Must be served over
// http://localhost or https:// — it will NOT work from a file:// URL.

class ArduinoLink {
  constructor() {
    this.port = null;
    this.writer = null;
    this.reader = null;
    this.connected = false;
    this.onStatus = null; // optional callback(text) for board responses
  }

  async connect() {
    if (!("serial" in navigator)) {
      throw new Error("Web Serial API not supported in this browser. Use Chrome or Edge.");
    }
    this.port = await navigator.serial.requestPort();
    await this.port.open({ baudRate: 9600 });

    const textEncoder = new TextEncoderStream();
    this.writableStreamClosed = textEncoder.readable.pipeTo(this.port.writable);
    this.writer = textEncoder.writable.getWriter();

    const textDecoder = new TextDecoderStream();
    this.readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
    this.reader = textDecoder.readable.getReader();

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
            if (line && this.onStatus) this.onStatus(line);
          }
        }
      }
    } catch (err) {
      console.error("Serial read error:", err);
    }
  }

  async sendCorrect() {
    await this._send("C");
  }

  async sendWrong() {
    await this._send("W");
  }

  async _send(char) {
    if (!this.writer) throw new Error("Not connected to the board yet.");
    await this.writer.write(char);
  }

  async disconnect() {
    this.connected = false;
    try {
      if (this.reader) await this.reader.cancel();
      if (this.writer) await this.writer.close();
      if (this.port) await this.port.close();
    } catch (err) {
      console.warn("Error during disconnect:", err);
    }
  }
}
