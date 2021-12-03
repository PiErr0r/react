import React, { Fragment, useState, useEffect } from 'react';

const WasmTest = (props) => {

	const [fnc, setFnc] = useState(null);
	const [test, setTest] = useState(null);
	const [exes, setExes] = useState(null);

	const all_odd = (n) => {
		while(n) {
			if (!(n&1)) {
				return 0;
			}
			n = parseInt(n / 10, 10);
		}
		return 1;
	}

	const is_rev = (n) => {
		const a = n;
		let b = 0;
		while(n) {
			b = 10 * b + n % 10;
			n = parseInt(n / 10, 10);
		}
		return(all_odd(a + b));
	}

	const testJs = () => {
		let cnt = 0, t = 10;
		//const maxi = 100000000;
		const maxi = 1000000;
		for (let i = 10; i < maxi; ++i) {
			if (i == t * 10) {
				t *= 10;
			}
			if ((parseInt(i / t, 10) & 1) != (i & 1) && i % 10 && is_rev(i)) {
				++cnt;
			}
		}
		return cnt;
	}

	useEffect(() => {

    function loadWebAssembly(filename, imports) {
      // Fetch the file and compile it
      return fetch(filename)
        .then(response => response.arrayBuffer())
        .then(buffer => WebAssembly.compile(buffer))
        .then(module => {
          // Create the imports for the module, including the
          // standard dynamic library imports
          imports = imports || {};
          imports.env = imports.env || {};
          imports.env.memoryBase = imports.env.memoryBase || 0;
          imports.env.tableBase = imports.env.tableBase || 0;
          if (!imports.env.memory) {
            imports.env.memory = new WebAssembly.Memory({ initial: 256 });
          }
          if (!imports.env.table) {
            imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' });
          }
          // Create the instance.
          return new WebAssembly.Instance(module, imports);
        });
    }
		loadWebAssembly('test.wasm')
      .then(instance => {
        var exports = instance.exports; // the exports of that instance
        var test = exports.test; // the "doubler" function (note "_" prefix)
        console.log(exports)
        setTest({test:test});
      }
    );

		// loadWebAssembly('math.wasm')
  //     .then(instance => {
  //       var exports = instance.exports; // the exports of that instance
  //       var math = exports; // the "doubler" function (note "_" prefix)
  //       console.log(exports)
  //       setExes({x:math});
  //     }
  //   );
	}, []);
	console.log(exes)

	const tester = (f1, f2) => {
		let total1 = 0, i;
		const repeat = 200;

		console.log("START f1 --------------");
		console.time('f1');
		for (i = 0; i < repeat; ++i) {
			const start = new Date().getTime();
			f1();
			const end = new Date().getTime();
			total1 += end - start;
		}
		console.timeEnd('f1');
		//console.log("RESULT -------------", res);

		let total2 = 0

		console.log("START f2 --------------");
		console.time('f2');
		for (i = 0; i < repeat; ++i) {
			const start = new Date().getTime();
			f2();
			const end = new Date().getTime();
			total2 += end - start;
		}
		console.timeEnd('f2');
		//console.log("RESULT -------------", res);

		console.log("BENCH -----------------");
		console.table(total1, total2);
		console.table(total1 / 10, total2 / 10);
	}

	//return <button onClick={() => tester(test.test)}>WHAT</button>
	return <Fragment>
		<button onClick={() => tester(testJs, test.test)}>WHAT</button>
		<button onClick={() => tester(testJs, test.test)}>Test math</button>
	</Fragment>


}

export default WasmTest;