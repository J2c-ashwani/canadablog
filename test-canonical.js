const url = new URL('https://www.fsidigital.ca/contact?service=sba-microloan-help');
url.search = '';
console.log(url.toString());
