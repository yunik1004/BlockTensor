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
            <b-button type="button" class="button-Main" to="Template" v-animate="{value: 'bounceInRight', delay: 600}">START</b-button>
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
}

.btn-group-vertical button.active {
  background: rgba(0, 0, 0, .5);
  color: #fff;
}

.button-Main {
  background: #f0ebe6;
  color: #31353e;
  position: absolute;
  bottom: 140px;
  right: -60px;
  font-size: 60px;
  line-height: 60px;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-color: #f0ebe6;
  font-weight: lighter;
  letter-spacing: -2px;
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

</style>
