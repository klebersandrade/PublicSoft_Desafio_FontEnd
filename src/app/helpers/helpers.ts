import { Contrato } from 'src/app/models/contrato';

import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ElementRef } from '@angular/core';

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

export const exportHTMLToPdf = (contratos: DataTables.Api) => {

    const dados = contratos.toArray();

    const doc = new jsPDF();
    // You can use html:
    doc.autoTable({ html: '#my-table' });

    // Or JavaScript:
    doc.autoTable({
        head: [['Name', 'Email', 'Country']],
        body: [
            ['David', 'david@example.com', 'Sweden'],
            ['Castille', 'castille@example.com', 'Norway'],
            // ...
        ]
    });

    doc.save('table.pdf');
};


