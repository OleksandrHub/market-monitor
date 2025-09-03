export interface Instrument {
    id: string;
    symbol: string;
    description: string;
    kind: string;
    provider: string;
    name: string;
}

export interface InstrumentsResponse {
    paging: {
        page: number;
        pages: number;
        items: number;
    };
    data: Instrument[];
}

export interface LivePrice {
    instrumentId: string;
    bid?: number;
    ask?: number;
    last?: number;
}

export interface SelectInstrument {
    id: string;
    symbol: string
}