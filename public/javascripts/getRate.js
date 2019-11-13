const getRate = () => $.get(`/rateData?type=${$('#type').val()}&weight=${$('#weight').val()}`,
                            (data) => $('#rate').val(`$${Number(data.rate).toFixed(2)}`))

$(() => {
    $('#getRate').click(getRate)
    $('#type').change(getRate)
    $('#weight').keyup(getRate).change(getRate)
})