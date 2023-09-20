// FUNCTION TO EDIT AN ARTICLE
async function editArticleFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(id)

    const article_title = document.querySelector('input[name="article-title"]').value;
    const article_body = document.querySelector('textarea[name="article-body"]').value;

    const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
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
        alert(res.statusText);
        }

  }
  
  document.querySelector('.edit-article-form').addEventListener('submit', editArticleFormHandler);