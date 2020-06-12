export default name => {
    const match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    return match ? match[1] : '';
}