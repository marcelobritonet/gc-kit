<svelte:head>

</svelte:head>

<style>
    @font-face {
        font-family: 'Printvetica';
        src: url("/font/Printvetica.otf");
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
        color: #004012;
        position: absolute;
        font-size: 36px;
        text-transform: uppercase;
        font-family: 'Printvetica', sans-serif;
        text-align: center;
        letter-spacing: 0;
        top: 451px;
        left: 37px;
        right: 30px;
    }
    .date {
        color: black;
        position: absolute;
        font-size: 30px;
        text-transform: uppercase;
        font-family: 'Printvetica', sans-serif;
        text-align: center;
        top: 545px;
        left: 32px;
        right: 30px;
    }
    .address {
        color: black;
        position: absolute;
        font-family: 'Printvetica', sans-serif;
        text-transform: uppercase;
        right: 30px;
        left: 31px;
        text-align: center;
        line-height: 21px;
        font-size: 21px;
        letter-spacing: -.47px;
    }
    .address_label {
        font-size: 19px;
        top: 775px;
        letter-spacing: .7px;
    }
    .address_top {
        top: 797px;
    }
    .address_bottom {
        top: 820px;
    }
    .contact {
        color: black;
        position: absolute;
        font-family: 'Printvetica', sans-serif;
        text-transform: uppercase;
        text-align: center;
        left: 52px;
        right: 50px;
        font-size: 21px;
        letter-spacing: -.47px;
    }
    .contact_label {
        top: 650px;
        font-size: 19px;
        letter-spacing: .7px;
    }
    .contact_first {
        top: 671px;
    }
    .contact_second {
        top: 695px;
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
        {:else}
            <p>nenhum GC encontrado</p>
        {/each}
    </ul>
</div>

<div class="wrapper">
    <div class="folder" id="kit">
        <p class="title">{name}</p>
        <p class="date">{date}</p>
        <p class="contact contact_label">LÍDERES:</p>
        <p class="contact contact_first">{contact_1}</p>
        <p class="contact contact_second">{contact_2}</p>
        <p class="address address_label">ENDEREÇO:</p>
        <p class="address address_top">{address_top}</p>
        <p class="address address_bottom">{address_bottom}</p>
        <img class="base" src="../27/BASE-NEXT27.png" alt="">
<!--        <img class="base" src="../27/EXEMPLO-NEXT27.png" alt="">-->
    </div>
</div>
