<template>
  <div>
    <p>This is main!!!</p>
    <p>
      <router-link :to="{name: 'Scratch'}">Hyperlink to scratch</router-link>
    </p>
    <p>
      <router-link :to="{name: 'Scroll'}">Scroll</router-link>
    </p>
    <p>
      <router-link :to="{name: 'Swal'}">Swal</router-link>
    </p>
    <p>
      <router-link :to="{name: 'Template'}">Template</router-link>
    </p>
    <button type="button" class="btn btn-sm btn-default">Default</button>
    <button type="button" class="btn btn-sm btn-primary">Primary</button>
    <button v-on:click="wow">API call</button>
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    wow: function () {
      this.$http.get('/api/data/train/wow').then((result) => {
        console.log('finish')
      })
    }
  }
}
</script>
