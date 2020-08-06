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
            console.log(this.url, this.slug);
            fetch('http://shrt.pl/api/url/shorten', {
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
                    if (data.shortUrl)
                        this.response = data;
                    else this.error = {
                        status: true,
                        message: data
                    };
                    this.loading = false
                })
                .catch(err => {
                    console.log(err);
                    this.error = {
                        status: true,
                        message: err
                    };
                    this.loading = false
                });
        },
        trigerSlug: function() {
            this.displaySlugFrom = true;
        }
    },
});