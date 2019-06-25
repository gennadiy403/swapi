<template lang="pug">
  .Starship
    router-link(to="/starships") home
    .Starship-info
      img.Starship-img(src="http://picsum.photos/300/300?blur=2")
      .Starship-params
        .Starship-param(v-for="(param, name) in data") {{ name }}: {{ param }}
</template>

<script>
export default {
  name: 'Starship',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      data: null
    }
  },
  created () {
    this.$api.getStarship(this.id)
      .then(res => {
        this.data = res.data
      })
  }
}
</script>

<style lang="stylus">
  .Starship
    &-info
      display: grid
      grid-template-columns: 1fr 2fr
      grid-gap: 20px
      text-align: left
    &-param
      text-align: left

</style>
