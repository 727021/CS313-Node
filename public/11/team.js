$(() => {
    $('#searchButton').click(() => {
        let search = $('#search').val()
        console.log(search)

        $.get(`http://www.omdbapi.com/?apikey=c62d4f0f&s=${search}`, (data) => {
            console.log(data)
            $('#list').empty()
            if (data.Response == 'False') {
                $('#list').append(`<tr><td colspan="2">${data.Error}</td></tr>`)
                return
            }
            data.Search.forEach(movie => {
                $('#list').append(`<tr><td>${movie.Title}</td><td><button class="btn btn-primary details" data-id="${movie.imdbID}">Details</button></td></tr>`)
            })

            $('.details').click(function() {
                let id = $(this).data('id')
                console.log(id)
                $.get(`http://www.omdbapi.com/?apikey=c62d4f0f&i=${id}`, (data) => {
                    console.log(data)
                    $('#movieTitle').html(`<h3>${data.Title} (${data.Year})</h3>`)
                    $('#moviePoster').html(`<img src="${data.Poster}">`)
                    $('#moviePlot').html(data.Plot)
                    $("html, body").animate({ scrollTop: $(document).height() }, "slow")
                })
            })
        })
    })
})