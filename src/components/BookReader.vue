<template>
    <div class="book-reader">
      <h1>{{ bookTitle }}</h1>
      <div class="controls">
        <button @click="previousBook" :disabled="currentBookIndex === 0">Previous Book</button>
        <button @click="nextBook" :disabled="currentBookIndex === books.length - 1">Next Book</button>
      </div>
      <PDFViewer
        v-if="currentBook.url"
        :source="currentBook.url"
        style="height: 80vh; width: 100%"
      />
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  
  export default {
    name: 'BookReader',
    setup() {
      const books = ref([
        { 
          title: 'Pride and Prejudice by Jane Austen', 
          url: '/pdfs/pride-and-prejudice.pdf'
        },
        { 
          title: 'The Adventures of Sherlock Holmes', 
          url: '/pdfs/advs.pdf'
        },
        { 
          title: 'Ttest', 
          url: '/pdfs/341.pdf'
        }
      ])
      const currentBookIndex = ref(0)
      const errorMessage = ref('')
  
      const currentBook = computed(() => books.value[currentBookIndex.value])
      const bookTitle = computed(() => currentBook.value.title)
  
      const nextBook = () => {
        if (currentBookIndex.value < books.value.length - 1) {
          currentBookIndex.value++
          errorMessage.value = ''
        }
      }
  
      const previousBook = () => {
        if (currentBookIndex.value > 0) {
          currentBookIndex.value--
          errorMessage.value = ''
        }
      }
  
      return {
        books,
        currentBookIndex,
        currentBook,
        bookTitle,
        nextBook,
        previousBook,
        errorMessage
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