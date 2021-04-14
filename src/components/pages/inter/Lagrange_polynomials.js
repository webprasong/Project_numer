import React, { useState } from 'react'

export default function Newtons_divided() {

    const [xl, setXl] = useState(2)
    const [inputtable, setInputtable] = useState(0)
    const [showPoly, setShowPoly] = useState(false)
    const [xfind, setXfind] = useState()
        
    let x = [0,20000,40000,60000,80000]
    let y = [9.81,9.7487,9.6879,9.6879,9.5682]
    let xfindd = 42000;

    const example = () => {
        if(xl == 2){
            document.getElementById(String(0)).value = x[0];
            document.getElementById("y"+String(0)).value = y[0];
            document.getElementById(String(1)).value = x[4];
            document.getElementById("y"+String(1)).value = y[4];
            document.getElementById("xfind").value = xfindd;
            setXfind(xfindd);
        }else if(xl == 3){
            document.getElementById(String(0)).value = x[0];
            document.getElementById("y"+String(0)).value = y[0];
            document.getElementById(String(1)).value = x[2];
            document.getElementById("y"+String(1)).value = y[2];
            document.getElementById(String(2)).value = x[4];
            document.getElementById("y"+String(2)).value = y[4];
            document.getElementById("xfind").value = xfindd;
            setXfind(xfindd);
        }else if(xl == 5){
            for(let i = 0;i<xl;i++){
                document.getElementById(String(i)).value = x[i];
                document.getElementById("y"+String(i)).value = y[i];
            }
            document.getElementById("xfind").value = xfindd;
            setXfind(xfindd);
        }
        else{
            alert("ต้องระบุ จำนวนจุด = 5");
        }
    }

    const click = () => {
        let Yinput = [];
        let Xinput = [];
        let X = [];
        let checkempty = false;
        for(let i=0;i<xl;i++){
            Xinput[i] = parseFloat(document.getElementById(String(i)).value);
            if(isNaN(Xinput[i])){
                checkempty=true;
                console.log("Xinput");
            }
            Yinput[i] = parseFloat(document.getElementById("y"+String(i)).value);
            if(isNaN(Yinput[i])){
                checkempty=true;
                console.log("Yinput");
            }
        }
        setXfind(parseFloat(document.getElementById("xfind").value));
        if(isNaN(xfind)){
            checkempty=true;
            console.log("xfind");
        }
        if(checkempty == false){
            
            var x = Xinput;
            var fx = Yinput;

            var result = (xfind) => {
                var sum = 0;
                for(let i=0;i<x.length;i++){
                    var temp = fx[i];
                    var con = 1;
                    for(let j=0;j<x.length;j++){
                        if(i != j){
                            let tempxi = (x[j]-xfind)/(x[j]-x[i]);
                            con *= tempxi;
                        }
                    }
                    console.log("L"+i+":"+con);
                    temp *= con;
                    console.log(temp);
                    sum += temp;
                }
                return sum;
            }

            let res = result(xfind).toFixed(6);
         
            setInputtable(res);
        }else{
            alert("ใส่ข้อมูลไม่ครบถ้วน");
        }

    }

    const show = (num) => {
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
                    <h1>Lagrange Polynomials</h1>
                    <div className='content_in'>
                        type : 
                        <select name="numofmatrix" onChange={(e)=>{
                            setXl(e.target.value)
                            let a = e.target.value;
                            if(parseInt(a)===4){
                                setShowPoly(true)
                            }else{
                                setShowPoly(false)
                            }
                            console.log(a)
                        }}>
                            <option value="2" selected>Linear Interpolation</option>
                            <option value="3">Quadratic Interpolation</option>
                            <option value="4">Polynomial interpolation</option>
                        </select>
                    </div>
                    {showPoly && <div><span>จำนวนจุด : </span><select name="nummatrix" style={{marginTop:"20px"}} onChange={(e)=>{
                            setXl(e.target.value)
                        }}>
                            <option value="4" selected>4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select></div>}
                    {show(xl)}
                    <div className='content_in' onClick={example} style={{background:"orange", width:"400px",marginLeft: "15%",height:"40px"}}>
                        Example
                    </div>
                    <div className='content_in' onClick={click} style={{background:"green", width:"400px",marginLeft: "15%",height:"40px"}}>
                        Calculate
                    </div>
                    <br/>
                    <div>f({isNaN(xfind) ? "":xfind}) : {inputtable}</div>
                </div> 
            </div>
        </div>
    )
}
