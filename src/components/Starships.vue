<template lang="pug">
  .Starships
    label Search
    input(
      v-model="searchString"
      @input="search"
      type="text"
    )
    Pagination(
      @change="fetch"
      :previous="previous"
      :page="page"
      :maxPages="maxPages"
      :next="next"
    )
    .Starships-loading(v-if="!isFetched") Loading...
    .Starships-cards(v-if="filteredStarships.length && isFetched")
      Card(
        v-for="starship in filteredStarships"
        :key="starship.id"
        :data="starship"
      )
    .Starships-empty(v-if="!filteredStarships.length && isFetched") No results
</template>

<script>
import Card from '@/components/Card'
import Pagination from './Pagination'

export default {
  name: 'Starships',
  components: {
    Pagination,
    Card
  },
  props: ['page'],
  data () {
    return {
      isFetched: false,
      searchString: '',
      starships: [],
      previous: null,
      next: null,
      maxPages: null
    }
  },
  computed: {
    filteredStarships () {
      return this.starships.filter(ship => {
        return ship.name.toLowerCase().includes(this.searchString)
      })
    }
  },
  methods: {
    handleStarshipsData (data) {
      this.starships = data.results
      this.previous = data.previous
      this.next = data.next
      this.maxPages = data.count % 10 > 0 ? Math.floor(data.count / 10) + 1 : Math.floor(data.count / 10)
    },
    fetch (url) {
      this.isFetched = false
      this.$api.fetchShips(url)
        .then(res => {
          this.isFetched = true
          this.handleStarshipsData(res.data)
        })
    },
    search () {
      if (this.searchString) {
        this.$router.push(this.$route.path + `?search=${this.searchString}`)
      } else {
        this.$router.push(this.$route.path)
      }
    }
  },
  created () {
    let url = this.page ? `${this.$api.baseUrl}/starships/?page=${this.page}` : null
    this.fetch(url)
  },
  mounted () {
    if (this.$route.query.search) this.searchString = this.$route.query.search
  }
}
</script>

<style lang="stylus">
  .Starships
    label
      margin-right: 10px
    &-cards
      display: grid
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-gap: 20px
</style>
