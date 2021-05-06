const math = require("mathjs")
const AlgebraLatex = require("algebra-latex")
const functionx = (fx, input,num)=>{
    const latex_changed = new AlgebraLatex().parseLatex(fx)
    let fx_new = latex_changed.toMath();
    let b = fx_new.replaceAll("ln","log");
    let find = {
        x : input
    }
    let a = math.evaluate(b,find)
    return a;
};
export { functionx };