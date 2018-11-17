<template>
  <div>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.13.3/dist/tf.min.js" type="application/javascript"></script>
    <Headerbar/>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Headerbar from '@/components/toolbar/Headerbar.vue'

export default {
  name: 'App',
  components: {
    Headerbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
