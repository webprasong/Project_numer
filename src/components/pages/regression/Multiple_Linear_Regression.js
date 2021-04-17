import React, { useState } from 'react';
import axios from 'axios';

var multiregress = require("multiregress")

export default function Multiple_Linear_Regression() {

    const [xl, setXl] = useState(2)
    const [numx, setNumx] = useState(2)
    const [inputtable, setInputtable] = useState(0)
    const [xfind, setXfind] = useState()
    const [ressult, setRessult] = useState(0)
        
    let x,y,xfindd;

    const example = async () => {
        await axios.get('http://localhost:5000/api/exs/MultipleLinearRegression')
        .then(res => {
            x = res.data.x
            y = res.data.y
            xfindd = res.data.xfindArray
        })
        .catch(error => {
            alert("API is turned off.")
        })
        if(xl == 7 && numx == 3){
            for(let i = 0;i<xl;i++){
                for(let j=0;j<numx;j++){
                    document.getElementById(String(j)+String(i)).value = x[i][j];
                    document.getElementById("x"+String(j)).value = xfindd[j]
                }
                document.getElementById("y"+String(i)).value = y[i];
            }

        }
        else{
            alert("ต้องระบุจำนวน x = 3 และ จำนวนจุด = 7");
        }
    }

    const click = () => {
        let inputt = [];
        let checkempty = false;
        for(let i=0;i<xl;i++){
            let temp = [];
            for(let j=0;j<numx;j++){
                temp[j] = parseFloat(document.getElementById(String(j)+String(i)).value);
                if(isNaN(temp[j])){
                    checkempty=true;
                }
            }
            temp[numx] = parseFloat(document.getElementById("y"+String(i)).value);
            if(isNaN(temp[numx])){
                checkempty=true;
            }
            inputt.push(temp);
        }
        let xfindall = [];
        for(let j=0;j<numx;j++){
            xfindall[j] = parseFloat(document.getElementById("x"+String(j)).value);
            if(isNaN(xfindall[j])){
                checkempty=true;
            }
        } 
        if(checkempty == false){
            const result2 = multiregress.regression(inputt);
            console.log(result2)
            let fun = "";
            for(let j=numx;j>=0;j--){
                if(j==0){
                    fun+=parseFloat(result2[j].toFixed(6));
                }else{
                    fun = fun+parseFloat(result2[j].toFixed(6))+"X^"+j
                }
                if(j!=0){
                    fun+="+"
                }
            }
            console.log(fun)
            setInputtable(fun)
            let sum = 0; 
            for(let i = 0;i<=numx;i++){
                if(i==0){
                    sum += result2[i];
                }else{
                    sum += result2[i]*xfindall[i-1]
                }
                console.log(sum)
            }
            setRessult(parseFloat(sum.toFixed(6)))
        }else{
            alert("ใส่ข้อมูลไม่ครบถ้วน");
        }

    }

    const show = () => {
        let matrixInput = [];
        let Yinput =[];
        let Xinput = [];
        for(let i=0;i<numx;i++){
            matrixInput.push([<div>X{i+1}</div>]);
        }
        Yinput.push(<div>Y</div>);
        for(let i=0;i<xl;i++){
            for(let j=0;j<numx;j++){
                matrixInput[j].push(<span>{i+1} : </span>)
                matrixInput[j].push(<input type="text" id={String(j)+String(i)} className="inputmatrix" style={{width:"100px"}}></input>)
                matrixInput[j].push(<br/>)
            }
            Yinput.push(<span>Y{i+1} : </span>)
            Yinput.push(<input type="text" id={"y"+String(i)} className="inputmatrix" style={{width:"100px"}}></input>)
            Yinput.push(<br/>)
        }
        let xall = []
        for(let i=0;i<numx;i++){
            xall.push(<div className="Input" style={{marginRight:"20px"}}>{matrixInput[i]}</div>);
            Xinput.push(<span>X{i+1} : </span>)
            Xinput.push(<input type="text" id={"x"+String(i)} className="inputmatrix" style={{width:"100px", marginRight:"10px"}}></input>)
        }
        return (
                    <div>
                    <div className="matrix" style={{display:"flex", justifyContent:"center",marginTop:"20px"}}> 
                        {xall}
                        <div className="InputB">{Yinput}</div>
                    </div>
                    <div className="xinput" style={{marginTop:"20px"}}>
                        <div>X ที่ต้องการหา :</div>{Xinput}
                    </div>
                    </div>
                )
    }

    return (
        <div className="contentbi" style={{marginLeft:"270px"}}>
            <div className="top">
                <div className='left_content' style={{height:String(420+(xl*29))+"px", width:"900px"}}>
                    <h1>Multiple Linear Regression</h1>
                    <div><span>จำนวน X : </span><select name="numX" style={{marginTop:"20px", marginRight:"10px"}} onChange={(e)=>{
                            setNumx(e.target.value)
                        }}>
                            <option value="2" selected>2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <span>จำนวนจุด : </span><select name="nummatrix" style={{marginTop:"20px"}} onChange={(e)=>{
                            setXl(e.target.value)
                        }}>
                            <option value="2" selected>2</option>
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
                    <div className='content_in' onClick={example} style={{background:"orange", width:"400px",marginLeft: "25%",height:"40px"}}>
                        Example
                    </div>
                    <div className='content_in' onClick={click} style={{background:"green", width:"400px",marginLeft: "25%",height:"40px"}}>
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
