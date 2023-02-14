export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    // console.log(user.authorisation.token);
    if (user && user.authorisation.token) {
        return { Authorization: 'Bearer ' + user.authorisation.token };
    } else {
        return {};
    }
}
