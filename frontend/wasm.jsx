export async function storeVariable(){
    const {variables}=await WebAssembly.instantiateStreaming(fetch("../wasm/variables.wat"));
    alert(variables.exports.createVariable());
}