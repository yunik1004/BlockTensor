<script>
export default {
  name: 'type2',
  mounted () {
    this.$swal.mixin({
      confirmButtonText: 'Next &rarr;',
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        text: 'This is a flatten layer block. Flatten layer changes two or more dimensional inputs to one dimensional outputs.',
        imageUrl: require('../assets/flatten_layer_block.png')
      },
      {
        text: 'This is a convolutional 2D layer block. Convolutional 2D layer is mainly used for image processing, and by using with filter, it can extract input trait.',
        imageUrl: require('../assets/convolutional_layer_block.png')
      },
      {
        text: 'This is a maxpooling 2D layer block. We can ignore minor changes by using Max Pooling layer.',
        imageUrl: require('../assets/maxpooling_layer_block.png'),
        confirmButtonText: 'Start!'
      }])
  }
}
</script>
