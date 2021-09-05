let app = new Vue({
    el: '#app',
    data: {
        url: string = '',
        slug: string = null,
        loading: boolean = false,
        displaySlugFrom: boolean = false,
        response: object = null,
        error: object = {
            status: boolean = false,
            message: string = ''
        }
    },

    methods: {
        onSubmit() {
            this.loading = true;
            fetch(`/api/url/shorten`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({longUrl: this.url, slug: this.slug})
            })
                .then(response => response.json())
                .then(data => {
                    if (data.shortUrl) this.response = data;
                    else this.error = { status: true,  message: data };
                    this.loading = false
                })
                .catch(err => {
                    this.error = { status: true, message: err };
                    this.loading = false
                });
        },
        resetForm: function () {
            this.loading = false;
            this.response = false;
            this.displaySlugFrom = false;
            this.error = {
                status: false,
                message: ''
            };
            this.url = '';
        },
        triggerSlug: function() {
            this.displaySlugFrom = true;
        }
    },
});
