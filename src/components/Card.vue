<template lang="pug">
  .Card(@click="showShip")
    .Card-img img
    .Card-title {{ data.name }}
</template>

<script>
export default {
  name: 'Card',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    showShip () {
      const url = new URL(this.data.url)
      const id = url.pathname.split('/')[3]
      this.$router.push(`/starship/${id}`)
    }
  }
}
</script>

<style lang="stylus">
  .Card
    cursor: pointer

    &-img
      height: 200px
      width: 200px
      border: solid 1px #000
</style>
