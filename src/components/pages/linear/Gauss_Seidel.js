import React, { useState } from 'react'
import TableIteration from '../../contents/TableIteration';
import axios from 'axios';

const math = require("mathjs");

export default function Gauss_Seidel() {

    const [xl, setXl] = useState(3)
    const [inputtable, setInputtable] = useState([])

    var column = [
        {
            headerName: 'X',
            field: 'id',
            width: 200
        },{
            headerName: 'Value',
            field: 'value',
            width: 200
        }
    ];
        
    let exmatrix,exb,exx;

    const example = async () => {
        await axios.get('http://localhost:5000/api/exs/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/GaussSeidel')
        .then(res => {
            exmatrix = res.data.matrix
            exb = res.data.matrixB
            exx = res.data.matrixX
        })
        .catch(error => {
            alert("API is turned off.")
        })
        setXl(3)
        for(let i=0;i<exb.length;i++){
            for(let j=0;j<exb.length;j++){
                document.getElementById(String(i)+String(j)).value = exmatrix[i][j];
            }
            document.getElementById(String(i)).value = exb[i];
            document.getElementById("x"+String(i)).value = exx[i];
        }
    }

    const click = () => {
        let matrix = [];
        let Bin = [];
        let X = [];
        let Xinput = [];
        let checkempty = false;
        for(let i=0;i<xl;i++){
            let tmp = [];
            for(let j=0;j<xl;j++){
                tmp[j] = parseFloat(document.getElementById(String(i)+String(j)).value);
                if(isNaN(tmp[j])){
                    checkempty=true;
                }
            }
            matrix.push(tmp);
            Bin[i] = parseFloat(document.getElementById(String(i)).value);
            if(isNaN(Bin[i])){
                checkempty=true;
            }
            Xinput[i] = parseFloat(document.getElementById("x"+String(i)).value);
            if(isNaN(Xinput[i])){
                checkempty=true;
            }

        }
        if(checkempty === false){
            var A = math.matrix(matrix);
            var B = math.matrix(Bin);
            var xold = Xinput;
            var iteration = 2
            while(true){
                var xnow = [];
            
                for(let i = 0 ; i < B._size[0] ; i++){
                    var x = B._data[i];
                    for(let j = 0; j < A._size[0] ; j++){
                        if(i !== j && isNaN(xnow[j])){
                            x -= (A._data[i][j]*xold[j]); 
                        }
                        else if(i !== j && !(isNaN(xnow[j]))){
                            x -= (A._data[i][j]*xnow[j]);
                        }
                    }
                    x /= A._data[i][i];
                    xnow.push(x);
                }
                
            
                let i = 0;
                var check = true;
                while(i<xnow.length){
                    check = check && (Math.abs((xnow[i]-xold[i])/xnow[i])<0.000001);
                    i++;
                }
                if(check === true){
                    break;
                }
                xold = xnow;
                iteration++;
                if(iteration === 20){
                    break;
                }
    
            }

            
            for(let row=0;row<xl;row++){
                X.push({
                        
                    id : "X"+(row+1),
                    value : parseFloat(xold[row].toFixed(6))
                        
                });
            }
         
            setInputtable(X);
        }else{
            alert("?????????????????????????????????????????????????????????");
        }

    }

    const show = (num) => {
        if(num>=2 && num<=6){
            let matrixInput = [];
            let Binput =[];
            let Xinput = [];
            for(let i=0;i<num;i++){
                let row = []
                for(let j=0;j<num;j++){
                    row.push(<input type="text" id={String(i)+String(j)} className="inputmatrix" style={{width:"50px"}}></input>)
                }
                row.push(<br/>)
                matrixInput.push(row);
            }
            for(let i=0;i<num;i++){
                Binput.push(<input type="text" id={String(i)} className="Binput" style={{width:"50px"}} ></input>)
                Binput.push(<br/>)
                Xinput.push(<span>{"X"+(i+1)} : </span>)
                Xinput.push(<input type="text" id={"x"+String(i)} className="Binput" style={{width:"50px", marginRight:"5px"}} ></input>)
            }
            return (
                        <div>
                        <div className="matrix" style={{display:"flex", justifyContent:"center",marginTop:"20px"}}> 
                            A = <div className="Input" style={{marginRight:"20px"}}>{matrixInput}</div> 
                            B = <div className="InputB">{Binput}</div>
                        </div>
                        <div className="xinput" style={{marginTop:"20px"}}>
                            {Xinput}
                        </div>
                        </div>
                    )
        }
    }

    return (
        <div className="contentbi">
            <div className="top">
                <div className='left_content'>
                    <h1>Gauss-Seidel</h1>
                    <div className='content_in'>
                        ????????????????????? matrix (2-6) : 
                        <input type="number" name="numofmatrix" onChange={(e)=>{
                            setXl(e.target.value)
                        }} value={xl}/>
                    </div>
                    {show(xl)}
                    <div className='content_in' onClick={example} style={{background:"orange", width:"400px",marginLeft: "15%",height:"40px"}}>
                        Example
                    </div>
                    <div className='content_in' onClick={click} style={{background:"green", width:"400px",marginLeft: "15%",height:"40px"}}>
                        Calculate
                    </div>
                </div> 
                <div className="down_rigth">
                    <div className="downtable">
                        <TableIteration columns={column} rows={inputtable} widthh="400px" heightt="400px" pages={parseInt(xl)}/>
                    </div>
                <div style={{color:"white",display:"flex",justifyContent: "center",paddingTop:"20px"}}>????????????????????????????????????????????????????????? 6 ????????????????????? (?????????????????????????????? 20 ?????????)</div>
            </div>
            </div>
        </div>
    )
}
