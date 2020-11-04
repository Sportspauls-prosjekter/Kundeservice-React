using Kundeservice.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kundeservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {

        private IServiceRepository _db;

        private ILogger<ServiceController> _log;

        public ServiceController(IServiceRepository db, ILogger<ServiceController> log)
        {
            _db = db;
            _log = log;
        }

        [HttpGet]
        public async Task<ActionResult> HentAlle()
        {
            List<Faqs> Sporsmaalene = await _db.HentAlle();
            _log.LogInformation($"{Ok(Sporsmaalene)}");
            return Ok(Sporsmaalene);
        }
    }
}
