declare module 'snarkjs' {
    export const groth16: {
        fullProve: (
            inputs: any,
            wasmPath: string,
            zkeyPath: string
        ) => Promise<{ proof: any; publicSignals: any }>;
        verify: (vkey: any, publicSignals: any, proof: any) => Promise<boolean>;
    };
}
