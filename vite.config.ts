import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/qacanvas/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        inputs: resolve(__dirname, 'pages/inputs.html'),
        buttons: resolve(__dirname, 'pages/buttons.html'),
        checkboxes: resolve(__dirname, 'pages/checkboxes.html'),
        selects: resolve(__dirname, 'pages/selects.html'),
        forms: resolve(__dirname, 'pages/forms.html'),
        tables: resolve(__dirname, 'pages/tables.html'),
        alerts: resolve(__dirname, 'pages/alerts.html'),
        iframes: resolve(__dirname, 'pages/iframes.html'),
        dragdrop: resolve(__dirname, 'pages/dragdrop.html'),
        hover: resolve(__dirname, 'pages/hover.html'),
        keyboard: resolve(__dirname, 'pages/keyboard.html'),
        scroll: resolve(__dirname, 'pages/scroll.html'),
        dynamic: resolve(__dirname, 'pages/dynamic.html'),
        tabs: resolve(__dirname, 'pages/tabs.html'),
        shadowDom: resolve(__dirname, 'pages/shadow-dom.html'),
        network: resolve(__dirname, 'pages/network.html'),
        storage: resolve(__dirname, 'pages/storage.html'),
      },
    },
  },
});
