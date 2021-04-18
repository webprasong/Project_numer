import React, { useState } from 'react'
import Graph from '../../contents/Graph';
import { functionx } from '../../functionx';
import { addStyles, EditableMathField } from "react-mathquill";
import TableIteration from '../../contents/TableIteration';
import axios from 'axios';
addStyles()

export default function False_Position() {

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
            headerName: 'X1',
            field: 'x1',
            width: 200
        },
        {
            headerName: 'XR',
            field: 'xr',
            width: 200
        },
        {
            headerName: 'f(X1)',
            field: 'fx1',
            width: 200
        },
        {
            headerName: 'Error',
            field: 'e',
            width: 200
        }
    ];

    const example = async () => {
        await axios.get('http://localhost:5000/api/exs/FalsePosition')
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

    let allall = [];

    const false_position = () => {
        let all=[];
        let i = 0;
        let xll = xl;
        let xrr = xr;
        let old = null;
        let e = 10;

        while(e>0.000001){

            var fxl = findfx(xll);
            var fxr = findfx(xrr);
            var x1 = (((xll*fxr)-(xrr*fxl))/(fxr-fxl));
            var fx1 = findfx(x1);
            var xlold = xll;
            var xrold = xrr;
            
            if(fx1*fxr < 0){
                xll = x1;
            }
            else{
                xrr = x1;
            }
        
            if(old !== null){
                e = Math.abs((x1-old)/x1)
            }

            let xloldp = parseFloat(xlold.toFixed(6));
            let x1p = parseFloat(x1.toFixed(6));
            let xrrp = parseFloat(xrold.toFixed(6));
            let ep = parseFloat(e.toFixed(6));
            let fx1p = parseFloat(fx1.toFixed(6));
            all[i] = {id:i+1,xl:xloldp,x1:x1p,xr:xrrp,fx1:fx1p,e:ep};

            old = x1;
            i++;
        
        }
        allall = all;
        setInputtable(allall);

    }

    return (
        <div className="contentbi">
            <div className="top">
                <div className='left_content'>
                    <h1>False-Position</h1>
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
                    <div className='content_in' onClick={false_position} style={{background:"green", width:"400px",marginLeft: "15%",height:"40px"}}>
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