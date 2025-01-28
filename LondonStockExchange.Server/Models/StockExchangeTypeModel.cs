namespace LondonStockExchange.Server.Models
{   
    public class StockDetailsResponseModel
    {
        public string Code { get; set; }
        public string StockName { get; set; }
        public decimal Price { get; set; }
    }

    public class StockExchangeResponseModel
    {
        public string Code { get; set; }
        public string StockExchange { get; set; }
        public List<StockDetailsResponseModel> TopStocks { get; set; }
    }

}
