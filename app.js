const postButton = document.querySelector('#postBtn');

// Getting post from remote endpoint with Fetch API
const getPost = () => {
    
    let endpoint = 'https://jsonplaceholder.typicode.com/posts';

    fetch(endpoint)
    .then((response => {
        // Return endpoint in JSON format
        return response.json()
    }))

    .then((data => {
        // Displaying it to the DOM
        let output = `
            <h3>Posts</h3>
            <div class="form-group">
                <input type="text" id="search" placeholder="Search by Title or ID...">
            </div>
        `;

        data.forEach(post => {
            output += `
                <div class="post" id="${post.id}">
                    <h4>${post.title} <span>#${post.id}</span></h4>
                    <div class="post-content">
                        <p>${post.body}</p>
                    </div>
                </div>
            `;
        });

        document.getElementById('posts').innerHTML = output;

    }));

}

// Runt getPost on button click
postButton.addEventListener('click', getPost);



