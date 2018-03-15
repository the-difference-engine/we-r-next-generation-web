<template>
<div class="container">
    <h1>Add a New Camp Session</h1>
    <hr>
    <form id="camp-create">
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="campName">Name</label>
                <input type="text" class="form-control" v-model="new_camp.name" v-bind:placeholder="placeholders.name">
            </div>
            <div class="form-group col-md-6">
                <label for="dateStart">Start Date</label>
                <input type="date" class="form-control" v-model="new_camp.date_start">
            </div>
        </div>
        <div class="form-group">
            <label for="dateEnd">End Date</label>
            <input type="date" class="form-control" v-model="new_camp.date_end">
        </div>
        <div class="form-group">
            <div class="form-group col-md-6">
                <label for="description">Description</label>
                <input type="text" class="form-control" v-model="new_camp.description" v-bind:placeholder="placeholders.description">
            </div>
        </div>
        <hr>
    </form>
    <button type="submit" class="btn btn-primary">Save & Submit</button>
</div>
</template>

<script>
    // new Vue({
    //     el: '#camp-create',
    //     data: {
    //     }

    // })
    // function addWeek() {
        var oneweek = new Date();
        oneweek.setDate(oneweek.getDate() + 5);
    //     return oneweek;
    // }

    // oneweek = addWeek();
// oneweek.setDate(oneweek.getDate() + 5);
    export default {
        name: 'campex',
        data () {
            return {
                new_camp: {
                    name: '',
                    date_start: new Date().toISOString().slice(0,10),
                    date_end: oneweek.toISOString().slice(0,10),
                    description: '',
                    poc: '',
                    limit: 10,
                    status: 'Active'
                },
                placeholders: {
                    name: "Name this camp session",
                    description: "Describe this camp",
                    poc: "Main contact for the camp",
                }
            }
        }
    }

                    // date_end => {
                        // date_end = date_start.add(5);
                        // date_end.setDate(date_end.getDate() + 5).toISOString().slice(0,10);
                    // },

</script>

<style scoped>
  .container{
    margin: 30px;
  }

  .waiver{
    margin: 25px;
    padding: 25px;
    border: 2px solid gray;
  }
</style>
