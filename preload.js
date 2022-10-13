/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

var usbDetect = require('usb-detection');
usbDetect.startMonitoring();

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  const usb = document.getElementById('usb')
  usb.textContent = 'how many usbs now?'

  usbDetect.find((err, devices) => {
      if (err) {
          usb.textContent = 'error: ' + err.message
      } else {
          usb.textContent = 'usb length: ' + devices.length
      }
  })
})
