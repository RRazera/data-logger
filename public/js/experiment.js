const div = document.getElementById("add-result-div")
div.style.display = 'none'

const hideDiv = () => {
    let div = document.getElementById("add-result-div")

    if (div.style.display === "none") {
        div.style.display = "block"
    } else {
        div.style.display = "none"
    }
}

for (i = 0; i < res.length; i++) {
    const id = res[i]._id
    const resExp = res[i].experiment

    let deleteResultButton = document.getElementById(id)

    deleteResultButton.addEventListener('click', (event) => {
        if (confirm('Are you sure you want to delete this result?')) {
            fetch('/result/' + id, {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    window.location.href = '/experiments/' + resExp
                } else {
                    alert('Something went wrong. Please try again later.')
                }
            })
        } else {
            alert('The result was not deleted.')
        }
    })
}