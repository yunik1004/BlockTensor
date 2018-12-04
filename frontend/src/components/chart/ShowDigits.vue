<template>
  <bar-chart :height="150" :chart-data="showDigitPriority()"></bar-chart>
</template>

<script>
import BarChart from './BarChart.js'

export default {
  name: 'ShowDigits',
  props: ['predict'],
  components: {
    'bar-chart': BarChart
  },
  methods: {
    showDigitPriority: function () {
      return {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        datasets: [
          {
            labels: 'Digits',
            data: this.predict
          }
        ]
      }
    }
  }
}
</script>
