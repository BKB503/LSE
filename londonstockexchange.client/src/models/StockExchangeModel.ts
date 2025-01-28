import { StockModel } from "./StockModel"

export interface StockExchangeModel {
    code: string
    stockExchange: string
    topStocks: StockModel[]
}