/* eslint-disable @typescript-eslint/no-require-imports -- script Node CommonJS (outil hors site) */
// Agrandissement x2 par IA (ESRGAN « medium », modèle embarqué dans le paquet npm) — tuiles avec recouvrement.
const fs = require("fs");
const path = require("path");
const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-backend-wasm");
const sharp = require("sharp");
const def = require("@upscalerjs/esrgan-medium/2x");

(async () => {
  await tf.setBackend("wasm").catch(() => tf.setBackend("cpu"));
  await tf.ready();
  def.setup?.(tf);
  const dir = path.join(__dirname, "../node_modules/@upscalerjs/esrgan-medium/models/x2");
  const json = JSON.parse(fs.readFileSync(path.join(dir, "model.json")));
  const weightData = fs.readFileSync(path.join(dir, json.weightsManifest[0].paths[0]));
  const model = await tf.loadLayersModel(tf.io.fromMemory({ modelTopology: json.modelTopology, weightSpecs: json.weightsManifest[0].weights, weightData: weightData.buffer.slice(weightData.byteOffset, weightData.byteOffset + weightData.byteLength) }));
  const [inp, out] = process.argv.slice(2);
  const { data, info } = await sharp(inp).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const T = 96, P = 12, S = 2;
  const outBuf = new Float32Array(W * S * H * S * 3);
  const t0 = Date.now();
  for (let y = 0; y < H; y += T) for (let x = 0; x < W; x += T) {
    const x0 = Math.max(0, x - P), y0 = Math.max(0, y - P), x1 = Math.min(W, x + T + P), y1 = Math.min(H, y + T + P);
    const tw = x1 - x0, th = y1 - y0;
    const tile = new Float32Array(tw * th * 3);
    for (let j = 0; j < th; j++) for (let i = 0; i < tw; i++) for (let c = 0; c < 3; c++) tile[(j * tw + i) * 3 + c] = data[((y0 + j) * W + x0 + i) * 3 + c] / 255;
    const res = tf.tidy(() => model.predict(tf.tensor4d(tile, [1, th, tw, 3])).clipByValue(0, 1));
    const r = await res.data(); res.dispose();
    const cw = Math.min(T, W - x), ch = Math.min(T, H - y);
    for (let j = 0; j < ch * S; j++) for (let i = 0; i < cw * S; i++) {
      const sx = (x - x0) * S + i, sy = (y - y0) * S + j;
      for (let c = 0; c < 3; c++) outBuf[((y * S + j) * W * S + x * S + i) * 3 + c] = r[(sy * tw * S + sx) * 3 + c];
    }
  }
  const u8 = Buffer.alloc(outBuf.length);
  for (let k = 0; k < outBuf.length; k++) u8[k] = Math.round(outBuf[k] * 255);
  await sharp(u8, { raw: { width: W * S, height: H * S, channels: 3 } }).png().toFile(out);
  console.log(`${path.basename(inp)} ${W}x${H} -> ${W * S}x${H * S} en ${((Date.now() - t0) / 1000).toFixed(0)}s`);
})();
