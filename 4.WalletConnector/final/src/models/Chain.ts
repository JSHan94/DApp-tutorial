export type ChainId =  'eth' | 'avax' | 'sol' | "axl"  | "juno" | "kava" | string;
export type keplrChainId = "axelar-dojo-1" | "juno-1" | "kava_2222-10";

export type Chain = {
    id: ChainId,
    name: string,
    icon: string
}

export interface KeplrChain extends Chain {
    keplrChainId: keplrChainId
}
