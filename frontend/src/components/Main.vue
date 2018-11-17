<template>
  <div>
    <p>This is main!!!</p>
    <p>
      <router-link :to="{name: 'Scratch'}">Hyperlink to scratch</router-link>
    </p>
    <p>
      <router-link :to="{name: 'Scroll'}">Scroll</router-link>
    </p>
    <button type="button" class="btn btn-sm btn-default">Default</button>
    <button type="button" class="btn btn-sm btn-primary">Primary</button>
    <pre>{{ block }}</pre>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Main',
  data () {
    return {
      block: null,
      loading: 0
    }
  },
  apollo: {
    block: {
      query: gql`query{
        block(blockID: 2) {
          struct
          code
        }
      }`,
      loadingKey: 'loading'
    }
  }
}
</script>
