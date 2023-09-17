async function editFormHandler(event) {
    event.preventDefault();

    let user_name = document.querySelector('input[name="user-name"]').value.trim();
    if (user_name.length) user_name = '"username": "' + user_name + '"';
    
    let email = document.querySelector('input[name="email"]').value.trim();
    if(email.length) email = '"email": "' + email + '"';
    let password = document.querySelector('input[name="password"]').value.trim();
    if (!password.length) {
        alert('You must enter your current password to confirm changes or enter a new password.');
        return;
    } else {
        password = '"password": "' + password + '"';
    }
    const id = document.querySelector('input[name="user-id"]').value;

    let userUpdate = '{' + [user_name, email, password].filter(value => value).join(',') + '}';
    userUpdate = JSON.parse(userUpdate);

    const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userUpdate),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(res.statusText);
    }
};

document.querySelector('.edit-user-form').addEventListener('submit', editFormHandler);