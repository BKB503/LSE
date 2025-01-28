using LondonStockExchange.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LondonStockExchange.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StocksController : ControllerBase
    {
        private readonly IStockExchangeService _stockExchangeService;
        public StocksController(IStockExchangeService stockExchangeService)
        {
            _stockExchangeService = stockExchangeService;
        }

        [HttpGet()]
        public IActionResult GetStocksData()
        {  
            return Ok(_stockExchangeService.GetStocksData());
        }
    }
}
