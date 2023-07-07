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
        color: black;
        position: absolute;
        font-size: 36px;
        text-transform: uppercase;
        font-family: 'Hanson Bold', sans-serif;
        text-align: center;
        letter-spacing: -1.9px;
        top: 392px;
        left: 40px;
        right: 30px;
    }
    .date {
        color: white;
        position: absolute;
        font-size: 23px;
        text-transform: uppercase;
        font-family: 'Gobold Bold', sans-serif;
        text-align: center;
        letter-spacing: -1.4px;
        top: 504px;
        left: 24px;
        right: 20px;
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
        top: 701px;
    }
    .contact-second {
        top: 727px;
    }
</style>

<script>
    import { onMount } from "svelte";
    import {
        retrieveLastData,
        generate,
        storageLastData,
        deleteStorageDataByHash,
        retrieveStorageDataByHash,
        getFilename,
        getGroupParamsByRouteId,
        getGroupIdByRouteId
    } from "../+layout.js";
    import { page } from "$app/stores";

    let lastData = [];

    let prefix;
    let type;
    let name;
    let date;
    let address_top;
    let address_bottom;
    let contact_1;
    let contact_2;

    onMount(async () => {
        lastData = retrieveLastData()
        handleRestoreData(retrieveStorageDataByHash($page.url.searchParams.get('gc')))
    });

    async function handleGenerate() {
        const storagedSucesfull = await storageLastData({ type, prefix, name, date, address_top, address_bottom, contact_1, contact_2 })
        if(storagedSucesfull) {
            generate(getFilename(prefix, name, date))
            updateLastDataList()
        }
    }

    function handleDelete(hash) {
        deleteStorageDataByHash(hash)
        updateLastDataList()
    }

    function handleClearFields() {
        handleRestoreData({})
    }

    function updateLastDataList() {
        lastData = retrieveLastData()
    }

    function handleRestoreData(lastData) {
        type = getGroupIdByRouteId($page.routeId)
        prefix = getGroupParamsByRouteId(type).prefix
        name = lastData.name;
        date = lastData.date;
        address_top = lastData.address_top;
        address_bottom = lastData.address_bottom;
        contact_1 = lastData.contact_1;
        contact_2 = lastData.contact_2;
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
    <button on:click={handleClearFields}>Limpar Campos</button>

    <ul>
        {#each lastData as last}
            <p><strong><a href="/gc-kit/?gc={last.hash}">{last.prefix} {last.name}</a></strong></p>
            <p>{last.date}</p>
            <p>{last.address_top} - {last.address_bottom}</p>
            <p>{last.contact_1}</p>
            <p>{last.contact_2}</p>
            <button on:click|preventDefault={ () => handleDelete(last.hash) }>Deletar</button>
            <button on:click|preventDefault={ () => handleRestoreData(last) }>Restaurar</button>
        {/each}
    </ul>
</div>

<div class="wrapper">
    <div class="folder" id="kit">
        <p class="title">{name}</p>
        <p class="date">{date}</p>
        <p class="address address_top">{address_top}</p>
        <p class="address address_bottom">{address_bottom}</p>
        <p class="contact contact-first">{contact_1}</p>
        <p class="contact contact-second">{contact_2}</p>
        <img class="base" src="../nexteen-meninas/BASE-MENINAS.png" alt="">
<!--        <img class="base" src="../nexteen-meninas/EXEMPLO-NEXTEEN-MENINAS.png" alt="">-->
    </div>
</div>
