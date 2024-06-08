// import "./style.css";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";

// console.log(javascriptLogo);

// document.querySelector("#app").innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector("#counter"));
import "mathlive";
import "mathlive/fonts.css";
import "mathlive/static.css";
import "./style.css";
import { ComputeEngine } from "@cortex-js/compute-engine";

document.querySelector("#app").innerHTML = `
<math-field id="formula" style="display: block; font-size: 1.8rem;">\\int_2^4\\left(x^2+2x+3\\right)dx</math-field>
<h>Latex</h>
<textarea rows="2" cols="60" class="output" id="latex" autocapitalize="off" autocomplete="off"
  autocorrect="off" spellcheck="false"></textarea>

<h2>JSON</h2>
<pre><code id="json"></code></pre>
<h2>Simplify</h2>
<div id="simplify"></div>
<h2>Answer</h2>

<pre><code id="ans"></code></pre>
`;

const mf = document.getElementById("formula");
const latex = document.getElementById("latex");

function writeExpression(latex) {
    const ce = new ComputeEngine();
    /**
     * @type {BoxedExpression}
     */
    const expr = ce.parse(latex);
    // console.log(expr);
    document.getElementById("json").textContent = JSON.stringify(
        ce.rawJson(expr),
        null,
        2
    );

    document.getElementById(
        "simplify"
    ).innerHTML = `<math-field id="formula" style="display: block; font-size: 1.8rem;" readonly>${
        expr.simplify().latex
    }</math-field>`;

    document.getElementById("ans").innerHTML = expr.evaluate().value;
}

// const ce = new ComputeEngine();
// const expr = ce.parse("4+4x+5");

// console.log("new", expr, expr.simplify().latex);

writeExpression(mf.value);

mf.addEventListener("input", ev => {
    latex.value = mf.value;
    writeExpression(mf.value);
});

latex.value = mf.value;

// Listen for changes in the "latex" text field,
// and reflect its value in the mathfield.

latex.addEventListener("input", ev =>
    mf.setValue(ev.target.value, { silenceNotifications: true })
);
