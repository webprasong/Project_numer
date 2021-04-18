import React, { useState } from 'react'
import TableIteration from '../../contents/TableIteration';
import axios from 'axios';

const math = require("mathjs");

export default function Conjugate_Gradient() {

    const [xl, setXl] = useState(4)
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
        await axios.get('http://localhost:5000/api/exs/ConjugateGradient')
        .then(res => {
            exmatrix = res.data.matrix
            exb = res.data.matrixB
            exx = res.data.matrixX
        })
        .catch(error => {
            alert("API is turned off.")
        })
        if(xl === 4){
            for(let i=0;i<xl;i++){
                let tmp = [];
                for(let j=0;j<xl;j++){
                    document.getElementById(String(i)+String(j)).value = exmatrix[i][j];
                }
                document.getElementById(String(i)).value = exb[i];
                document.getElementById("x"+String(i)).value = exx[i];
            }
        }else{
            alert("ต้องระบุขนาด matrix เท่ากับ 4");
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
            var xold = math.matrix(Xinput);

            var symmatric = true;

            for(let i=0;i<A._size[0];i++){
                for(let j=i+1;j<A._size[1];j++){
                    if(A._data[i][j]!==A._data[j][i]){
                        symmatric = false;
                        break;
                    }
                }
            }

            var positive_definite = true;

            for(let i=1 ;i<A._size[0]+1;i++){
                let range_matric = math.squeeze(math.range(0,i)._data);
                let matric_test = math.subset(A, math.index(range_matric,range_matric));
                if(math.det(matric_test)<0){
                    positive_definite = false;
                    break;
                }
            }

            var R = math.add(math.multiply(A,xold),math.multiply(B,-1));
            var D = math.multiply(R,-1);

            var k = 0;
            while(true){

                var Dtranspose = math.transpose(D);
                var toplambda = math.multiply(Dtranspose,R);
                var buttomlambda1 = math.multiply(D,A);
                var buttomlambda = math.multiply(buttomlambda1,Dtranspose);

                var lambda = math.multiply(math.divide(toplambda,buttomlambda),-1);
                
                var xnew = math.add(xold,math.multiply(lambda,D));

                R = math.add(math.multiply(A,xnew),math.multiply(B,-1));

                xold = xnew;

                var E = Math.sqrt(math.multiply(math.transpose(R),R));

                if(E < 0.001){
                    break;
                }
                

                var topalpha = math.multiply(math.transpose(R),buttomlambda1);

                var alpha = math.divide(topalpha,buttomlambda);

                var Dback = math.multiply(alpha,D);
                var Dfront = math.multiply(R,-1);
                D = math.add(Dfront,Dback);

                k++;
            }
            
            for(let row=0;row<xl;row++){
                X.push({
                        
                    id : "X"+(row+1),
                    value : parseFloat(xnew._data[row].toFixed(6))
                        
                });
            }
         
            setInputtable(X);
        }else{
            alert("ใส่ข้อมูลไม่ครบถ้วน");
        }

    }

    const show = (num) => {
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

    return (
        <div className="contentbi">
            <div className="top">
                <div className='left_content'>
                    <h1>Conjugate Gradient</h1>
                    <div className='content_in'>
                        ขนาดของ matrix (2-6) : 
                        <select name="numofmatrix" onChange={(e)=>{
                            setXl(e.target.value)
                        }}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4" selected>4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
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
                <div style={{color:"white",display:"flex",justifyContent: "center",paddingTop:"20px"}}>ค่าที่ได้เป็นทศนิยม 6 ตำแหน่ง (จำกัดการวน 20 รอบ)</div>
            </div>
            </div>
        </div>
    )
}
