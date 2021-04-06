const div = document.getElementById("add-experiment-div");
div.style.display = 'none';

const hideDiv = () => {
    let div = document.getElementById("add-experiment-div");

    if (div.style.display === "none") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}