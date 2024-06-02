import React from 'react'
// import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import { useEffect, useState } from 'react';

function Pdfview() {
    const [url, seturl] = useState('https://firebasestorage.googleapis.com/v0/b/my-project-91bf9.appspot.com/o/css_chearsheet.pdf?alt=media&token=15e986fe-b980-4b34-b367-5ded6ff0ade4')

    var it = [{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"},{ 'Amount': "4684.00", 'Dis.': "0%", Items: "adfaffsaf gfhfghf  ", 'No.': '1', Price: "234266.00", Quantity: "2", Tax: "0%"}, { Amount: "4684.00", "Dis.": "0%", Items: "adfaffsaf", 'No.': '1', Price: "2342.00", Quantity: "2", Tax: "99%", }, { Amount: "4684.00", 'Dis.': "0%", Items: "adfaffsaf", 'No.': '1', Price: "2342.00", Quantity: "2", Tax: "0%", }]
    var it1 = [{ id: "No.",name:"No.",prompt:"No.",width:35,padding:0,align:"center"},{ id: "Items",name:"Items",prompt:"Items",width:205},{ id: "Price",name:"Price",prompt:"Price",width:90},{ id: "Quantity",name:"Quantity",prompt:"Quantity",width:80,padding:0,align:"center"},{ id: "Tax",name:"Tax",prompt:"Tax",width:40},{ id: "Dis.",name:"Dis.",prompt:"Dis.",width:40,padding:0,align:"center"},{ id: "Amount",name:"Amount",prompt:"Amount",width:90} ]

    var headers = [
        "No.",
        "Items",
        "Price",
        "Quantity",
        "Tax",
        "Discount",
        "Amount"
    ];

    useEffect(() => {
        // function GenerateInvoice() {
        //     html2canvas(document.querySelector("#printabledata")).then((canvas) => {
        //         const imgData = canvas.toDataURL('image/png', 1.0);

        // geerate img
        // var link = document.createElement("a");
        // link.download = "certificate.pdf";
        // link.href = abcd;
        // link.click();



        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: 'a4',
            floatPrecision: 10
            // encryption: { userPassword: "1234" }

        });
        pdf.internal.scaleFactor = 1;
        console.log(pdf.getFontSize())
        pdf.text("Biller:", 20, 20);
        pdf.text("Invoice #:", 300, 20);
        pdf.setFontSize(12)
        pdf.text("Customer Name:", 20, 40);
        pdf.setFontSize(16)
        pdf.text("Date:", 300, 40);
        
        pdf.setFontSize(10)
        pdf.text("Customer Contact:", 20, 60);
        pdf.text("Biller Contact:", 300, 60);
        // pdf.line(0,10,210,10)
        // pdf.line(105,0,105,297)
        pdf.line(0, 315.5, 447, 315.5) //px
        pdf.line(223.5, 0, 223.5, 631)
        pdf.setFontSize(10)
        pdf.table(5, 80, it, it1,{});
        pdf.cell(40,400,40,20,"fafa",5)
        // pdf.insertPage(2);
        // pdf.printHeaderRow(1,true)
        pdf.text("Customer Contact:", 300, 100);
        // pdf.text("Biller Contact:", 300,100);
        let abcd = pdf.output('bloburl')

        seturl(abcd)
        console.log(abcd)

        // const imgProps = pdf.getImageProperties(imgData);
        // const pdfWidth = pdf.internal.pageSize.getWidth();
        // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // pdf.save('invoice-001.pdf');

        // });
        // }
        console.log("ravo", url)
    }, [])


    return (
        <div>
            <embed src={url} type="application/pdf" width="100%" height="600px" />
        </div>
    )
}

export default Pdfview