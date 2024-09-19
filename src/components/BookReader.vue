<template>
    <div class="book-reader">
      <h1>{{ bookTitle }}</h1>
      <div class="controls">
        <button @click="previousBook" :disabled="currentBookIndex === 0">Previous Book</button>
        <button @click="nextBook" :disabled="currentBookIndex === books.length - 1">Next Book</button>
      </div>
      <PDFViewer
        :source="currentBook.url"
        style="height: 80vh; width: 100%"
        @download="handleDownload"
      />
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  import PDFViewer from 'pdf-viewer-vue'
  
  export default {
    name: 'BookReader',
    components: {
      PDFViewer
    },
    setup() {
      const books = ref([
        { 
          title: 'Pride and Prejudice by Jane Austen', 
        //   url: 'https://www.planetebook.com/free-ebooks/pride-and-prejudice.pdf'
          url: '/Users/peterachieng/Downloads/pride-and-prejudice.pdf'
        },
        { 
          title: 'The Adventures of Sherlock Holmes by Arthur Conan Doyle', 
          url: 'https://sherlock-holm.es/stories/pdf/a4/1-sided/advs.pdf'
        },
        { 
          title: 'The Great Gatsby by F. Scott Fitzgerald', 
          url: 'https://www.planetebook.com/free-ebooks/the-great-gatsby.pdf'
        },
        { 
          title: 'Frankenstein by Mary Shelley', 
          url: 'https://www.planetebook.com/free-ebooks/frankenstein.pdf'
        },
        { 
          title: 'The War of the Worlds by H.G. Wells', 
          url: 'https://www.planetebook.com/free-ebooks/the-war-of-the-worlds.pdf'
        }
      ])
      const currentBookIndex = ref(0)
  
      const currentBook = computed(() => books.value[currentBookIndex.value])
      const bookTitle = computed(() => currentBook.value.title)
  
      const nextBook = () => {
        if (currentBookIndex.value < books.value.length - 1) {
          currentBookIndex.value++
        }
      }
  
      const previousBook = () => {
        if (currentBookIndex.value > 0) {
          currentBookIndex.value--
        }
      }
  
      const handleDownload = (data) => {
        console.log('Download requested:', data)
      }
  
      return {
        books,
        currentBookIndex,
        currentBook,
        bookTitle,
        nextBook,
        previousBook,
        handleDownload
      }
    }
  }
  </script>
  
  <style scoped>
  .book-reader {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .controls {
    margin-bottom: 20px;
  }
  
  button {
    margin-right: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>