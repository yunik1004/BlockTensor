<template>
  <div class="fullpage-container">
    <div class="btn-group-vertical">
      <button type="button" :class="{ active:index == 0 }" @click="moveTo(0)">first</button>
      <button type="button" :class="{ active:index == 1 }" @click="moveTo(1)">second</button>
      <button type="button" :class="{ active:index == 2 }" @click="moveTo(2)">third</button>
    </div>
    <div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
      <div class="page-1 page">
        <div id="logo">
          <img src="../assets/logo.png">
          <router-view/>
        </div>
        <h1 class="part-1" v-animate="{value: 'bounceInLeft'}">BlockTensor</h1>
        <h3 class="part-1" v-animate="{value: 'bounceInLeft', delay: 300}">context</h3>
        <b-button type="button" class="button-Main" to="Select" v-animate="{value: 'bounceInRight', delay: 600}">Start</b-button>
      </div>
      <div class="page-2 page">
        <h1 class="part-2" v-animate="{value: 'bounceInLeft'}">Second page</h1>
      </div>
      <div class="page-3 page">
        <h1 class="part-3" v-animate="{value: 'bounceInLeft'}">Third page</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scroll',
  pageNum: 0,
  index: 0,
  data () {
    return {
      opts: {
        start: 0,
        dir: 'v',
        loop: false,
        duration: 300,
        beforeChange: function (ele, current, next) {
          console.log('before', current, next)
          this.index = next
        },
        afterChange: function (ele, current) {
          this.index = current
          console.log('after', current)
        }
      }
    }
  },
  methods: {
    moveTo: function (index) {
      this.$refs.fullpage.$fullpage.moveTo(index, true)
    },
    showPage: function () {
      this.pageNum++
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
  text_align: center;
  font-size: 26px;
  color: #eee;
}

.page-1 {
  padding-top: 100px;
  background: #1bbc9b;
}

.page-2 {
  padding-top: 100px;
  background: #4D8A7C;
}

.page-3 {
  padding-top: 50px;
  background: #C4DB94;
}

.btn-group-vertical {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 9;
}

.btn-group-vertical button {
  display: inline-block;
  margin: 10px;
  color: #000;
  background: #fff;
  background: rgba(255, 255, 255, .5);
  -webkit-border-radius: 10px;
  border-radius: 10px;
  padding: 9px 18px;
  border: none;
  outline: none;
}

.btn-group-vertical button:active {
  background: rgba(0, 0, 0, .5);
  color: #fff;
}

.button-Main {
  background: #1AAB8A;
  color: #fff;
  border: none;
  position: absolute;
  bottom: 100px;
  right: 20px;
  height: 60px;
  font-size: 1.6em;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
}

.button-Main:hover {
  background: #fff;
  color: #1AAB8A;
}

.button-Main:before, .button-Main:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #1AAB8A;
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
  background: #0E5C4A;
  color: #1AAB8A;
}
</style>
