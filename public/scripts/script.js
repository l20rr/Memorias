document.addEventListener('DOMContentLoaded', () => {
    updates()
})

function updates() {
    fetch("http://192.168.1.7:3000/api/all").then((res) => {
        return res.json()
    }).then(json => {
        console.log(json)

        let postElements = '';
        let posts = JSON.parse(json)
        posts.forEach((post) => {
            let postElement = ` <div id=${post.id} class="card m-3">
            <div class="card-header">
                <h5 class="card-title">${post.title}</h5>
            </div>
            <div class="card-body">
                <div class="card-text">${post.description}
            
                </div>

            </div>
        </div>`
            postElements += postElement;
        })
        document.getElementById("posts").innerHTML = postElements;
    })
}

function newPost() {
    let title = document.getElementById("title").value
    let description = document.getElementById("desc").value

    let post = { title, description };
    const option = {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(post)
    }
    fetch("http://192.168.1.7:3000/api/new", option).then(res => {
        console.log(res)
        updates()
        document.getElementById("title").value = "";
        document.getElementById("desc").value = "";
    })
}