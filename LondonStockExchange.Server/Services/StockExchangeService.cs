using LondonStockExchange.Server.Models;
using System.Text.Json;

namespace LondonStockExchange.Server.Services
{
    public interface IStockExchangeService
    {
        List<StockExchangeResponseModel> GetStocksData();
    }
    public class StockExchangeService : IStockExchangeService
    {
        private readonly IWebHostEnvironment _env;
        public StockExchangeService(IWebHostEnvironment env)
        {
            _env = env;
        }
        public List<StockExchangeResponseModel> GetStocksData()
        {
            var responseData = ReadJsonData();
            return responseData.ToList();
        }

        private List<StockExchangeResponseModel>  ReadJsonData()
        {
            string folderPath = Path.Combine(_env.ContentRootPath, "StockData");
            string filePath = Path.Combine(folderPath, "stockdata.json");


            string jsonString = File.ReadAllText(filePath);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true // Optional: Makes property matching case-insensitive
            };
            var stockExchangeData = JsonSerializer.Deserialize<List<StockExchangeResponseModel>>(jsonString, options);
            return stockExchangeData;
        }
    }
}
