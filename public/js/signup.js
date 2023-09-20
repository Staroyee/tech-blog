// FUNCTION FOR A USER TO SIGNUP
async function signupFormHandler(event) {
    event.preventDefault();

    const user_name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (user_name && email && password) {
        const res = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                user_name,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if (res.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(res.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);