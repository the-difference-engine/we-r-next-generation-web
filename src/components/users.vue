<template>
  <div class="users container">
    <h1>Users</h1>
    <div class="form-group">
      <label for="user-filter">Filter by:</label>
      <select id="user-filter" class="form-control" v-model="filterRole">
        <option value="">Filter by&hellip;</option>
        <option
          :key="role"
          :value="role"
          v-for="role in roles"
        >{{ role }}</option>
      </select>
    </div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <sortable-th
            :column="column"
            :key="column"
            :sort-ascending="sortAscending"
            :sort-column="sortColumn"
            @sort="sortBy"
            class="sortable-th"
            v-for="column in sortColumns"
          ></sortable-th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortedUsers" :key="user.id">
          <th>{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span
              v-for="application in user.applications"
              :key="application.id"
            >
              {{ application.type }}
            </span>
          </td>
          <td>{{ getMostRecentApplicationDate(user) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
  import sortableTh from '@/components/sortableTh';

  const defaultSortAscending = true;
  const sortColumns = ['id', 'name', 'email', 'roles', 'date']
  const roles = ['admin', 'parent', 'sponsor', 'volunteer'];

  export default {
    name: 'users',
    components: {
      'sortable-th': sortableTh,
    },
    data: function() {
      return {
        filterRole: "",
        roles: roles,
        sortAscending: defaultSortAscending,
        sortColumn: "id",
        sortColumns: sortColumns,
        users: [],
      }
    },
    computed: {
      sortedUsers: function() {
        return this.filteredUsers.sort((left, right) => {
          let leftColumn = null;
          let rightColumn = null;
          switch (this.sortColumn) {
            case 'date':
              leftColumn = this.getMostRecentApplicationDate(left);
              rightColumn = this.getMostRecentApplicationDate(right);
              break;
            case 'roles':
              leftColumn = left.applications.length;
              rightColumn = right.applications.length;
              break;
            default:
              leftColumn = left[this.sortColumn];
              rightColumn = right[this.sortColumn];
          }

          let sort = 0;
          if (leftColumn > rightColumn) {
            sort = 1;
          } else if(leftColumn < rightColumn) {
            sort = -1;
          }

          return (this.sortAscending ? sort : -sort);
        });
      },
      filteredUsers: function() {
        return this.users.filter(user => {
          let userRoles = user.applications.map(application => { return application.type; });
          return this.filterRole === "" || userRoles.includes(this.filterRole);
        });
      },
    },
    methods: {
      sortBy: function(currentColumn) {
        if (this.sortColumn === currentColumn) {
          this.sortAscending = !this.sortAscending;
        } else {
          this.sortAscending = defaultSortAscending;
        }
        this.sortColumn = currentColumn;
      },
      getMostRecentApplicationDate: function(user) {
        let dates = [];
        user.applications.forEach(application => {
          dates.push(application.date)
        });
        let sortedDates = dates.sort();

        return sortedDates.pop();
      },
    },
    created() {
      axios.get('/api/v1/users').then(response => {
        this.users = response.data;
      }).catch(errors => {
        this.errors = errors;
      })
    }
  }
</script>

<style scoped>
  .sortable-th {
    cursor: pointer;
  }
</style>