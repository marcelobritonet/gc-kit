<svelte:head>

</svelte:head>

<style>
    @font-face {
        font-family: 'Fjalla One';
        src: url("/font/FjallaOne-Regular.ttf");
    }
    @font-face {
        font-family: 'Montserrat Regular';
        src: url("/font/Montserrat/Montserrat-Regular.ttf");
    }
    .wrapper {
        margin: 0;
        padding: 0;
        position: relative;
    }
    .form {

    }
    .folder {
        position: absolute;
        width: 576px;
        height: 1024px;
        margin: 0;
        padding: 0;
        top: 0;
        left: 0;
    }
    .base{

    }
    .title {
        color: white;
        position: absolute;
        font-size: 25px;
        text-transform: uppercase;
        font-family: 'Fjalla One', sans-serif;
        letter-spacing: -1.4px;
    }
    .name {
        top: 470px;
        left: 113px;
    }
    .date {
        top: 470px;
        right: 108px;
    }
    .address {
        color: white;
        position: absolute;
        font-family: 'Montserrat Regular', sans-serif;
        text-transform: uppercase;
        right: 100px;
        left: 100px;
        text-align: center;
        line-height: 21px;
    }
    .address_top {
        top: 593px;

    }
    .address_bottom {
        top: 614px;
    }
    .contact {
        color: white;
        position: absolute;
        font-family: 'Montserrat Regular', sans-serif;
        text-transform: uppercase;
        text-align: center;
        left: 125px;
        right: 120px;
    }
    .contact-first {
        top: 683px;
    }
    .contact-second {
        top: 705px;
    }
</style>

<script>
    import { onMount } from "svelte";
    import * as htmlToImage from 'html-to-image';

    let prefix;
    let name;
    let date;
    let address_top;
    let address_bottom;
    let contact_1;
    let contact_2;

    onMount(async () => {
        const lastData = retrieveLastData()

        prefix = lastData.prefix;
        name = lastData.name;
        date = lastData.date;
        address_top = lastData.address_top;
        address_bottom = lastData.address_bottom;
        contact_1 = lastData.contact_1;
        contact_2 = lastData.contact_2;
    });

    function handleGenerate() {
        generate()
        storageLastData()
    }

    function generate() {
        htmlToImage.toJpeg(document.getElementById('kit'), { quality: 1 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = `${prefix} ${name} - ${date}.jpeg`;
                link.href = dataUrl;
                link.click();
            });
    }

    function storageLastData() {
        const obj = {
            prefix: prefix,
            name: name,
            date: date,
            address_top: address_top,
            address_bottom: address_bottom,
            contact_1: contact_1,
            contact_2: contact_2
        }
        const myJSON = JSON.stringify(obj);
        localStorage.setItem("last-item", myJSON);
    }

    function retrieveLastData() {
        const lastItem = localStorage.getItem("last-item")
        return JSON.parse(lastItem);
    }
</script>

<div class="form">
    <input bind:value={name} type="text" placeholder="Nome do GC">
    <input bind:value={date} type="text" placeholder="Dia da Semana / Horário">
    <input bind:value={address_top} type="text" placeholder="Endereço">
    <input bind:value={address_bottom} type="text" placeholder="Complemento">
    <input bind:value={contact_1} type="text" placeholder="Contato 1">
    <input bind:value={contact_2} type="text" placeholder="Contato 2">

    <button on:click={handleGenerate}>Baixar Arte</button>
</div>

<div class="wrapper">
    <div class="folder" id="kit">
        <p class="title name">{name}</p>
        <p class="title date">{date}</p>
        <p class="address address_top">{address_top}</p>
        <p class="address address_bottom">{address_bottom}</p>
        <p class="contact contact-first">{contact_1}</p>
        <p class="contact contact-second">{contact_2}</p>
        <img class="base" src="folder-base.jpeg" alt="">
    </div>
</div>
