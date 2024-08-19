import * as api from './api.js';

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

$(async function() {
    const data = await fetch('/api/google/sheet/getAlllinks')
    .then(response => {return response.json()});

    Object.keys(data).forEach(key => {
        const link = data[key];
        let id = extractId(link);

        const newItem = $(getAccordionHtmlData(id, key));
        $('#file-container').prepend(newItem);
        newItem.hide().fadeIn(1000);

        const csvLinks = link.split(',');
        if (csvLinks.length !==0) {
            csvLinks.forEach((csvLink, index) => {
                $(`#${id}-body`).prepend($(getAccordionLink(id, csvLink, 'File-' + index)));
             });
        } else {
            $(`#${id}-body`).prepend($(getAccordionLink(id, link, 'File-1')));
        }
        
    })

});

function getAccordionHtmlData(id, name) {
    return `
        <div class="mb-2 rounded">
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
    `
}

function getAccordionLink(id, link, linkName) {
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
