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

const addAnotherConditionButton = document.querySelector(".add-another-condition")
addAnotherConditionButton.addEventListener('click', (event) => {
    event.preventDefault()
    
    const addConditionsDiv = document.querySelector('.add-conditions-div')
    const inputCount = addConditionsDiv.getElementsByTagName('input').length + 1

    const input = document.createElement('input')
    input.type = 'text'
    input.name = 'conditions[]'
    input.placeholder = 'Condition ' + inputCount

    const br = document.createElement('br')
    addConditionsDiv.appendChild(input)
    addConditionsDiv.appendChild(br)    
})

const addAnotherCommentButton = document.querySelector(".add-another-comment")
addAnotherCommentButton.addEventListener('click', (event) => {
    event.preventDefault()
    
    const addCommentsDiv = document.querySelector('.add-comments-div')
    const inputCount = addCommentsDiv.getElementsByTagName('input').length + 1

    const input = document.createElement('input')
    input.type = 'text'
    input.name = 'comments[]'
    input.placeholder = 'Comment ' + inputCount

    const br = document.createElement('br')
    addCommentsDiv.appendChild(input)
    addCommentsDiv.appendChild(br)    
})


for (i = 0; i < res.length; i++) {
    const id = res[i]._id
    const resExp = res[i].experiment
    const resComments = res[i].comments
    const resConditions = res[i].conditions

    const div = document.getElementById(id)

    let deleteResultButton = div.querySelector('.delete-result')

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

    let addConditionDiv = div.querySelector('.add-condition-div')
    addConditionDiv.style.display = 'none'

    const addConditionButton = div.querySelector('.add-condition-button')
    addConditionButton.addEventListener('click', (event) => {        
        if (addConditionDiv.style.display === "none") {
            addConditionDiv.style.display = "block"
        } else {
            addConditionDiv.style.display = "none"
        }
    })

    const addConditionForm = div.querySelector('.add-condition-form')
    addConditionForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const condition = addConditionForm.querySelector('.new-condition').value

        resConditions.push({ condition })

        fetch('/result/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                conditions: resConditions
            })
        }).then(response => {
            if (response.ok) {
                window.location.href = '/experiments/' + resExp
            } else {
                alert('Something went wrong. Please try again later.')
            }
        })
    })

    let addCommentDiv = div.querySelector('.add-comment-div')
    addCommentDiv.style.display = 'none'

    const addCommentButton = div.querySelector('.add-comment-button')
    addCommentButton.addEventListener('click', (event) => {        
        if (addCommentDiv.style.display === "none") {
            addCommentDiv.style.display = "block"
        } else {
            addCommentDiv.style.display = "none"
        }
    })

    const addCommentForm = div.querySelector('.add-comment-form')
    addCommentForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const comment = addCommentForm.querySelector('.new-comment').value

        resComments.push({ comment })

        fetch('/result/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comments: resComments
            })
        }).then(response => {
            if (response.ok) {
                window.location.href = '/experiments/' + resExp
            } else {
                alert('Something went wrong. Please try again later.')
            }
        })
    })
}