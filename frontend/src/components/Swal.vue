<template>
    <div class="apppmain">
        <button id="successB" @click="stageSuccess()">Success</button>
        <button id="failB" @click="stageFail()">Fail</button>
        <div>
            <button class="round-button">DO</button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Swal',
  mounted () {
    setTimeout(() => {
      this.$swal({
        title: 'Stage Name',
        text: 'information',
        button: true,
        closeOnClickOutside: false,
        closeOnEsc: false
      })
    }, 300)
  },

  methods: {
    stageSuccess: function () {
      this.$swal({
        title: 'Success!!!!',
        text: 'Well done',
        icon: 'success',
        button: true,
        closeOnClickOutside: false,
        closeOnEsc: false
      }).then((value) => {
        this.$swal({
          title: 'Menu',
          text: 'choose action',
          buttons: ['Back to Menu', 'Next Stage'],
          closeOnClickOutside: false,
          closeOnEsc: false
        }).then((stage) => {
          if (stage) {
            console.log(true)
          } else {
            this.$router.push('Template')
          }
        })
      })
    },

    stageFail: function () {
      this.$swal({
        title: 'Fail!!!!',
        text: 'TT',
        icon: 'error',
        button: true,
        closeOnClickOutside: false,
        closeOnEsc: false
      }).then((value) => {
        this.$swal({
          title: 'Menu',
          text: 'choose action',
          buttons: ['Back to Menu', 'Retry'],
          closeOnClickOutside: false,
          closeOnEsc: false
        }).then((stage) => {
          if (stage) {
            console.log(true)
          } else {
            this.$router.push('Template')
          }
        })
      })
    }
  }
}
</script>

<style>
.round-button {
  width: 60px;
  height: 60px;
  font-size: 30px;
  font-weight: 500;
  cursor: pointer;
  color: #3498db;
  background: none;
  border-radius: 100%;
  overflow: none;
  text-align: center;
  border: 2px solid;
  transition: 0.25s;
}

.round-button:active {
  background-color: #2980b9;
}

.round-button:focus, .round-button:hover {
  outline: 0;
}
</style>
