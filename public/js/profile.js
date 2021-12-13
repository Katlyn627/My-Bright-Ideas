// New Project form handler
const newFormHandler = async (event) => {
    event.preventDefault();

    console.log("here i am in event handler")

    const name = document.querySelector('#create-project-name').value.trim();
    const client_name = document.querySelector('#create-client-name').value.trim();
    const client_email = document.querySelector('#create-client-email').value.trim();
    const client_phone = document.querySelector('#create-client-phone').value.trim();

    // Project can be created as long as it has a name, clientName, and description
    if (name && client_name && client_phone) {
        console.log("---- making a fetch call --")
        const response = await fetch(`/api/projects`, {
            method: 'POST',
            body: JSON.stringify({ name, client_name, client_email, client_phone }),
            headers: {
                'Content-Type': 'application/json',
        },
    });

    console.log("got a reponse back", response)

    // If response is acceptable, replace the doc location with the profile?
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to create project!');
    }
}
};

// Delete project handler
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        
        const response = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete project');
        }
    }
};

// Event listener for New Project form handler
document 
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);


// Event listener for Delete Project handler
document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);


