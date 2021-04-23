import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function TableIteration(props) {
  /* console.log(typeof(props.width))
  if(typeof(props.width) == undefined){
    console.log("123456")
    widthh = "1200px"
  }
  else{
    widthh = props.width;
  } */
  return (
    <div style={{ height: props.heightt, background:"white", width:props.widthh}}>
      <DataGrid rows={props.rows} columns={props.columns} pageSize={props.pages}/>
    </div>
  );
}

TableIteration.defaultProps = {
  widthh: "1200px",
  heightt: "650px",
  pages: 15
};