"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const button = document.querySelector('#submitButton');
    button.addEventListener('click', ipOphalen);
}

async function ipOphalen() {
    const url = 'https://api.ipify.org/?format=json';
    try {
        let response = await fetch(url);
        let data = await response.json();
        getIpInfo(data.ip);
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}


async function getIpInfo(ip) {
    let ipData = document.querySelector('#ipData');
    let stadData = document.querySelector('#stadData');
    let regioData = document.querySelector('#regioData');
    let landData = document.querySelector('#landData');

    let url = 'https://ipinfo.io/'+ip+'/geo';
    try {
        let response = await fetch(url);
        let data = await response.json();
        ipData.innerHTML = 'Ip:' +ip;
        stadData.innerHTML = 'Stad: '+ data.city;
        regioData.innerHTML = 'Regio: ' + data.region;
        landData.innerHTML = 'Land: ' + data.country;
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}