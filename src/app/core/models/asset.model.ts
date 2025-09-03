import { UTCTimestamp } from "lightweight-charts";

export interface BarData {
    time: UTCTimestamp;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface BarApiResponse {
    timestamp: string;
    open: number;
    high: number;
    low: number;
    close: number;
}