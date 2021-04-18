import React, { useState } from 'react'
import TableIteration from '../../contents/TableIteration';
import axios from 'axios';

const gauss = require("gaussian-elimination");

export default function Guass_Elimination() {

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
        
    let exmatrix,exb;

    const example = async () => {
        await axios.get('http://localhost:5000/api/exs/GuassElimination')
        .then(res => {
            exmatrix = res.data.matrix
            exb = res.data.matrixB
        })
        .catch(error => {
            alert("API is turned off.")
        })
        if(xl === 3){
            for(let i=0;i<xl;i++){
                let tmp = [];
                for(let j=0;j<xl;j++){
                    document.getElementById(String(i)+String(j)).value = exmatrix[i][j];
                }
                document.getElementById(String(i)).value = exb[i];
            }
        }else{
            alert("ต้องระบุขนาด matrix เท่ากับ 3");
        }
    }

    const click = () => {
        let matrix = [];
        /* let Bin = []; */
        let X = [];
        let index = [];
        let checkempty = false;
        for(let i=0;i<xl;i++){
            let tmp = [];
            for(let j=0;j<xl;j++){
                tmp[j] = parseFloat(document.getElementById(String(i)+String(j)).value);
                if(isNaN(tmp[j])){
                    checkempty=true;
                }
            }
            tmp[xl] = parseFloat(document.getElementById(String(i)).value);
            if(isNaN(tmp[xl])){
                checkempty=true;
            }
            matrix.push(tmp);
            index.push(i);
        }
        if(checkempty === false){
            let res = gauss(matrix)
            for(let row=0;row<xl;row++){
                X.push({
                        
                    id : "X"+(row+1),
                    value : parseFloat(res[row].toFixed(6))
                        
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
        }
        return (
                    <div className="matrix" style={{display:"flex", justifyContent:"center",marginTop:"20px"}}> 
                        A = <div className="Input" style={{marginRight:"20px"}}>{matrixInput}</div> 
                        B = <div className="InputB">{Binput}</div>
                    </div>
                )
    }

    return (
        <div className="contentbi">
            <div className="top">
                <div className='left_content'>
                    <h1>Gauss Elimination</h1>
                    <div className='content_in'>
                        ขนาดของ matrix (2-6) : 
                        <select name="numofmatrix" onChange={(e)=>{
                            setXl(e.target.value)
                        }}>
                            <option value="2">2</option>
                            <option value="3" selected>3</option>
                            <option value="4">4</option>
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
                <div style={{color:"white",display:"flex",justifyContent: "center",paddingTop:"20px"}}>ค่าที่ได้เป็นทศนิยม 6 ตำแหน่ง</div>
            </div>
            </div>
        </div>
    )
}
