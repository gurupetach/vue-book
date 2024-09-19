<template>
    <div class="book-reader">
      <h1>{{ bookTitle }}</h1>
      <div class="controls">
        <button @click="previousBook" :disabled="currentBookIndex === 0">Previous Book</button>
        <button @click="nextBook" :disabled="currentBookIndex === books.length - 1">Next Book</button>
      </div>
      <VuePdfEmbed
        v-if="currentBook.url"
        :source="currentBook.url"
        :page="1"
        :style="{ width: '100%', height: '80vh' }"
        @error="handleError"
      />
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  import VuePdfEmbed from 'vue-pdf-embed'
  
  export default {
    name: 'BookReader',
    components: {
      VuePdfEmbed
    },
    setup() {
      const books = ref([
        { 
          title: 'Pride and Prejudice by Jane Austen', 
          url: '/pdfs/pride-and-prejudice.pdf'
        },
        { 
          title: 'The Adventures of Sherlock Holmes by Arthur Conan Doyle', 
          url: '/pdfs/advs.pdf'
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
  
      const handleError = (error) => {
        console.error('PDF loading error:', error)
        errorMessage.value = `Failed to load PDF: ${error}`
      }
  
      return {
        books,
        currentBookIndex,
        currentBook,
        bookTitle,
        nextBook,
        previousBook,
        errorMessage,
        handleError
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