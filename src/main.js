import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PDFViewer from 'pdf-viewer-vue'

const app = createApp(App)

// Register PDFViewer as a global component
app.component('PDFViewer', PDFViewer)

app.mount('#app')