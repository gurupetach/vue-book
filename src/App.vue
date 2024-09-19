<template>
  <div id="app">
    <BookReader />
  </div>
</template>

<script>
import BookReader from './components/BookReader.vue'

export default {
  name: 'App',
  components: {
    BookReader
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>