import React, { useState } from 'react';
import axios from 'axios';

const regression = require("regression");

export default function Linear_Regression() {

    const [xl, setXl] = useState(2)
    const [inputtable, setInputtable] = useState(0)
    const [xfind, setXfind] = useState()
    const [ressult, setRessult] = useState(0)
        
    let x,y,xfindd;

    const example = async () => {
        await axios.get('http://localhost:5000/api/exs/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/LinearRegression')
        .then(res => {
            x = res.data.x
            y = res.data.y
            xfindd = res.data.xfind
        })
        .catch(error => {
            alert("API is turned off.")
        })
        if(parseInt(xl) === 9){
            for(let i = 0;i<xl;i++){
                document.getElementById(String(i)).value = x[i];
                document.getElementById("y"+String(i)).value = y[i];
            }
            document.getElementById("xfind").value = xfindd;
            setXfind(xfindd);
        }
        else{
            alert("ต้องระบุ จำนวนจุด = 9 ");
        }
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
            console.log("xfind");
        }
        if(checkempty === false){
            const result2 = regression.linear(inputt);
            console.log(result2)
            setInputtable(result2.string);
            let sum = 0; 
            for(let i = 0;i<2;i++){
                if(i===0){
                    sum += result2.equation[i]*xfind
                }else{
                    sum += result2.equation[i]
                }
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
                    </div>
                )
    }

    return (
        <div className="contentbi" style={{marginLeft:"400px"}}>
            <div className="top">
                <div className='left_content' style={{height:String(400+(xl*29))+"px"}}>
                    <h1>Linear Regression</h1>
                    <div><span>จำนวนจุด : </span><select name="nummatrix" style={{marginTop:"20px"}} onChange={(e)=>{
                            setXl(e.target.value)
                        }}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select></div>
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
