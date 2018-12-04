<template>
  <div>
    <div class="training-data">
      <div class="training-data-data">
        <p class="tooltip-css">position:<span class="tooltip-css-text">Position of sequence, (ex: first, second, third ...)</span></p>
        <input class="training-data-data--input" type="text" v-model="input1" size="2" maxlength="3" @change="changeOnData()">
        <input class="training-data-data--input" type="text" v-model="input2" size="2" maxlength="3" @change="changeOnData()">
        <input class="training-data-data--input" type="text" v-model="input3" size="2" maxlength="3" @change="changeOnData()">
        <input class="training-data-data--input" type="text" v-model="input4" size="2" maxlength="3" @change="changeOnData()">
        <input class="training-data-data--input" type="text" v-model="input5" size="2" maxlength="3" @change="changeOnData()">
      </div>
      <div class="training-data-labels">
        <p class="tooltip-css">sequence:<span class="tooltip-css-text">Value of sequence</span></p>
        <input class="training-data-data--label" type="text" v-model="label1" size="2" maxlength="3" @change="changeOnLabel()">
        <input class="training-data-data--label" type="text" v-model="label2" size="2" maxlength="3" @change="changeOnLabel()">
        <input class="training-data-data--label" type="text" v-model="label3" size="2" maxlength="3" @change="changeOnLabel()">
        <input class="training-data-data--label" type="text" v-model="label4" size="2" maxlength="3" @change="changeOnLabel()">
        <input class="training-data-data--label" type="text" v-model="label5" size="2" maxlength="3" @change="changeOnLabel()">
      </div>
    </div>
    <div class="training-result">
      <p class="tooltip-css">test position:<span class="tooltip-css-text">What will be the value of this position?</span></p>
      <input class="training-result--test" type="text" v-model="test1" size="2" maxlength="3">
      <input class="training-result--test" type="text" v-model="test2" size="2" maxlength="3">
    </div>
  </div>
</template>

<script>
export default {
  name: 'type1',
  data () {
    return {
      input1: '1',
      input2: '2',
      input3: '3',
      input4: '4',
      input5: '5',
      label1: '1',
      label2: '3',
      label3: '5',
      label4: '7',
      label5: '9',
      test1: '5',
      test2: '7',
      inputs: [],
      labels: [],
      tests: []
    }
  },
  mounted () {
    this.$swal.mixin({
      confirmButtonText: 'Next &rarr;',
      progressSteps: ['1', '2', '3', '4']
    }).queue([
      {
        text: 'This is a model block. You can start to create model with this block. You can change the loss function and optimizer.',
        imageUrl: require('../assets/model_block.png')
      },
      {
        text: 'This is a dense layer block. Dense layer is a fully connected layer with all neurons of previous layer. All inputs and outputs are connected.',
        imageUrl: require('../assets/dense_layer_block.png')
      },
      {
        text: 'This is a activation layer block. You can choose an activation function such as Relu and sigmoid. This is used for detemination of activation or deactivation.',
        imageUrl: require('../assets/activation_layer_block.png')
      },
      {
        text: 'This is a model trainer block. You can complete your own model with this block. You can change the training attributes.',
        imageUrl: require('../assets/model_trainer_block.png'),
        confirmButtonText: 'Start!'
      }])

    this.changeOnData()
    this.changeOnLabel()
    this.changeOnTest()
  },
  methods: {
    changeOnData: function () {
      this.inputs = []
      this.inputs.push(this.input1)
      this.inputs.push(this.input2)
      this.inputs.push(this.input3)
      this.inputs.push(this.input4)
      this.inputs.push(this.input5)

      this.$store.state.test1inputs = []
      this.$store.state.test1inputs = this.inputs
    },
    changeOnLabel: function () {
      this.labels = []
      this.labels.push(this.label1)
      this.labels.push(this.label2)
      this.labels.push(this.label3)
      this.labels.push(this.label4)
      this.labels.push(this.label5)

      this.$store.state.test1labels = []
      this.$store.state.test1labels = this.labels
    },
    changeOnTest: function () {
      this.tests = []
      this.tests.push(this.test1)
      this.tests.push(this.test2)

      this.$store.state.test1tests = []
      this.$store.state.test1tests = this.tests
    }
  }
}
</script>

<style scoped>
.training-data {
  position: relative;
  color: #31353e;
}

.training-data-data {
  position: relative;
  margin: 5px;
}

.training-data-labels {
  position: relative;
  margin: 5px;
  left: -6px;
}

.training-result {
  position: relative;
  margin: 5px;
  right: 71px;
}

input {
  background: #f0ebe6;
  border: none;
  border-bottom: solid 1px #31353e;
  text-align: center;
  margin: 1px;
}

.tooltip-css {
  position: relative;
  display: inline-block;
  border-bottom: 2px dotted blue;
  margin: 0;
  padding: 0;
}

.tooltip-css .tooltip-css-text {
  visibility: hidden;
  width: 200px;
  background: #FFFAF4;
  color: black;
  text-align: center;
  border-radius: 10px;
  padding: 10px 5px;
  position: absolute;
  top: 200%;
  left: 50%;
  margin-left: -105px;
  z-index: 10;
  font-weight: lighter;
  font-size: 15px;
}

.tooltip-css:hover .tooltip-css-text {
  visibility: visible;
}

.tooltip-css .tooltip-css-text::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent #FFFAF4 transparent;
}
</style>
