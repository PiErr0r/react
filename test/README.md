## Web Assembly

to COMPILE run:
`emcc 145.c -Os -s WASM=1 -s SIDE_MODULE=1 -o test.wasm`
https://github.com/emscripten-core/emscripten/wiki/WebAssembly-Standalone
https://gist.github.com/kripken/59c67556dc03bb6d57052fedef1e61ab#file-hello_world-html-L24

to activate `emcc` cmd on your machine go and see your .bashrc file and search for emsdk
or go to folder emsdk in /home/${user}/bin and run `source /home/piero/bin/emsdk/emsdk_env.sh` 