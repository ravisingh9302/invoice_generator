
import './App.css';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import Modal from './Modal';
import Pdfview from './Pdfview';


function App() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { register: register2, handleSubmit: handlesubmit2, setValue: setValue2, formState: { errors: errors2 } } = useForm();
  const [currency, setCurrency] = useState("INR")
  const [cgst, setcgst] = useState(0.0)
  const [sgst, setsgst] = useState(0.0)
  const [discount, setdiscount] = useState(0.0)
  const [SubTotal, setsubtotal] = useState(0.0)
  const [morediscount, setmorediscount] = useState(0.0)
  const [items, setitems] = useState(JSON.parse(localStorage.getItem('Items')))
  const [isopen, setisopen] = useState(false)
  const [printdata, setprintdata] = useState({})

  useEffect(() => {
    console.log("useEffect")
    let sub = 0;
    for (let index = 0; index < items?.length; index++) {

      let a = items[index]
      sub += (parseFloat(a.price) * parseFloat(a.quantity) * (100 + parseFloat(parseFloat(a.cgst) + parseFloat(a.sgst))) * (100 - parseFloat(a.discount))) / 10000

    }
    setsubtotal(sub)
  }, [items])



  const onSubmit = data => {
    console.log(data);
    data['subTotal'] = SubTotal
    data['items'] = items
    console.log(data)
    setprintdata(data)
    setisopen(true)
  }


  const additem = (data) => {
    data['cgst'] = cgst;
    data['sgst'] = sgst;
    data['discount'] = discount;
    data['currency'] = currency;
    console.log(data)
    let abcd = JSON.parse(localStorage.getItem('Items'))
    if (!abcd) {
      let a = [];
      a.push(data)
      localStorage.setItem('Items', JSON.stringify(a))
      setitems(a)
    }
    else {
      abcd.push(data)
      localStorage.setItem("Items", JSON.stringify(abcd))
      setitems(abcd)
    }
    setValue2("quantity", 1)
    setValue2('price', null)
    setValue2("Item", null)
  }

  const delItem = (data) => {
    let ab = [...items]
    ab.splice(data, 1)
    localStorage.setItem("Items", JSON.stringify(ab))
    setitems(ab)
  }
  const clear = (data) => {
    console.log("clear")
    localStorage.removeItem("Items")
    setitems([])
  }




  return (
    <>

    
      <form >
        <div className=" bg-white w-full h-lvh flex flex-row font-mono text-black">
          {/* SIDEBAR */}
          <div className="bg-gray-100 w-1/5 border border-gray-300 m-2 flex flex-col gap-1 rounded-lg pt-1 overflow-auto">

            {/* CURRENCY */}
            <div className="flex flex-col space-y-2  items-center ">
              <label className="text-lg font-semibold " htmlFor="currency">
                Currency: <sup className="text-red-400">*</sup>
              </label>
              <select {...register("Currency", { required: true })} defaultValue="INR" className="w-1/2 rounded-lg p-1 bg-slate-100 border border-gray-400"  onBlur={(e) => { setCurrency(e.target.value) }}>
                {/* <option value="" disabled>
                    --choose Currency--
                  </option> */}
                <option value="INR" >INR (Indian Rupee) </option>
                <option value="USD">USD (United States Dollar)</option>
                <option value="GBP">GBP (British Pound Sterling)</option>
                <option value="JPY">JPY (Japanese Yen)</option>
                <option value="CAD">CAD (Canadian Dollar)</option>
               
              </select>
              {errors.Currency && (
                <span className="ml-2 text-xs tracking-wide text-red-600">
                  Choose Currency are required
                </span>
              )}
            </div>
            {/* SGST */}
            <div className="flex flex-col space-y-2  text-center">
              <label className="text-lg font-semibold" htmlFor="sgst">
                SGST:
              </label>
              <div className=''>
                <input
                  id='sgst'
                  type='number'
                  min={0}
                  max={100}

                  defaultValue={0.0}
                  // {...register("Sgst")}
                  className='w-1/2 px-3 rounded-l-lg  bg-slate-5 border border-gray-400' e
                  onBlur={(e) => { setsgst(e.target.value) }}
                />
                <span className=' rounded-r-lg p-1 bg-slate-300 '>%</span>
              </div>
            </div>

            {/* CGST */}
            <div className="flex flex-col text-center">
              <label className="text-lg font-semibold text-richblack-5" htmlFor="cgst" >
                CGST:
              </label>
              <div className='text-center border'>
                <input
                  id='cgst'
                  type='number'
                  min={0}
                  max={100}
                  defaultValue={0.0}
                  // {...register("Cgst")}
                  className='rounded-l-lg px-2 bg-slate-5 border border-gray-400 w-1/2'
                  onBlur={(e) => { setcgst(e.target.value) }}
                />
                <span className='rounded-r-lg p-1 bg-slate-300'>%</span>
              </div>
            </div>

            {/* DISCOUNT */}
            <div className="flex flex-col   text-center">
              <label className="text-lg font-semibold text-richblack-5" htmlFor="discount">
                Discount:
              </label>

              <div className=''>
                <input
                  id='discount'
                  type='number'
                  min={0}
                  max={100}
                  defaultValue={0}
                  // {...register("Discount")}
                  className='w-1/2 rounded-l-lg  px-2  bg-slate-5 border border-gray-400'
                  onBlur={(e) => { setdiscount(e.target.value) }}
                />
                <span className='rounded-r-lg p-1 bg-slate-300'>%</span>
              </div>
            </div>

            {/* PAYMENT MODE */}
            <div className="flex flex-col   items-center">
              <label className="text-lg font-semibold text-richblack-5" htmlFor="currency">
                Pay Mode: <sup className="text-pink-200">*</sup>
              </label>
              <select {...register("Paymentmode")} defaultValue="notdecided" className=" w-1/2 rounded-lg p-1 bg-slate-200 shadow-md border border-gray-400" >/
                {/* <option value="" disabled>
                    --choose Currency--
                  </option> */}
                <option value="cash">CASH</option>
                <option value="online">ONLINE</option>
                <option value="upi">UPI</option>
                <option value="erupee">E-Rupee</option>
                <option value="notdecided">Not Decided</option>
              </select>
            </div>

            {/* TOTALING CONTAINER */}
            <div className="flex flex-col space-y-2 rounded-lg bg-slate-300  py-2 items-center">
              <div className='flex flex-row  justify-between   w-[95%]'>
                <div className='text-lg font-semibold '>Total Items:</div>
                <div className='text-lg font-semibold'>{items?.length}</div>
              </div>
              <div className='flex flex-row  justify-between  w-[95%]'>
                <div className='text-lg font-semibold '>SubTotal:</div>
                <div className='text-lg font-semibold '>{currency}{" "}{parseFloat(SubTotal).toFixed(2)}</div>
              </div>
              <div className='flex flex-row  justify-between  w-[95%]'>
                <div className='text-lg font-semibold '>Discount:</div>
                <div className=' flex justify-end gap-2 ' >
                  <input type="number" {...register("Morediscount")} defaultValue={0.0} min={0} max={100} className='rounded-sm bg-slate-100 border border-gray-400 px-2' onBlur={(e) => { setmorediscount(e.target.value) }} /><span className='text-lg font-semibold'>%</span>
                </div>
              </div>
              <div className='w-11/12 border border-gray-500'></div>
              <div className='flex flex-row  justify-between  w-[95%]'>
                <div className='text-xl font-bold '>Total:</div>
                <div className='text-xl font-bold '>{currency}{" "}{(SubTotal * (1 - (parseFloat(morediscount) / 100))).toFixed(2)}</div>
              </div>
            </div>

            <div className=" flex flex-col space-y-4 rounded-lg bg-blue-600  py-4 items-center cursor-pointer" onClick={handleSubmit(onSubmit)}>
              <input type="button" value={'Preview'} />
            </div>

            <div className=" flex flex-col space-y-4 rounded-lg bg-blue-600  py-4 items-center cursor-pointer" onClick={clear}>
              <input type="button" value={'clear'} />
            </div>

          </div>

          {/* MAINBAR */}
          <div className="bg-slate-200 flex flex-col w-3/4 m-2 rounded-lg px-2 ">
            <div className="w-full ">
              <div className='mx-auto text-center font-bold'>
                INVOICE
              </div>

              {/* DATE AND INVOICE */}
              <div className=' flex flex-row justify-between'>
                <div className='flex flex-row  justify-center '>
                  <label htmlFor='date' className='text-lg font-semibold my-auto px-2'>Date:<sup className='text-red-500'>*</sup></label>
                  <input
                    id='date'
                    type='date'
                    // placeholder='dd/mm/yyyy'
                    // defaultValue={new Date(Date.now()).toLocaleString()}
                    // defaultValue={'12/01/2001'}
                    {...register("Date", { required: true })}
                    className='rounded-lg  px-4 bg-slate-5 border border-gray-400'
                  />
                  {errors.Date && (
                    <span className='ml-2 text-xs tracking-wide text-red-600'>Date is required</span>
                  )}
                </div>

                <div className='flex flex-row  justify-center '>
                  <label htmlFor='invoiceno' className='text-lg font-semibold my-auto px-2'>Invoice no.:<sup className='text-red-500'>*</sup></label>
                  <input
                    id='invoiceno'
                    placeholder='123ASDF'
                    {...register("Invoiceno", { required: true })}
                    className='rounded-lg  px-4 bg-slate-5 border border-gray-400'
                    
                  />
                  {errors.Invoiceno && (
                    <span className='ml-2 text-xs tracking-wide text-red-600'>Invoice no. is required</span>
                  )}
                </div>
              </div>

              {/* BILL TO */}
              <div className='flex flex-row justify-between'>

                <div className='flex flex-col space-y-2 justify-center align-middle px-2'>
                  <p className='font-bold flex flex-col'>Bill To:</p>
                  <input
                    id='cname'
                    type='text'
                    placeholder='Enter name'
                    {...register("Cname", { required: true })}
                    className='bg-richblack-700 text-richblack-5 border border-gray-400 placeholder:px-3 px-2'
                  />
                  {errors.Cname && (
                    <span className='ml-2 text-xs tracking-wide text-red-600'>Customer name is required</span>
                  )}
                  <input
                    id='cemail'
                    placeholder='Contact details'
                    {...register("Cemail", { required: true })}
                    className='bg-richblack-700 text-richblack-5 border border-gray-400 placeholder:px-3 px-2'
                  />
                  {errors.Cemail && (
                    <span className='ml-2 text-xs tracking-wide text-red-600'>Contact Details is required</span>
                  )}
                </div>

                <div className='flex flex-col space-y-2 justify-center align-middle px-2'>
                  <p className='font-bold'>Bill From:</p>
                  <input
                    id='bname'
                    type='text'
                    placeholder='Enter name'
                    {...register("Bname", { required: true })}
                    className='bg-richblack-700 text-richblack-5 border border-gray-400 placeholder:px-3 px-2'
                  />
                  {errors.Bname && (
                    <span className='ml-2 text-xs tracking-wide text-red-600'>Biller name is required</span>
                  )}

                  <input
                    id='bname'
                    placeholder='Contect Details'
                    {...register("Bemail", { required: true })}
                    className='bg-richblack-700 text-richblack-5 border border-gray-400 placeholder:px-3 px-2'
                  />
                  {errors.Bemail && (
                    <span className='ml-2 text-xs tracking-wide text-red-600'>Contact Detail is required</span>
                  )}
                </div>
              </div>

            </div>

            {/* ITEMS INPUT */}

            <div className=' flex flex-row py-1 px-3 mt-2 gap-2 justify-between'>
              <div className=' w-9/12'>
                <label className='font-semibold' htmlFor="items">Item:</label>
                <input type="text" id="items"  {...register2("Item", { required: true })} className='rounded-lg w-11/12 bg-richblack-700 text-richblack-5 border border-gray-400 placeholder:px-3 px-2' />
                {errors2.Item && (
                  <span className='ml-2 text-xs tracking-wide text-red-500'>Required</span>
                )}
              </div>

              <div className=''>
                <label className='font-semibold ' htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity"  {...register2("quantity", { required: true })} defaultValue={1} className='rounded-lg w-5/12  bg-richblack-700 text-richblack-5 border text-center border-gray-400 placeholder:px-3 px-2' />
              </div>

              <div className=''>
                <label htmlFor="price" className='font-semibold'>Price:</label>
                <input type="number" id="price"  {...register2("price", { required: true })} className=' rounded-lg w-5/12 bg-richblack-700 text-richblack-5 border border-gray-400 text-center placeholder:px-3 px-2' />
                {errors2.price && (
                  <span className='ml-2 text-xs tracking-wide text-red-500'>Required</span>
                )}
              </div>
              <div className=' w-2/12'>
                <input type='submit' onClick={handlesubmit2(additem)} className='w-full bg-blue-600 text-white rounded-lg shadow-lg cursor-pointer hover:bg-blue-800' value={"ADD"} />
              </div>
            </div>


            {/* DISPLAY ITEMS */}
            <div className=' mt-4  overflow-auto relative'>
              <table className="table-auto w-full  ">
                <thead className=' bg-slate-800 text-white text-start sticky top-0'>
                  <tr className='text-start '>
                    <th className='text-start p-1 '>No.</th>
                    <th className='text-start'>Items</th>
                    <th className='text-start'>Price{`(${currency})`}</th>
                    <th className='text-start'>Quntity</th>
                    <th className='text-start'>Tax</th>
                    <th className='text-start'>Discout</th>
                    <th className='text-start'>Amount {`(${currency})`}</th>
                    <th className='text-start'>Action</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {items?.map((a, b) => (
                    <tr className='border border-b-black' key={b}>
                      <td className=' ' >{b + 1}</td>
                      <td className=' '>{a.Item}</td>
                      <td className=' '>{parseFloat(a.price).toFixed(2)}</td>
                      <td className=''>{a.quantity}</td>
                      <td className=''>{parseFloat(a.cgst) + parseFloat(a.sgst)}%</td>
                      <td className=''>{parseFloat(a.discount)}%</td>
                      <td className=''>{((parseFloat(a.price) * parseFloat(a.quantity) * (100 + parseFloat(parseFloat(a.cgst) + parseFloat(a.sgst))) * (100 - parseFloat(a.discount))) / 10000).toFixed(2)}</td>
                      <td className=''><button type='button' onClick={() => { delItem(b) }} className='bg-red-400 text-center rounded-lg shadow-md cursor-pointer'>DELETE</button></td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </form>


      {
        isopen ? (
          <Modal data={printdata} isopen={setisopen} />
        ) : (
          <></>
        )
      }


    </>
  )
}

export default App;
