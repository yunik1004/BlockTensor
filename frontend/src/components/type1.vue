<template>
  <div>
    <div class="training-data">
      <div class="training-data-data">position:
        <input class="training-data-data--input" type="text" v-model="input1" size="2" maxlength="3" @change="changeOnData()">
        <input class="training-data-data--input" type="text" v-model="input2" size="2" maxlength="3" @change="changeOnData()">
        <input class="training-data-data--input" type="text" v-model="input3" size="2" maxlength="3" @change="changeOnData()">
        <input class="training-data-data--input" type="text" v-model="input4" size="2" maxlength="3" @change="changeOnData()">
        <input class="training-data-data--input" type="text" v-model="input5" size="2" maxlength="3" @change="changeOnData()">
      </div>
      <div class="training-data-labels">label:
        <input class="training-data-data--label" type="text" v-model="label1" size="2" maxlength="3" @change="changeOnLabel()">
        <input class="training-data-data--label" type="text" v-model="label2" size="2" maxlength="3" @change="changeOnLabel()">
        <input class="training-data-data--label" type="text" v-model="label3" size="2" maxlength="3" @change="changeOnLabel()">
        <input class="training-data-data--label" type="text" v-model="label4" size="2" maxlength="3" @change="changeOnLabel()">
        <input class="training-data-data--label" type="text" v-model="label5" size="2" maxlength="3" @change="changeOnLabel()">
      </div>
    </div>
    <div class="training-result">test data:
      <input class="training-result--test" type="text" v-model="test1" size="2" maxlength="3" @change="changeOnTest()">
      <input class="training-result--test" type="text" v-model="test2" size="2" maxlength="3" @change="changeOnTest()">
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
    },
    changeOnLabel: function () {
      this.labels = []
      this.labels.push(this.label1)
      this.labels.push(this.label2)
      this.labels.push(this.label3)
      this.labels.push(this.label4)
      this.labels.push(this.label5)
    },
    changeOnTest: function () {
      this.tests = []
      this.tests.push(this.test1)
      this.tests.push(this.test2)
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
  top: 40px;
  right: 89px;
}

.training-data-labels {
  position: relative;
  margin: 5px;
  top: 45px;
}

.training-result {
  position: relative;
  top: 300px;
}

input {
  background: #f0ebe6;
  border: none;
  border-bottom: solid 1px #31353e;
  text-align: center;
  margin: 1px;
}
</style>
