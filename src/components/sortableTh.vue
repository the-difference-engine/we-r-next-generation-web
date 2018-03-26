<template>
<th @click="handleSortBy" scope="col">
  {{ readableColumn }}&nbsp;<span v-if="sortColumn === column">
    <i v-if="sortAscending" class="fa fa-sort-asc"></i>
    <i v-else class="fa fa-sort-desc"></i>
  </span><span v-else><i class="fa fa-sort"></i></span>
</th>
</template>

<script>
export default {
  name: 'sortable-th',
  props: ['column', 'sortAscending', 'sortColumn'],
  data: function() {
    return {}
  },
  computed: {
    readableColumn: function() {
      return this.column.toUpperCase();
    }
  },
  methods: {
    handleSortBy: function() {
      this.$emit('sort', this.column );
    }
  }
}
</script>