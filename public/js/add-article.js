async function newArticleFormHandler(event) {
    event.preventDefault();

    const article_title = document.querySelector('input[name="article-title"]').value.trim();
    const article_body = document.querySelector('textarea[name="article-body"]').value.trim();

    const res = await fetch('/api/articles', {
        method: 'POST',
        body: JSON.stringify({
            article_title,
            article_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log('failed')
        alert(res.statusText);
    }
};

document.querySelector('.new-article-form').addEventListener('submit', newArticleFormHandler);