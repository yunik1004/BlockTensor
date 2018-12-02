<template>
    <div class="app">
        <Push width="300" @openMenu="openSlide()" @closeMenu="closeSlide()">
          <a id="Profile" href="#">
            <img class="sidebar-icon" src="../icons/Profile_white.svg">
            <span>Profile</span>
          </a>
          <a id="About Us" href="#">
            <img class="sidebar-icon2" src="../icons/information_white.svg">
            <span>AboutUs</span>
          </a>
          <a id="Log Out" href="#">
            <img class="sidebar-icon" src="../icons/logout_white.svg">
            <span>LogOut</span>
          </a>
        </Push>
        <main id="page-wrap">
          <router-link to="/" class="header-name">TensorBlock</router-link>
          <div class="select-subject">STAGE SELECT</div>
          <div class="card-carousel-wrapper">
              <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
              <div class="card-carousel">
                  <div class="card-carousel--overflow-container">
                      <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')' }">
                          <div id="cards" class="card-carousel--card" v-for="item in items" :key="item.name" @click="stageInfo(item.name, item.info)">
                              <img src="https://placehold.it/200x200">
                              <div class="card-carousel--card--footer">
                                  <p>Item: {{ item.name }}</p>
                                  <br/><br/>
                                  <p>Tag: {{ item.tag }}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
          </div>
          <div class="select-footer">
            <div class="select-footer-text">- 2018 FALL SEMESTER</div>
          </div>
        </main>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import { Push } from 'vue-burger-menu'

export default {
  name: 'Template',
  components: {
    Push
  },
  data () {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 220,
      items: [ // Test items
        {name: 'A', tag: 'a', info: 'hi'},
        {name: 'B', tag: 'b', info: 'hi'},
        {name: 'C', tag: 'c', info: 'hi'},
        {name: 'D', tag: 'd', info: 'hi'},
        {name: 'E', tag: 'e', info: 'hi'},
        {name: 'F', tag: 'f', info: 'hi'},
        {name: 'G', tag: 'g', info: 'hi'}
      ],
      stages: []
    }
  },
  apollo: {
    stages: {
      query: gql`
      query GetStages {
        stages {
          name
          tag
          info
        }
      }`,
      result (data) {
        this.items = this.stages
      }
    }
  },
  computed: {
    atEndOfList () {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize)
    },
    atHeadOfList () {
      return this.currentOffset === 0
    }
  },
  methods: {
    moveCarousel (direction) {
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor
      }
    },
    stageInfo (stageName, info) {
      this.$swal({
        title: stageName,
        text: info,
        icon: 'info',
        buttons: ['cancel', 'go'],
        dangerMode: true
      }).then((goStage) => {
        if (goStage) {
          this.$router.push({
            name: 'Scratch',
            params: {
              stageName: stageName
            },
            props: true
          })
        }
      })
    },
    openSlide () {
    },
    closeSlide () {
    }
  },
  mounted () {
    if (this.$store.state.firstRun) {
      setTimeout(() => {
        this.$swal({
          title: 'HELLO',
          text: 'information',
          button: true,
          closeOnClickOutside: false,
          closeOnEsc: false
        })
      }, 500)
      this.$store.state.firstRun = false
    }
  }
}
</script>

<style>
.app {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #f0ebe6;
  font-family: Helvetica Neue, Roboto, Arial;
}

.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 100px 0 40px;
  color: #666a73;
  top: 500px;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width: 640px;
}

.card-carousel--overflow-container {
  overflow: hidden;
}

.card-carousel--nav__left, .card-carousel--nav__right {
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-top: 4px solid #42b883;
  border-right: 4px solid #42b883;
  cursor: pointer;
  margin: 0 10px;
  transition: transform 150ms linear;
}

.card-carousel--nav__left[disabled], .card-carousel--nav__right[disabled] {
  opacity: 0.2;
  border-color: black;
}

.card-carousel--nav__left {
  transform: rotate(-135deg);
}

