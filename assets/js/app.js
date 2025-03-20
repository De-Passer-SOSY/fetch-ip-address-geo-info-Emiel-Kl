"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const button = document.querySelector('#submitButton');
    button.addEventListener('click', fetchIp);
}

async function fetchIp() {
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
        ipData.innerHTML = 'ip: ' + ip;
        stadData.innerHTML = 'Stad: ' + data.city;
        regioData.innerHTML = 'Regio: ' + data.region;
        landData.innerHTML = 'Land: ' + data.country;
        fetchCoordinates(data.city, data.country)
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}

async function fetchCoordinates(city, region) {
    try {
        let response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city},${region}&format=json`);
        let data = await response.json();
        console.log(data);
        if (data.length === 0) throw new Error("Geen coördinaten gevonden");
        let lat = data[0].lat;
        let lon = data[0].lon;
        displayCoordinates(lat, lon);
        //fetchWeather(lat, lon);
    } catch (error) {
        console.error("Fout bij het ophalen van de coördinaten:", error);
    }
}

function displayCoordinates(lat, lon){
    let latData = document.querySelector('#latData');
    let lonData = document.querySelector('#lonData');

    latData.innerHTML = 'latitude: ' + lat;
    lonData.innerHTML = 'longitude: ' + lon;
}