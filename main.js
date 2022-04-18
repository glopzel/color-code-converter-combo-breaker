const body = document.querySelector("body");
const colorPicker = document.querySelector("#choice");
const hexVal = document.querySelector("#hexText");
const rgbVal = document.querySelector("#rgbText");
const cmykVal = document.querySelector('#cmText');
const hsvVal = document.querySelector('#hsvText');

// event.target.value returns the Hex
colorPicker.addEventListener("change", watchColorPicker, false);
colorPicker.addEventListener("change", watchColorPicker);

function watchColorPicker(event) {
  convertToRGB(event.target.value);
  hexVal.innerText = event.target.value.toUpperCase();
  body.style.backgroundColor = event.target.value;
}

function convertToRGB(hex) {
  let splits = hex.split("").splice(1);
  let sliceR = parseInt(splits.slice(0, 2).join(""), 16);
  let sliceG = parseInt(splits.slice(2, 4).join(""), 16);
  let sliceB = parseInt(splits.slice(4, 6).join(""), 16);
  convertToCMYK(sliceR, sliceG, sliceB);
  vColor(sliceR, sliceG, sliceB);
  rgbVal.innerText = `rgb(${sliceR}, ${sliceG}, ${sliceB})`;
}

function convertToCMYK(r, g, b) {
  let c = 1 - (r/255);
  let m = 1 - (g/255);
  let y = 1 - (b/255);
  
  let minCMY = Math.min(c, Math.min(m, y));
  
  c = ((c - minCMY) / (1 - minCMY)).toFixed(2) * 100;
  m = ((m - minCMY) / (1 - minCMY)).toFixed(2) * 100;
  y = ((y - minCMY) / (1 - minCMY)).toFixed(2) * 100;
  let k = minCMY.toFixed(2) * 100;
  
  cmykVal.innerText = `cmyk(${Math.round(c)}%, ${Math.round(m)}%, ${Math.round(y)}%, ${Math.round(k)}%)`; 
}

function vColor(r, g, b) {
  let h, s, v;
  
  r = r/255;
  g = g/255;
  b = b/255;
  
  let CMax = Math.max(r, Math.max(g, b));
  let CMin = Math.min(r, Math.min(g, b));
  let diff = CMax - CMin;
  h = -1, s = -1;
  
  if (CMax == CMin) {
    h = 0;
  } else if (CMax == r) {
    h = (60 * ((g - b) / diff) + 360)
  } else if (CMax == g) {
    h = (60 * ((b - r) / diff) + 120)
  } else if (CMax == b) {
    h = (60 * ((r - g) / diff) + 240)
  }
  
  h = h % 360;
  
  if (CMax == 0) {
    s = 0;
  } else {
    s = (diff/CMax) * 100
  }
  
  v = CMax * 100;
  
  hsvVal.innerText = `hsv(${(Math.round(h))}°, ${Math.round(s)}%, ${Math.round(v)}%)`;
}
