// FUNCTION FOR A USER TO LOGOUT
async function logout() {
    const res = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
        document.location.replace('/');
    } else {
        alert(res.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);