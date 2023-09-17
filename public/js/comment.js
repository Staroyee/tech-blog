async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const article_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (comment_text) {
        const res = await fetch ('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                article_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            document.location.reload();
        } else {
            alert(res.statusText);
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);