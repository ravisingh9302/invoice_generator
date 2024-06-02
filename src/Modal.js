import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

function Modal({ data, isopen }) {
    console.log("DATA:",data)
    const close = () => {
        console.log("close modal")
        isopen(false)
    }
    const print = () => {
        console.log("print data")
        window.print()
        isopen(false)
    }


    // hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500
    function itemsdata() {
        console.log("itemsdata")
        let result = []
        for (let index = 0; index < data.items.length; index++) {
            let obj = {};
            obj['No.'] = index + 1;
            obj['Items'] = data.items[index].Item;
            obj['Price'] = data.Currency + parseFloat(data.items[index].price).toFixed(2)
            obj['Quantity'] = data.items[index].quantity
            obj['Tax'] = (parseFloat(data.items[index].cgst) + parseFloat(data.items[index].sgst)) + "%"
            obj['Discount'] = parseFloat(data.items[index].discount) + "%"
            obj['Amount'] = data.Currency + parseFloat((parseFloat(data.items[index].price) * parseFloat(data.items[index].quantity) * (100 + parseFloat(parseFloat(data.items[index].cgst) + parseFloat(data.items[index].sgst))) * (100 - parseFloat(data.items[index].discount))) / 10000).toFixed(2)
            result.push(Object.assign({}, obj));
        }
        console.log(result)
        return result
    }

    function GenerateInvoice() {
        // itemsdata()

        console.log("gerate invoice")

        // html2canvas(document.querySelector("#printabledata")).then((canvas) => {
            // const imgData = canvas.toDataURL('image/png', 2.0);

        
            // const pdf = new jsPDF({
            //     orientation: 'p',
            //     unit: '',
            //     format: 'a4',
            //     // encryption: { userPassword: "1234" }

            // });
            // pdf.internal.scaleFactor = 1;
            // console.log(pdf.getFontSize())
            // pdf.text("Hello landscape world!", 20, 20);
            // let abcd = pdf.output('bloburl')

            // var link = document.createElement("a");
            // link.download = "certificate.pdf";
            // link.href = abcd;


            // <embed src={abcd} type="application/pdf" width="100%" height="600px" />


            // link.click();
            // const imgProps = pdf.getImageProperties(imgData);
            // const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // pdf.save('invoice-001.pdf');
        // });

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: 'a4',
            floatPrecision: 10
            // encryption: { userPassword: "1234" }

        });

        // pdf.text("Hello landscape world!", 20, 20);
        var recipt =document.querySelector("#printabledata")
        console.log(recipt)
        // pdf.html(document.querySelector("#printabledata"))
        // pdf.save('invoice.pdf')
        
        pdf.html(recipt, {
            callback: function(doc) {
                // Save the PDF
                // console.log("ravi singh")
                // var pdfprt =doc.output('bloburl')
                // console.log("pdfurl",pdfprt)

                doc.save('sample-document.pdf');
            },
            margin: [10, 10, 10, 10],
            autoPaging: 'text',
            x: 10,
            y: 10,
            width: 410, //target width in the PDF document
            windowWidth: 800 //window width in CSS pixels
        });
    }

    return (
        <>

            <div className=" w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto backdrop-blur-sm">
                <div className="border-2    mt-3 sm:max-w-xl sm:w-full  sm:mx-auto h-[calc(100%-3.5rem)] ">
                    <div className=" h-auto  flex flex-col bg-white   shadow-sm rounded-lg pointer-events-auto ">
                        <div className="border-b flex justify-between items-center py-3 px-4">
                            <h3 className="font-bold text-black">
                                Modal title
                            </h3>
                            <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none " onClick={close}>
                                <span className="sr-only">Close</span>
                                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div id='printabledata' className=''>
                            <div className="p-3 ">
                                <div className='flex flex-row justify-between text-lg font-bold'>
                                    <div className=''>Biller: {data.Bname?.toUpperCase()}</div>
                                    <div >Invoice #: {data.Invoiceno}</div>
                                </div>
                                <div className='flex flex-row justify-between font-medium'>
                                    <div>
                                        <div>Customer: {data.Cname}</div>
                                        <div>Customer Email: {data.Cemail}</div>
                                    </div>
                                    <div>
                                        <div>Bill Date: {data.Date}</div>
                                        <div>Biller Email: {data.Bemail}</div>
                                    </div>
                                </div>

                                <div className=' mt-7 '>
                                    <table className="table-auto w-full ">
                                        <thead className='  text-black text-start'>
                                            <tr className='text-start '>
                                                <th className='text-start p-1 '>No.</th>
                                                <th className='text-start'>Items</th>
                                                <th className='text-start'>Price {`(${data.Currency})`}</th>
                                                <th className='text-start'>Quntity</th>
                                                <th className='text-start'>Tax</th>
                                                <th className='text-start'>Discout</th>
                                                <th className='text-start'>Amount {`(${data.Currency})`}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.items?.map((a, b) => (
                                                <tr className='border-b border-gray-500' key={b}>
                                                    <td className='pb-3' >{b + 1}</td>
                                                    <td className=' '>{a.Item}</td>
                                                    <td className=' '>{parseFloat(a.price).toFixed(2)}</td>
                                                    <td className=''>{a.quantity}</td>
                                                    <td className=''>{parseFloat(a.cgst) + parseFloat(a.sgst)}%</td>
                                                    <td className=''>{parseFloat(a.discount)}%</td>
                                                    <td className=''>{((parseFloat(a.price) * parseFloat(a.quantity) * (100 + parseFloat(parseFloat(a.cgst) + parseFloat(a.sgst))) * (100 - parseFloat(a.discount))) / 10000).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className='flex flex-row justify-end font-semibold mt-7'>
                                    <div>
                                        <div className='pb-1'>SubTotal: {data.Currency}{" "} {parseFloat(data.subTotal).toFixed(2)}</div>
                                        <hr />
                                        <div className='pb-1'>Additional Discount: {data.Morediscount}%</div>
                                        <hr />
                                        <div className='font-bold text-xl'>Total Payable Amount: {data.Currency}{" "}{(data.subTotal * (1 - (parseFloat(data.Morediscount) / 100))).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end items-center gap-x-2 py-3 px-4  border-t bg-slate-300">
                            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={close} >
                                Close
                            </button>
                            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={GenerateInvoice}>
                                Print Invoice
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Modal