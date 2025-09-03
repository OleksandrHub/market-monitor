export interface BarData {
    t: string;
    o: number;
    h: number;
    l: number;
    c: number;
    v?: number;
}

export interface ChartBarData {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}