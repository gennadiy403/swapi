<template lang="pug">
  .Pagination
    .Pagination-link(
      @click="previousPage"
      :class="{'is-active': previous}"
    ) Prev
    .Pagination-link(
      @click="nextPage"
      :class="{'is-active': next}"
    ) Next
</template>

<script>
export default {
  name: 'Pagination',
  props: ['previous', 'next', 'page', 'maxPages'],
  computed: {
    computedPage () {
      return Number(this.page)
    }
  },
  methods: {
    previousPage () {
      if (this.computedPage <= 1) return
      const searchQuery = this.$route.query.search
      const url = searchQuery ? `/starships/${this.computedPage - 1}/?search=${searchQuery}` : `/starships/${this.computedPage - 1}`
      this.$emit('change', this.previous)
      this.$router.push(url)
    },
    nextPage () {
      if (this.computedPage > this.maxPages) return
      const searchQuery = this.$route.query.search
      const url = searchQuery ? `/starships/${this.computedPage + 1}/?search=${searchQuery}` : `/starships/${this.computedPage + 1}`
      if (this.computedPage >= this.maxPages || this.computedPage > this.maxPages) return
      this.$emit('change', this.next)
      this.$router.push(url)
    }
  }
}
</script>

<style scoped lang="stylus">
  .Pagination
    display: flex
    flex-direction: row
    justify-content: start

    &-link
      cursor: pointer
      flex-basis: 50px
      &:not(.is-active)
        cursor: default
        color: #adadad
</style>
