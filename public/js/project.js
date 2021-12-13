const backToList = async (event) => {
    event.preventDefault();

    document.location.replace('/profile');

};

const newAskHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#new-ask-title').value.trim();
    const id = document.querySelector('#create-ask').getAttribute('data-id');

    if (description) {
        const response = await fetch(`/api/projectAsks`, {
            method: 'POST',
            body: JSON.stringify({ description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // const id = document.querySelector('#create-ask').getAttribute('data-id');
            document.location.replace(`/project/${id}`);
        } else {
            alert ('Failed to create Ask!')
        }
    }
};


const newTaskHandler = async (event) => {
    event.preventDefault();
    console.log("----------DID WE MAKE IT HERE?-----------");
    const task_content = document.querySelector('#new-task-title').value.trim();
    const id = document.querySelector('#create-task').getAttribute('data-id');

    if (task_content) {
        console.log(task_content,
            id);
        const response = await fetch(`/api/tasks`, {
            method: 'POST',
            body: JSON.stringify({ task_content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {

            // const id = document.querySelector('#create-task').getAttribute('data-id');
            document.location.replace(`/project/${id}`);
        } else {
            alert ('Failed to create Task!')

        }
    }
};

const newCommentHandler = async (event) => {
    event.preventDefault();
    console.log("--------------DID WE MAKE IT TO THE COMMENT HANDLER?---------------");
    const comment = document.querySelector('#new-comment-title').value.trim();
    const id = document.querySelector('#create-comment').getAttribute('data-id');

    if (comment) {
        console.log('-----------------',
        comment,
        id,
        '------------------');
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/project/${id}`);
        } else {
            alert ('Failed to create comment!');
        }
    }
};

document
    .querySelector('#create-ask')
    .addEventListener('click', newAskHandler);

document
    .querySelector('#create-task')
    .addEventListener('click', newTaskHandler);

document
    .querySelector('#create-comment')
    .addEventListener('click', newCommentHandler);

document
    .querySelector('.back-to-list')
    .addEventListener('click', backToList);