.card-carousel--nav__left:active {
  transform: rotate(-135deg) scale(0.8);
}

.card-carousel--nav__right {
  transform: rotate(45deg);
}

.card-carousel--nav__right:active {
  transform: rotate(45deg) scale(0.8);
}

.card-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translateX(0px);
}

.card-carousel-cards .card-carousel--card {
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(40, 44, 53, .06), 0 2px 2px 0 rgba(40, 44, 53, .08);
  background-color: #fff;
  border-radius: 4px;
  z-index: 3;
  margin-bottom: 2px;
  position: relative;
}

.card-carousel-cards .card-carousel--card:first-child {
  margin-left: 0;
}

.card-carousel-cards .card-carousel--card:last-child {
  margin-right: 0;
}

.card-carousel-cards .card-carousel--card img {
  vertical-align: bottom;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: opacity 150ms linear;
  user-select: none;
}

.card-carousel-cards .card-carousel--card img:hover {
  opacity: 0.5;
}

.card-carousel-cards .card-carousel--card--footer {
  border-top: 0;
  padding: 7px 15px;
}

.card-carousel-cards .card-carousel--card--footer p {
  padding: 3px 0;
  margin: 0;
  margin-bottom: 2px;
  font-size: 19px;
  font-weight: 500;
  color: #2c3e50;
  user-select: none;
}

.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2) {
  font-size: 12px;
  font-weight: 300;
  padding: 6px;
  background: rgba(40, 44, 53, .06);
  display: inline-block;
  position: relative;
  margin-left: 4px;
  color: #666a73;
}

.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):before {
  content: "";
  float: left;
  position: absolute;
  top: 0;
  left: -12px;
  width: 0;
  height: 0;
  border-color: transparent rgba(40, 44, 53, .06) transparent transparent;
  border-style: solid;
  border-width: 12px 12px 12px 0;
}

.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):after {
  content: "";
  position: absolute;
  top: 10px;
  left: -1px;
  float: left;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: white;
  box-shadow: 0px 0px 0px #004977;
}

.header-name {
  position: relative;
  line-height: 36px;
  font-size: 36px;
  font-weight: bolder;
  letter-spacing: -1px;
  display: inline-block;
  top: 18px;
  right: 600px;
  color: #31353e;
  text-decoration: none;
}

.header-name:hover {
  text-decoration: none;
  color: #31353e;
}

.bm-burger-button {
  position: fixed;
  width: 30px;
  height: 25px;
  left: 30px;
  top: 24px;
  cursor: pointer;
  transition: 0.2s ease-out;
}

.bm-burger-button:hover {
  transform: scale(1.2);
}

.bm-burger-bars {
  background-color: #31353e;
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
  right: 2px;
  cursor: pointer;
}

.bm-cross {
  background: #bdc3c7;
}

.bm-cross-button {
  height: 24px;
  width: 24px;
  transition: 0.25s ease-out;
}

.bm-cross-button:hover {
  transform: scale(1.2);
}

.bm-menu {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: #31353e;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
}

.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}

.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  font-size: 20px;
  line-height: 20px;
}

.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.6em;
  transition: 1.0s ease-out;
}

.bm-item-list > *:hover {
  text-decoration: none;
}

.bm-item-list > * > span {
  margin-left: 20px;
  font-weight: 700;
  color: #f0ebe6;
  margin-top: 5px;
}

.bm-item-list > * > span:hover {
  color: #B2AFAB;
}

.sidebar-icon {
  width: 30px;
  height: 30px;
}

.sidebar-icon2 {
  width: 28px;
  height: 28px;
}

.swal-modal {
  font-family: Helvetica Neue, Roboto, Arial;
}

.select-subject {
  position: relative;
  font-size: 40px;
  line-height: 40px;
  font-family: Helvetica Neue, Roboto, Arial;
  font-weight: lighter;
  top: 75px;
}

.select-footer-text {
  position: relative;
  font-weight: lighter;
  text-align: right;
  right: 48px;
  top: 174px;
}
</style>
