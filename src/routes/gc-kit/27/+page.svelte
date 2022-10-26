<svelte:head>

</svelte:head>

<style>
    @font-face {
        font-family: 'Consola';
        src: url("/font/consola.ttf");
    }
    @font-face {
        font-family: 'Gobold Bold';
        src: url("/font/gobold-bold.otf");
    }
    @font-face {
        font-family: 'Hanson Bold';
        src: url("/font/hanson-bold.ttf");
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
        max-height: 1024px;
    }
    .title {
        color: white;
        position: absolute;
        font-size: 28px;
        text-transform: uppercase;
        font-family: 'Hanson Bold', sans-serif;
        text-align: center;
        letter-spacing: .3px;
        top: 415px;
        left: 37px;
        right: 30px;
    }
    .group {
        color: white;
        position: absolute;
        font-size: 16px;
        text-transform: uppercase;
        font-family: 'Hanson Bold', sans-serif;
        text-align: center;
        letter-spacing: .3px;
        top: 400px;
        left: 365px;
        right: 60px;
    }
    .date {
        color: white;
        position: absolute;
        font-size: 23px;
        text-transform: uppercase;
        font-family: 'Gobold Bold', sans-serif;
        text-align: center;
        letter-spacing: -1.4px;
        top: 503px;
        left: 32px;
        right: 30px;
    }
    .address {
        color: white;
        position: absolute;
        font-family: 'Consola', sans-serif;
        text-transform: uppercase;
        right: 30px;
        left: 32px;
        text-align: center;
        line-height: 21px;
        font-size: 24px;
        letter-spacing: -0.6px;
    }
    .address_top {
        top: 606px;

    }
    .address_bottom {
        top: 629px;
    }
    .contact {
        color: white;
        position: absolute;
        font-family: 'Consola', sans-serif;
        text-transform: uppercase;
        text-align: center;
        left: 52px;
        right: 50px;
        font-size: 22px;
        letter-spacing: -0.4px;
    }
    .contact-first {
        top: 703px;
    }
    .contact-second {
        top: 727px;
    }
</style>

<script>
    import { onMount } from "svelte";
    import {retrieveLastData, generate, storageLastData, capitalizeString} from "../+layout.js";

    let prefix;
    let name;
    let group;
    let date;
    let address_top;
    let address_bottom;
    let contact_1;
    let contact_2;

    onMount(async () => {
        const lastData = retrieveLastData()

        prefix = "GC 27+";
        name = lastData.name || "nome do gc";
        group = lastData.group || "";
        date = lastData.date || "data hora";
        address_top = lastData.address_top || "endereço";
        address_bottom = lastData.address_bottom || "complemento";
        contact_1 = lastData.contact_1 || "nome telefone";
        contact_2 = lastData.contact_2 || "nome telefone";
    });

    function handleGenerate() {
        const filename = `${prefix} ${capitalizeString(name)} - ${date.toUpperCase()}.jpeg`
        const obj = {
            prefix: prefix,
            name: name,
            group: group,
            date: date,
            address_top: address_top,
            address_bottom: address_bottom,
            contact_1: contact_1,
            contact_2: contact_2
        }
        generate(filename)
        storageLastData(obj)
    }

</script>

<div class="form">
    <input bind:value={name} type="text" placeholder="Nome do GC">
    <input bind:value={group} type="text" placeholder="(opcional) Grupo">
    <input bind:value={date} type="text" placeholder="Dia da Semana / Horário">
    <input bind:value={address_top} type="text" placeholder="Endereço">
    <input bind:value={address_bottom} type="text" placeholder="Complemento">
    <input bind:value={contact_1} type="text" placeholder="Contato 1">
    <input bind:value={contact_2} type="text" placeholder="Contato 2">

    <button on:click={handleGenerate}>Baixar Arte</button>
</div>

<div class="wrapper">
    <div class="folder" id="kit">
        <p class="title">{name}</p>
        <p class="group">{group}</p>
        <p class="date">{date}</p>
        <p class="address address_top">{address_top}</p>
        <p class="address address_bottom">{address_bottom}</p>
        <p class="contact contact-first">{contact_1}</p>
        <p class="contact contact-second">{contact_2}</p>
        <img class="base" src="27/BASE-NEXT27.png" alt="">
<!--        <img class="base" src="27/EXEMPLO-NEXT27.png" alt="">-->
    </div>
</div>
