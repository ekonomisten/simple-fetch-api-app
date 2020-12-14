const postButton = document.querySelector('#postBtn');
const endpoint = 'http://develop.visionmedia.nu/fastec/api/v1/';

// Getting post from remote endpoint with Fetch API
const getPost = () => {
    
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
                    <h4>${post.project} <span>#${post.id}</span></h4>
                    <div class="post-content">
                        <p>${post.description}</p>
                    </div>
                </div>
            `;
        });

        document.getElementById('posts').innerHTML = output;

        //filtering function
        document.getElementById('search').addEventListener('keyup', search);
                
        function search(){
            let value = document.getElementById('search').value;
            data.forEach(post=>{
                if((post.id == value)||(post.title.indexOf(value) > -1)||(value == '')){
                  document.getElementById(post.id).style.display = 'block';              
                  }
                  else{
                   document.getElementById(post.id).style.display = 'none';
                  }
            })
        }

    }));

}

// Runt getPost on button click
postButton.addEventListener('click', getPost);

// Get input values
let title = document.querySelector('#titleInput');
let body = document.querySelector('#bodyInput');

// Submitting a post
const submitPost = (e) => {

    e.preventDefault();

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            title,
            body
        }) // Same as ({title:title, body:body})
    })
    
    .then((res) => res.json())
}