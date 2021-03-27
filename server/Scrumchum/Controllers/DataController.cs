using Microsoft.AspNetCore.Mvc;
using Scrumchum.Services;

namespace Scrumchum.Controllers
{
    [ApiController]
    [Route( "api/v1/data" )]
    public class DataController : ControllerBase
    {
        private readonly IDataService _dataService;

        public DataController( IDataService dataService )
        {
            _dataService = dataService;
        }

        [HttpGet( "cardsets" )]
        public ActionResult GetCardsets( )
        {
            return Ok( _dataService.GetCardsets() );
        }
    }
}
