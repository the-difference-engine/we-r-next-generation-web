import Vue from 'vue';
export const AppBus = new Vue({
    data() {
        return {
            title: '',
            formDirty: false,
            formInvalid: false,
            formComplete: false,
            isPrevious: true,
            isNext: true,
            startRoute: '',
            prevRoute: '',
            nextRoute: '',
            canSubmit: false,

            profileData: {},
            appData: this.setupAppData(),

        }
    },
    methods: {
        setupAppData: function () {
            return {
                bio: '',
                camps: [
                    {
                        text: '',
                        value: ''
                    },
                    {
                        text: '',
                        value: ''
                    },
                ],
                chosencamp: '',

                errors: [],
                disable_edits: false,

                childName: '',

                waiver: {
                    title: '',
                    header: [],
                    items: [],
                    footer: '',

                    initials: [],
                    signature: '',
                    signed_date: '',
                }
            }
        },
    }
});