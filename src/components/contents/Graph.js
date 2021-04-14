import React, { useEffect } from 'react';
import Desmos from 'desmos';

/* const AlgebraLatex = require("algebra-latex") */

const Graph = (props) => {

    useEffect(() => {
        /* const latex_changed = new AlgebraLatex().parseLatex(props.latex)
        let latexx = latex_changed.toMath(); */

        var elt = document.getElementById('graph');
        var calculator = Desmos.GraphingCalculator(elt,{
            expressions : false,
            zoomButtons : false,
            settingsMenu : false,
            zoomButtons : true
        });
        calculator.setMathBounds({
            left: 10,
            right: 10,
            bottom: 10,
            top: 10
        });
        calculator.setExpression({ id: 'graph1', latex: props.latex });
        return () => {
            calculator.destroy();
        }
    }, [props.latex])
    return (<div id="graph" style={{width: "600px", height: "400px"}}></div>);

}

export default Graph;