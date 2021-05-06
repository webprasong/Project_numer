import React, { useState } from 'react';
import axios from 'axios';

const regression = require("regression");

export default function Polynomial_Regression() {

    const [xl, setXl] = useState(2)
    const [inputtable, setInputtable] = useState(0)
    const [xfind, setXfind] = useState()
    const [ressult, setRessult] = useState(0)
    const [orderr, setOrderr] = useState(2)
        
    let x,y,xfindd,ooder;

    const example = async() => {
        await axios.get('http://localhost:5000/api/exs/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/PolynomialRegression')
        .then(res => {
            x = res.data.x
            y = res.data.y
            xfindd = res.data.xfind
            ooder = res.data.order
        })
        .catch(error => {
            alert("API is turned off.")
        })
        setXl(9);
        for(let i = 0;i<x.length;i++){
            document.getElementById(String(i)).value = x[i];
            document.getElementById("y"+String(i)).value = y[i];
        }
        document.getElementById("xfind").value = xfindd;
        setXfind(xfindd);
        document.getElementById("orderr").value = ooder;
        setOrderr(ooder);
    }

    const click = () => {
        let inputt = [];
        let checkempty = false;
        for(let i=0;i<xl;i++){
            let temp = [];
            temp[0] = parseFloat(document.getElementById(String(i)).value);
            if(isNaN(temp[0])){
                checkempty=true;
                console.log("Xinput");
            }
            temp[1] = parseFloat(document.getElementById("y"+String(i)).value);
            if(isNaN(temp[1])){
                checkempty=true;
                console.log("Yinput");
            }
            inputt.push(temp);
        }
        setXfind(parseFloat(document.getElementById("xfind").value));
        if(isNaN(xfind)){
            checkempty=true;
        }
        let or = parseFloat(document.getElementById("orderr").value);
        setOrderr(or);
        if(isNaN(orderr)){
            checkempty=true;
        }
        if(checkempty === false){
            const result2 = regression.polynomial(inputt, { order:or });
            setInputtable(result2.string);
            console.log(result2.string);
            console.log("inputt : "+inputt);
            let sum = 0; 
            let poww = orderr;
            for(let i = 0;i<=orderr;i++){
                if(i===orderr){
                    sum += result2.equation[i]
                }else{
                    sum += result2.equation[i]*(Math.pow(xfind,poww))
                }
                poww--;
            }
            setRessult(parseFloat(sum.toFixed(6)))
        }else{
            alert("ใส่ข้อมูลไม่ครบถ้วน");
        }

    }

    const show = () => {
        let matrixInput = [];
        let Yinput =[];
        matrixInput.push(<div>X</div>);
        Yinput.push(<div>Y</div>);
        for(let i=0;i<xl;i++){
            matrixInput.push(<span>X{i+1} : </span>)
            matrixInput.push(<input type="text" id={String(i)} className="inputmatrix" style={{width:"100px"}}></input>)
            matrixInput.push(<br/>)
            Yinput.push(<span>Y{i+1} : </span>)
            Yinput.push(<input type="text" id={"y"+String(i)} className="inputmatrix" style={{width:"100px"}}></input>)
            Yinput.push(<br/>)
        }
        return (
                    <div>
                    <div className="matrix" style={{display:"flex", justifyContent:"center",marginTop:"20px"}}> 
                        <div className="Input" style={{marginRight:"20px"}}>{matrixInput}</div> 
                        <div className="InputB">{Yinput}</div>
                    </div>
                    <div className="xinput" style={{marginTop:"20px"}}>
                        <span>X ที่ต้องการหา : </span><input type="text" id="xfind" className="inputmatrix" style={{width:"100px"}} onChange={(e)=>{
                            setXfind(e.target.value)
                        }}></input>
                    </div>
                    <div className="xinput" style={{marginTop:"20px"}}>
                        <span>Order : </span><input type="text" id="orderr" className="inputmatrix" style={{width:"100px"}} onChange={(e)=>{
                            setOrderr(e.target.value)
                        }}></input>
                    </div>
                    </div>
                )
    }

    return (
        <div className="contentbi" style={{marginLeft:"400px"}}>
            <div className="top">
                <div className='left_content' style={{height:String(430+(xl*29))+"px"}}>
                    <h1>Polynomial Regression</h1>
                    <div><span>จำนวนจุด : </span>
                        <input type="number" name="nummatrix" onChange={(e)=>{
                            setXl(e.target.value)
                        }} value={xl}/>
                        </div>
                    {show()}
                    <div className='content_in' onClick={example} style={{background:"orange", width:"400px",marginLeft: "15%",height:"40px"}}>
                        Example
                    </div>
                    <div className='content_in' onClick={click} style={{background:"green", width:"400px",marginLeft: "15%",height:"40px"}}>
                        Calculate
                    </div>
                    <br/>
                    <div>f(x) : {inputtable}</div>
                    <div>f({isNaN(xfind) ? "":xfind}) : {ressult}</div>
                </div> 
            </div>
        </div>
    )
}
