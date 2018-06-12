<template>
    <div class="container">
        <h2>{{message}}, {{nameUpper}}</h2>
    </div>
</template>
<script>
    export default {
        name: "child",
        props: [
            'name'
        ],
        data() {
            return {
            message: 'hello mr. magoo'
            }
        },
        computed: {
            nameUpper: function() {
                return this.name.toUpperCase();
            }
        }
    }
</script>

