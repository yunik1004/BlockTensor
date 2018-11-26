<template>
    <div class="apppmain">
        <button id="successB" @click="stageSuccess()">Success</button>
        <button id="failB" @click="stageFail()">Fail</button>
        <Slide width="300" @openMenu="disableButton()" @closeMenu="enableButton()">
            <a id="Profile" href="#">
                <span>Profile</span>
            </a>
            <a id="About Us" href="#">
                <span>AboutUs</span>
            </a>
            <a id="Log Out" href="#">
                <span>LogOut</span>
            </a>
        </Slide>
    </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
export default {
  name: 'Swal',
  components: {
    Slide
  },
  mounted () {
    this.$swal({
      title: 'Stage Name',
      text: 'information',
      button: true,
      closeOnClickOutside: false,
      closeOnEsc: false
    })
  },
  methods: {
    disableButton: function () {
      document.getElementById('successB').disabled = 'disabled'
      document.getElementById('failB').disabled = 'disabled'
    },

    enableButton: function () {
      document.getElementById('successB').disabled = false
      document.getElementById('failB').disabled = false
    },

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
        })
      })
    }
  }
}
</script>

<style>
.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
  cursor: pointer;
}

.bm-burger-bars {
  background-color: #373a47;
 }

.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
 }

.cross-style {
  position: absolute;
  top: 12px;
  right: 8px;
  cursor: pointer;
 }

.bm-cross {
  background: #bdc3c7;
}

.bm-cross-button {
  height: 24px;
  width: 24px;
}

.bm-menu {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: rgb(63, 63, 65);
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
}

.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
  transition: background-color 1.0s;
}

.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  font-size: 20px;
}

.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}

.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: white;
}
</style>
