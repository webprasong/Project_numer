const math = require("mathjs")
const AlgebraLatex = require("algebra-latex")
const functionx = (fx, input,num)=>{
    const latex_changed = new AlgebraLatex().parseLatex(fx)
    let fx_new = latex_changed.toMath();
    let find = {
        x : input
    }
    let a = math.evaluate(fx_new,find)
    return a;
};
export { functionx };