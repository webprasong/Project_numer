import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Cramer from './components/pages/linear/Cramer';
import Gauss_Elimination from './components/pages/linear/Gauss_Elimination';
import Gauss_Jordan from './components/pages/linear/Gauss_Jordan';
import LU_Decomposition from './components/pages/linear/LU_Decomposition';
import Jacobi_Iteration from './components/pages/linear/Jacobi_Iteration';
import Gauss_seidel from './components/pages/linear/Gauss_Seidel';
import Conjugate_Gradient from './components/pages/linear/Conjugate_Gradient';

import Bisection from './components/pages/roots/bisection';
import False_Position from './components/pages/roots/False-Position';
import One_Point from './components/pages/roots/One-point';
import Newton_Raphson from './components/pages/roots/Newton_Raphson';
import Secant from './components/pages/roots/Secant' ;

import Newtons_Divided from './components/pages/inter/Newtons_divided';
import Lagrange_Polynomials from './components/pages/inter/Lagrange_polynomials';
import Spline_interpolation from './components/pages/inter/Spline_interpolation';

import Linear_Regression from './components/pages/regression/Linear_Regression';
import Polynomial_Regression from './components/pages/regression/Polynomial_Regression';
import Multiple_Linear_Regression from './components/pages/regression/Multiple_Linear_Regression';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
      <Switch>
        <Route path='/bisection' exact component={Bisection} />
        <Route path='/false-position'  component={False_Position} />
        <Route path='/one-point_iteration'  component={One_Point} />
        <Route path='/newton-raphson'  component={Newton_Raphson} />
        <Route path='/secant'  component={Secant} />

        <Route path='/cramer'  component={Cramer} />
        <Route path='/gauss_elimination' component={Gauss_Elimination} />
        <Route path='/gauss_jordan' component={Gauss_Jordan} />
        <Route path='/lu_Decomposition' component={LU_Decomposition} />
        <Route path='/jacobi_Iteration' component={Jacobi_Iteration} />
        <Route path='/gauss_Seidel_Iteration' component={Gauss_seidel} />
        <Route path='/conjugate_Gradient' component={Conjugate_Gradient} />
        
        <Route path='/newtons_divided' component={Newtons_Divided} />
        <Route path='/lagrange' component={Lagrange_Polynomials} />
        <Route path='/spline' component={Spline_interpolation} />

        <Route path='/linear_regression' component={Linear_Regression} />
        <Route path='/polynomial_regression' component={Polynomial_Regression} />
        <Route path='/multiple_linear_regression' component={Multiple_Linear_Regression} />

      </Switch>
      </div>
    </Router>
  );
}

export default App;
