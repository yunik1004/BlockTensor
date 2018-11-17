<template>
    <div>
        <button @click="handleClickGetAuth" :disabled="!isLoaded">get auth code</button>
        <button @click="handleClickSignIn" :disabled="!isLoaded">signIn</button>
    </div>
</template>

<script>
export default {
  name: 'Login',

  props: [],

  components: {

  },

  data () {
    return {
      isLoaded: false
    }
  },

  methods: {
    handleClickGetAuth () {
      this.$gAuth.getAuthCode()
        .then(authCode => {
          return this.$http.post('http://localhost:8080/auth/google', { code: authCode, redirect_uri: 'postmessage' })
        })

        .then(response => {
        })

        .catch(error => {
          console.log('Google Login Failed', error)
        })
    },

    handleClickSignIn () {
      this.$gAuth.signIn()
        .then(GoogleUser => {
          console.log('GoogleUser', GoogleUser)
        })

        .catch(error => {
          console.log('signIn Failed', error)
        })
    }
  }

/*  mounted () {
    let that = this
    let checkGauthLoad = setInterval(function () {
      that.isLoaded = that.$gAuth.isLoaded()
      console.log('checked', that.isLoaded)

      if (that.isLoaded) clearInterval(checkGauthLoad)
    }, 1000)
  } */
}
</script>
