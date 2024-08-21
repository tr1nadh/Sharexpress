import * as api from './api.js';

$('#refresh').on('click', async function() {
    $('#ref-txt').html('Refreshing....');
    await loadItems();
    $('#ref-txt').html('Refresh');
})

$(document).on('click', '.delete-btn', async function() {
    const deleteConfirm = confirm("Are your sure you want to delete?");
    if (deleteConfirm) {
        const id = $(this).data('target-id');
        await api.deleteFile(id);
        $(`#${id}-item`).fadeOut(300, 
            () => $(this).remove());
    }
});

$('#show-qr').on('click', async function() {
    const qr = await api.getQR();
    $('#rcv-qr-img').attr('src', qr.qrUrl);
});

$('#logout-btn').on('click', async function() {
    const revokeConfirm = confirm("Are your sure you want to logout?");
    if (revokeConfirm) {
        const redirect = await api.revokeUser();
        window.location.href = redirect.url;
    }
});

$(loadItems());
async function loadItems() {
    const data = await fetch('/api/google/sheet/getAlllinks')
    .then(response => {return response.json()});

    $('#file-container').html('');
    Object.keys(data).forEach((key, index) => {
        const link = data[key];

        const newItem = $(getAccordionHtmlData(index, key));
        $('#file-container').prepend(newItem);
        newItem.hide().fadeIn(1000);

        const csvLinks = link.split(',');
        if (csvLinks.length !==0) {
            csvLinks.forEach((link) => {
                const linkId = extractId(link);
                $(`#${index}-body`).prepend($(getAccordionLink(linkId)));
             });
        } else {
            const linkId = extractId(link);
            $(`#${index}-body`).prepend($(getAccordionLink(linkId)));
        }
    })

}

function getAccordionHtmlData(id, name) {
    return `
    <div id='${id}-item' class="row">
        <div class="mb-2 rounded col-sm-11">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}-collapse">
                        <span><b>From: </b>  ${name}</span>
                    </button>
                </h2>
                <div id="${id}-collapse" class="accordion-collapse collapse">
                    <div id="${id}-body" class="accordion-body d-flex flex-row gap-2 overflow-auto">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-1">
            <button class="delete-btn btn btn-danger" data-target-id='${id}'>
            <i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
    `
}

function getAccordionLink(id) {
    return `
        <div class='d-flex flex-column gap-2'>
            <iframe loading="lazy" src="https://drive.google.com/file/d/${id}/preview" 
            width="300" height="300" allow="autoplay"></iframe>
            <a class='me-2 btn btn-outline-success' href="https://drive.google.com/uc?export=download&id=${id}">
            <i class="fa-solid fa-download"></i> Dowload</a>
        </div> 
    `
}

function extractId(link) {
    const regex = /id=([a-zA-Z0-9_-]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
}
