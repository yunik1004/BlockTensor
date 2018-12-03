<template>
  <div class="fullpage-container">
    <div class="btn-group-vertical">
      <button type="button" v-bind:class="{ active:index == 0 }" @click="moveTo(0)"></button>
      <button type="button" v-bind:class="{ active:index == 1 }" @click="moveTo(1)"></button>
      <button type="button" v-bind:class="{ active:index == 2 }" @click="moveTo(2)"></button>
    </div>
    <div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
      <div class="page-1 page">
        <div class="languague-selector-container">
          <span class="lang-selector selector-activate">EN</span>
          <span>-</span>
          <span class="lang-selector">KR</span>
        </div>
        <div class="page-1--upper-icon">
          <img src="../icons/Profile.svg" />
        </div>
        <div class="page-1--text-container">
          <div class="page-1--text-container-left">
            <div class="page-1--text-container-left first">CS408 Project</div>
            <div class="page-1--text-container-left second">TensorBlock</div>
            <div class="page-1--text-container-left third">Team 10 BlockTensor</div>
          </div>
          <div class="page-1--text-container-center">|</div>
          <div class="page-1--text-container-right">
            <div class="button-Main" v-bind:class="{open: formOpen}" v-animate="{value: 'bounceInRight', delay: 600}">
              <div class="button-Main-collapsed" @click="buttonOpen()">START</div>
              <div class="button-Main-expanded">
                <span class="css-cancel-button" @click="buttonClose()"></span>
                <div class="button-Main-expanded-subject">SIGN UP WITH EMAIL</div>
                <div class="button-Main-expanded-signup">
                  <input type="text" class="button-Main-expanded-text" v-model="email" placeholder="USERNAME">
                  <hr class="button-Main-expanded-text-line">
                  <input type="password" class="button-Main-expanded-text" v-model="password" placeholder="PASSWORD">
                  <hr class="button-Main-expanded-text-line">
                </div>
                <div class="button-Main-expanded-button">SIGN ME UP!</div>
                <div class="button-Main-expanded-button-group">
                  <span class="button-Main-expanded-small-button google">
                    <img src="../icons/google.svg" alt="google" height="30" width="30" />
                  </span>
                  <span class="button-Main-expanded-small-button facebook">
                    <img src="../icons/facebook.svg" alt="facebook" height="30" width="30"/>
                  </span>
                </div>
                <br/>
                <div class="button-Main-expanded-signin">Already have account?</div>
                <hr class="button-Main-expanded-line">
                <br/>
                <router-link to="/template" class="button-Main-expanded-guest">
                  Play with guest ID!
                </router-link>
              </div>
            </div>
          </div>
          <div class="page-1--text-container-right-footer" v-animate="{value: 'fadeIn', delay: 300}">- 2018 FALL SEMESTER</div>
        </div>
        <div>
          <div class="page-1--arrow-container" v-animate="{value: 'slideInUp', delay: 900}">
            <div class="page-1--arrow-text">Scroll</div>
            <div class="page-1--arrow"></div>
          </div>
        </div>
      </div>
      <div class="page-2 page">
        <vr1 v-animate="{value: 'fadeIn', delay: 100}" />
        <div class="page-2--text-container">
          <img class="page-2--image" src="../assets/main_robot.jpg" alt="Artificial Intelligence"/>
          <div class="page-2--text-container-top" v-animate="{value: 'fadeIn', delay: 100}">
            What is TensorBlock?
          </div>
          <div class="page-2--text-container-bottom" v-animate="{value: 'fadeIn', delay: 300}">
            TensorBlock is machine learning education web service for kids. Today, machine learning is being important part of our life. There are many fields that use machine learning like image processing, translation, automobile and so on. <br/><br/>However, to learn machine learning is too hard because of the hardness of construction of environment for machine learning. Thus, we try to make an easy way to learn about machine learning even kids. Try our solution and give us feedback. Please, enjoy!!
          </div>
        </div>
        <vr2 v-animate="{value: 'fadeIn', delay: 300}" />
      </div>
      <div class="page-3 page">
        <div class="page-3--text-container">
          <div class="page-3--text-container-top">
            <div class="page-3--text-container-top-left">
              TensorBlock can...
            </div>
            <div class="page-3--text-container-top-right">
              Contact Us
            </div>
          </div>
          <div class="page-3--text-container-contents">
            <div class="page-3--text-box">
              <img src="../icons/Profile.svg" class="page-3--text-box-icon">
              <div class="page-3--text-box-text">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scroll',
  data () {
    var that = this
    return {
      formOpen: false,
      index: 0,
      opts: {
        start: 0,
        dir: 'v',
        loop: false,
        duration: 300,
        beforeChange: function (ele, current, next) {
          console.log('before', current, next)
          that.index = next
        },
        afterChange: function (ele, current) {
          that.index = current
          console.log('after', current)
        }
      }
    }
  },
  methods: {
    moveTo: function (index) {
      this.$refs.fullpage.$fullpage.moveTo(index, true)
      this.index = index
      this.$refs.fullpage.$fullpage.$update()
      this.formOpen = false
    },
    buttonOpen: function () {
      this.formOpen = true
    },
    buttonClose: function () {
      this.formOpen = false
    }
  }
}
</script>

