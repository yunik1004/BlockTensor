<template>
    <div id="app" class="app">
        <div id="SideNav" class="sideNav">
            <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
            <a href="#">Profile</a>
            <a href="#">About_Us</a>
            <hr size="3" noshade>
            <a href="#">Log_out</a>
        </div>

        <div id="main" class="main">
            <h2>Hello Mighty</h2>
            <span style="font-size:30px;cursor:pointer" @click="openNav()">&#9776;</span>
            <div class="stage-selector">
                <div>
                    <a href="#">
                        <span>Stage1</span>
                        <p class="hover_box">contents1</p>
                    </a>
                </div>
                <div>
                    <a href="#">
                        <span>Stage2</span>
                        <p class="hover_box">contents2</p>
                    </a>
                </div>
                <div>
                    <a href="#">
                        <span>Stage2</span>
                        <p class="hover_box">contents2</p>
                    </a>
                </div>
            </div>
            <div style="height: 500px"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Select',

  methods: {
    openNav: function () {
      document.getElementById('SideNav').style.width = '250px'
      document.getElementById('main').style.marginLeft = '250px'
      document.getElementById('app').style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
    },

    closeNav: function () {
      document.getElementById('SideNav').style.width = '0'
      document.getElementById('main').style.marginLeft = '0'
      document.getElementById('app').style.backgroundColor = 'white'
    },

    OpenPopUp: function () {

    },

    ClosePopUp: function () {

    }
  }
}
</script>

<style type="text/css" media="screen" scoped>
.app {
    transition: background-color .5s;
}

.sideNav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 65px;
}

.sideNav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
    text-align: left;
}

.sideNav a:hover {
    color: #f1f1f1;
}

.sideNav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

#main {
    transition: margin-left .5s;
    padding: 16px;
}

.stage-selector {
    width: 420px;
    margin: 0 auto;
}

.stage-selector div {
    position: relative;
    width: 28%;
    float: left;
    margin: 1%;
    text-align: center;
}

.stage-selector div a {
    text-decoration: none;
    color: #818181;
    display: block;
    transition: 0.3s;
    padding: 1%;
    border-radius: 5px;
    background-color: #C4DB94;
}

.stage-selector div a:hover {
    color: #1e1e1e;
}

.hover_box {
    display: none;
    position: absolute;
    padding: 16px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: #333;
    color: #fff;
}

.hover_box:after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #333;
    border-width: 10px;
    pointer-events: none;
    content: " ";
}

span:hover + p.hover_box {
    display: block;
}

@media screen and (max-height: 450px) {
    .sideNav {padding-top: 15px;}
    .sideNav a {font-size: 18px;}
}
</style>
