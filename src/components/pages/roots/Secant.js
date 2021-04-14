import React, { useState } from 'react'
import Graph from '../../contents/Graph';
import { functionx } from '../../functionx';
import { addStyles, EditableMathField } from "react-mathquill";
import TableIteration from '../../contents/TableIteration';

addStyles()

export default function Newton_Raphson() {

    const [latex, setLatex] = useState("")
    const [xold, setXold] = useState(0)
    const [xnew, setXnew] = useState(0)
    const [inputtable, setInputtable] = useState([])

    var column = [
        {
            headerName: 'Iteration',
            field: 'id',
            width: 200
        },
        {
            headerName: 'X Old',
            field: 'xold',
            width: 200
        },
        {
            headerName: 'X New',
            field: 'xnew',
            width: 200
        },
        {
            headerName: 'f(Xnew)',
            field: 'fxnew',
            width: 200
        },
        {
            headerName: 'Error',
            field: 'e',
            width: 200
        }
    ];

    const example = () => {
        setLatex("x^2-7")
        setXold(2)
        setXnew(2.75)
    }

    const findfx = (x) => {
        if(latex != ""){
            var a = functionx(latex,x)
        }
        return a;
    }

    let allall = [];

    const secant = () => {
        let all=[];
        let i = 0;
        let xoldd = xold;
        let xneww = xnew;
        let e = 10;

        while(e>0.000001){
            var xnew2 = xneww-((findfx(xneww)*(xoldd-xneww))/(findfx(xoldd)-findfx(xneww)));
            e = Math.abs((xnew2-xneww)/xnew2);
            
            let xoldp = parseFloat(xoldd.toFixed(6));
            let xnewp = parseFloat(xneww.toFixed(6));
            let fxnewp = parseFloat(findfx(xnew2).toFixed(6));
            let ep = parseFloat(e.toFixed(6));
            all[i] = {id:i+1,xold:xoldp,xnew:xnewp,fxnew:fxnewp,e:ep};
            
            xoldd = xneww;
            xneww = xnew2;

            i++;
            if(i==10){
                break;
            }
            
        }

        allall = all;
        setInputtable(allall);

    }

    return (
        <div className="contentbi">
            <div className="top">
                <div className='left_content'>
                    <h1>Secant</h1>
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
                        Xold =
                        <input type="number" id='xl' className='inputfield' value={xold} onInput={(e)=>{
                            setXold(parseFloat(e.target.value))
                        }} />
                    </div>
                    <div className='content_in'>
                        Xnew = 
                    <input type="number" id='xr' className='inputfield' value={xnew} onInput={(e)=>{
                        setXnew(parseFloat(e.target.value))
                    }} />
                    </div>
                    <div className='content_in' onClick={example} style={{background:"orange", width:"400px",marginLeft: "15%",height:"40px"}}>
                        Example
                    </div>
                    <div className='content_in' onClick={secant} style={{background:"green", width:"400px",marginLeft: "15%",height:"40px"}}>
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