<style type="text/css" media="screen" scoped>
.fullpage-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.page {
  display: block;
  text-align: center;
}

.page-1 {
  padding-top: 100px;
  background: #f0ebe6;
}

.page-2 {
  padding-top: 100px;
  text-align: left;
  padding-left: 250px;
  background: #f0ebe6;
}

.page-3 {
  padding-top: 100px;
  background: #f0ebe6;
}

.languague-selector-container {
  position: absolute;
  top: 16px;
  left: 24px;
  font-family: Helvetica Neue, Roboto, Arial;
  font-size: 16px;
  color: #31353e;
}

.lang-selector {
  background: #f0ebe6;
  color: #31353e;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border: none;
  font-weight: lighter;
  padding: 2px 5px;
  text-decoration: none;
  display: inline-block;
  border-radius: 20px;
}

.lang-selector:hover{
  background-color: #313533;
  color: #f0ebe6;
}

.selector-activate {
  background-color: #313533;
  color: #f0ebe6;
}

.page-1--text-container {
  position: relative;
  width: 700px;
  height: auto;
  margin: 0px auto;
  top: 25%;
  font-family: Helvetica Neue, Roboto, Arial;
  color: #31353e;
}

.page-1--text-container-left {
  text-align: right;
  position: relative;
  padding: 0 45px 0 0;
  right: 100px;
  font-weight: lighter;
}

.first {
  margin: 0;
  line-height: 20px;
  font-size: 20px;
  bottom: 10px;
}

.second {
  margin: 0;
  line-height: 62px;
  font-size: 62px;
  font-weight: bold;
  letter-spacing: -3px;
}

.third {
  margin: 0;
  float: right;
  font-size: 24px;
  line-height: 24px;
  top: 20px;
  font-weight: lighter;
  letter-spacing: -1px;
}

.page-1--text-container-center {
  text-align: right;
  position: relative;
  padding: 0 0 0 0;
  font-size: 100px;
  left: 40px;
  bottom: 110px;
}

.page-1--text-container-right {
  text-align: right;
  position: relative;
  padding: 0 45px 0 0;
  right: 100px;
  font-weight: lighter;
}

.btn-group-vertical {
  position: absolute;
  top: 30%;
  left: 25px;
  z-index: 9;
}

.btn-group-vertical button {
  display: inline-block;
  margin: 30px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  padding: 9px 9px;
  border: none;
  outline: none;
  transition: 1.0s;
  background: #bfbfbf;
}

.btn-group-vertical button.active {
  background: rgba(0, 0, 0, .5);
  color: #fff;
}

.btn-group-vertical button:hover {
  background: #9c9c9c;
}

.btn-group-vertical button.active:hover {
  background: rgba(0, 0, 0, .5);
}

.button-Main {
  background: #f0ebe6;
  color: #31353e;
  position: absolute;
  width: 174px;
  height: 60px;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  transition: 800ms ease all;
  transition: border-radius, 0.5s;
  outline: none;
  border-color: #f0ebe6;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 1px 6px rgba(0, 0, 0, 0.23);
  bottom: 148px;
  left: 580px;
}

.button-Main > .button-Main-collapsed {
  font-size: 60px;
  line-height: 60px;
  font-weight: lighter;
  letter-spacing: -2px;
  transition: opacity 0s;
  width: 170px;
  height: 60px;
  vertical-align: middle;
  text-align: center;
}

.button-Main.open {
  width: 400px;
  height: 500px;
  bottom: -100px;
  overflow: hidden;
}

.button-Main.open:active {
  background: #f0ebe6;
  color: #31353e;
}

.button-Main > .button-Main-expanded {
  transition: opacity 0s, overflow 0s 0s;
  opacity: 0;
  height: 0;
  width: 0;
}

.button-Main.open > .button-Main-collapsed {
  opacity: 0;
  height: 0;
  width: 0;
}

.button-Main.open > .button-Main-expanded {
  text-align: center;
  position: relative;
  width: 360px;
  height: 400px;
  margin: 20px;
  overflow: hidden;
  opacity: 1;
  transition: overflow 0s, height 0.3s 0.3s, width 0.3s 0.3s;
}

.button-Main:hover {
  background: #f0ebe6;
  color: #31353e;
  border-color: #f0ebe6;
  outline: 0;
}

.button-Main:before, .button-Main:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #31353e;
  transition: 400ms ease all;
}

.button-Main:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}

.button-Main:hover:before, .button-Main:hover:after {
  width: 100%;
  transition: 800ms ease all;
}

.button-Main:active {
  background: #31353e;
  color: #f0ebe6;
}

.button-Main:focus {
  outline: 0;
}

.page-1--arrow-container {
  position: absolute;
  width: 100px;
  height: 100px;
  font-size: 14px;
  color: #31353e;
  bottom: -40px;
  left: 47%;
}

