// FUNCTION TO DELETE AN ARTICLE
async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(res.statusText);
    }
};

document.querySelector('.delete-article-btn').addEventListener('click', deleteFormHandler);