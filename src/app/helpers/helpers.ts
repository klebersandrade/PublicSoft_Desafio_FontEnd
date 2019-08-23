import { Contrato } from 'src/app/models/contrato';

import * as printJS from 'print-js';
import * as XLSX from 'xlsx';
declare var jsPDF: any;
import { ElementRef } from '@angular/core';
declare var document: any;

export const downloadCSV = (csv, filename) => {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: 'text/csv' });

    // Download link
    downloadLink = document.createElement('a');

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = 'none';

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
};

export const downloadXLSX = (xlsx, filename) => {
    let xlsxFile;
    let downloadLink;

    // CSV file
    xlsxFile = new Blob([xlsx], { type: 'application/octet-stream' });

    // Download link
    downloadLink = document.createElement('a');

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(xlsxFile);

    // Hide download link
    downloadLink.style.display = 'none';

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
};

export const exportTableToCSV = (contratos: DataTables.Api) => {
    const csv = [];
    contratos.each((contrato, index, data) => {
        const row = [];
        for (const campo in contrato) {
            if (contrato.hasOwnProperty(campo)) {
                const element = contrato[campo];
                row.push(element);
            }
        }
        csv.push(row.join(';'));
    });

    // Download CSV file
    downloadCSV(csv.join('\n'), 'contratos.csv');
};


export const exportTableToXLSX = (contratos: DataTables.Api) => {

    const wb = XLSX.utils.book_new();
    const dados = contratos.toArray();

    const ws = XLSX.utils.json_to_sheet(dados, { skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, 'No Header');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    downloadXLSX(wbout, 'contratos.xlsx');
};

export const exportHTMLToPdf = (contratos: DataTables.Api, returnContent: boolean) => {

    const dados = contratos.toArray();

    const linhas = dados.map((contrato) => {
        const row = [];
        row.push(contrato.contrato.toString());
        row.push(contrato.licitacao.toString());
        row.push(contrato.tipo.toString());
        row.push(contrato.favorecido.toString());
        row.push(Number(contrato.valorInicial).toFixed(2));
        return row;
    });

    const doc = new jsPDF();
    doc.autoTable({
        head: [['Contrato', 'Licitação', 'Tipo', 'Favorecido', 'Valor Inicial']],
        body: linhas
    });
    if (returnContent) {
        let file: string = doc.output('datauristring');

        file = file.replace('data:application/pdf;filename=generated.pdf;base64,', '');
        return file;
    } else {
        doc.save('contratos.pdf');
    }
};

export const printToPdf = (base64String: string) => {
    printJS({ printable: base64String, type: 'pdf', base64: true });
};


export const goInFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

/* Get out of full screen */
export const GoOutFullscreen = () => {

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.moz.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

/* Is currently in full screen or not */
export const IsFullScreenCurrently = () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement || document.msFullscreenElement || null;

    // If no element is in full-screen
    if (fullScreenElement === null) {
        return false;
    } else {
        return true;
    }
};