.page-1--arrow {
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px;
  border-color: #31353e transparent transparent transparent;
}

.page-1--text-container-right-footer {
  font-weight: lighter;
  position: absolute;
  text-align: right;
  bottom: -250px;
  right: -400px;
}

.page-1--upper-icon {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 13px;
  right: 10px;
}

.page-2--text-container {
  position: relative;
  width: 700px;
  height: auto;
  margin: 0px auto;
  top: 25%;
  font-family: Helvetica Neue, Roboto, Arial;
  color: #31353e;
}

.page-2--text-container-top {
  font-size: 28px;
  line-height: 28px;
  text-align: center;
  position: absolute;
  left: 40%;
  bottom: 120px;
  padding: 0;
  margin: 0;
  font-weight: bold;
}

.page-2--text-container-bottom {
  font-size: 18px;
  line-height: 22px;
  text-align: left;
  position: absolute;
  left: 40%;
  bottom: -160px;
  width: 400px;
  padding: 0;
  margin: 0;
  font-weight: lighter;
}

.page-2--image {
  width: 500px;
  opacity: 0.2;
  position: absolute;
  left: -320px;
  bottom: -160px;
}

vr1 {
  display: block;
  width: 2px;
  background-color: #31353e;
  position: absolute;
  top: 5%;
  bottom: 90%;
  right: 600px;
}

vr2 {
  display: block;
  width: 2px;
  background-color: #31353e;
  position: absolute;
  top: 65%;
  bottom: 10%;
  right: 600px;
}

.page-3--text-container {
  position: relative;
  height: auto;
  margin: 0px auto;
  top: 25%;
  font-family: Helvetica Neue, Roboto, Arial;
  color: #31353e;
}

.page-3--text-container-top {
  font-size: 28px;
  line-height: 28px;
  position: absolute;
  bottom: 50px;
  padding: 0;
  margin: 0;
  font-weight: bold;
}

.page-3--text-container-top-left {
  position: relative;
  text-align: right;
  left: 250px;
}

.page-3--text-container-top-right {
  position: relative;
  left: 1000px;
  text-align: right;
  bottom: 28px
}

.button-Main-expanded-subject {
  position: relative;
  text-align: center;
  letter-spacing: 2px;
  font-weight: 600;
  padding: 5px;
}

.button-Main-expanded-guest {
  position: relative;
  text-align: center;
  color: #31353e;
  display: inline-block;
  top: -15px;
  transition: 0.2s;
  text-decoration: none;
}

.button-Main-expanded-guest:hover {
  color: #918E8B;
}

.button-Main-expanded-text {
  background: #f0ebe6;
  width: 200px;
  text-align: left;
  padding: 10px;
  font-size: 14px;
  line-height: 14px;
  font-weight: lighter;
  border: none;
  letter-spacing: 2px;
}

.button-Main-expanded-text:focus {
  outline: none;
}

.button-Main-expanded-text-line {
  padding: 0;
  margin-top: 0;
  width: 250px;
  display: inline-block;
  border: solid 0.5px #31353e;
}

.button-Main-expanded-signup {
  position: relative;
  top: 20px;
}

.button-Main-expanded-button {
  position: relative;
  background: #31353e;
  color: #f0ebe6;
  padding: 10px;
  width: 250px;
  display: inline-block;
  top: 10px;
  font-weight: 600;
  transition: 0.25s;
}

.button-Main-expanded-button:hover {
  transform: scale(1.04);
}

.button-Main-expanded-button-group {
  position: relative;
}

.button-Main-expanded-small-button {
  position: relative;
  display: inline-block;
  width: 123px;
  height: 46px;
  top: 15px;
  vertical-align: middle;
  text-align: center;
  padding: 5px;
  transition: 0.25s;
}

.button-Main-expanded-small-button:hover {
  transform: scale(1.04);
}

.button-Main-expanded-small-button.google {
  background: #d6492f;
}

.button-Main-expanded-small-button.facebook {
  background: #45619d;
  padding: 6px;
}

.button-Main-expanded-line {
  padding: 0;
  margin-top: 20px;
  width: 350px;
  display: inline-block;
  border: solid 1px #31353e;
}

.button-Main-expanded-signin {
  display: inline-block;
  transition: 0.5s;
}

.button-Main-expanded-signin:hover {
  color: #918E8B;
}

.css-cancel-button {
  display: inline-block;
  position: relative;
  margin: 0 20px 0 7px;
  padding: 0;
  width: 4px;
  height: 20px;
  background: #000;
  transform: rotate(45deg);
  left: 175px;
}

.css-cancel-button:before {
  display: block;
  content: "";
  position: absolute;
  top: 50%;
  left: -8px;
  width: 20px;
  height: 4px;
  margin-top: -2px;
  background: #000;
}

.page-3--text-box {
  display: inline-block;
  position: absolute;
  border: solid 2px black;
  width: 200px;
  height: 100px;
  border-radius: 15px;
}

.page-3--text-box-icon {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  top: -15px;
  left: -50px;
}
</style>
