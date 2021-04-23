import React, { useState } from 'react'
import Graph from '../../contents/Graph';
import { functionx } from '../../functionx';
import { addStyles, EditableMathField } from "react-mathquill";
import TableIteration from '../../contents/TableIteration';
import axios from 'axios';
addStyles()

export default function Bisection() {

    const [latex, setLatex] = useState("")
    const [xl, setXl] = useState(0)
    const [xr, setXr] = useState(0)
    const [inputtable, setInputtable] = useState([])

    var column = [
        {
            headerName: 'Iteration',
            field: 'id',
            width: 200
        },
        {
            headerName: 'XL',
            field: 'xl',
            width: 200
        },
        {
            headerName: 'XM',
            field: 'xm',
            width: 200
        },
        {
            headerName: 'XR',
            field: 'xr',
            width: 200
        },
        {
            headerName: 'f(Xm)',
            field: 'fxm',
            width: 200
        },
        {
            headerName: 'Error',
            field: 'e',
            width: 200
        }
    ];
        

    const example = async () => {
        await axios.get('http://localhost:5000/api/exs/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/Bisection')
        .then(res => {
            setLatex(res.data.latex)
            setXl(res.data.xl)
            setXr(res.data.xr)
        })
        .catch(error => {
            alert("API is turned off.")
        })
    }

    const findfx = (x) => {
        if(latex !== ""){
            var a = functionx(latex,x)
        }
        return a;
    }

    let i,xll,xrr,old,e;
    let allall = [];

    const bisection = () => {
        let all=[]
        i = 0;
        xll = xl
        xrr = xr
        old = null;
        e = 10;
        while(e > 0.000001){
            var xm = (xll+xrr)/2;
            var xlold = xll;
            var xrold = xrr;
            var fxm = findfx(xm);/* 
            console.log(xll,xm,xrr,old,e); */
            if((fxm*findfx(xrr))>0){
                xrr=xm;/* 
                console.log(xll,xm,xrr,old,e); */
            }
            else{
                xll = xm;
            }
            if(old !== null){
                e = Math.abs((xm-old)/xm)
            }
            /* console.log(i,xll,xm,xrr,e);  */
            /* console.log("f : "+f); */
            let xloldp = parseFloat(xlold.toFixed(6));
            let xmp = parseFloat(xm.toFixed(6));
            let xrrp = parseFloat(xrold.toFixed(6));
            let fxmp = parseFloat(fxm.toFixed(6));
            let ep = parseFloat(e.toFixed(6));
            all[i] = {id:i+1,xl:xloldp,xm:xmp,xr:xrrp,fxm:fxmp,e:ep};/* 
            console.log("i :"+i) */
            old = xm;
            i++;
        }
        allall = all;/* 
        console.log(allall) */
        setInputtable(allall);/* 
        console.log("Inputtable : "+inputtable); */
    }

    return (
        <div className="contentbi">
            <div className="top">
                <div className='left_content'>
                    <h1>Bisection</h1>
                    <div className='content_in'>
                        <span className='nfx'>สมการ : </span>
                        <EditableMathField
                            id='f'
                            style={{ width: 200,backgroundColor: "white",height: "70px", paddingTop:"12px" }}
                            latex={latex}
                            onChange={(mathField) => {
                                setLatex(mathField.latex());
                            }}
                        />
                    </div>
                    <div className='content_in'>
                        XL =
                        <input type="number" id='xl' className='inputfield' value={xl} onInput={(e)=>{
                            setXl(parseFloat(e.target.value))
                        }} />
                    </div>
                    <div className='content_in'>
                    XR = 
                    <input type="number" id='xr' className='inputfield' value={xr} onInput={(e)=>{
                        setXr(parseFloat(e.target.value))
                    }} />
                    </div>
                    <div className='content_in' onClick={example} style={{background:"orange", width:"400px",marginLeft: "15%",height:"40px"}}>
                        Example
                    </div>
                    <div className='content_in' onClick={bisection} style={{background:"green", width:"400px",marginLeft: "15%",height:"40px"}}>
                        Calculate
                    </div>
                </div> 
                <div className='right_content'>
                    <div className="bg_graph">
                        <Graph latex={latex}/>
                    </div>
                </div>
            </div>
            <div className="down">
                <div className="downtable">
                    <TableIteration columns={column} rows={inputtable}/>
                </div>
                <div style={{color:"white",display:"flex",justifyContent: "center",paddingTop:"20px"}}>ค่าที่ได้เป็นทศนิยม 6 ตำแหน่ง</div>
            </div>
        </div>
    )
}
