using Castle.Core.Internal;
using Kundeservice.DAL;
using Kundeservice.Model;
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
            List<Faqs> sporsmaalene = await _db.HentAlle();
            if(sporsmaalene.IsNullOrEmpty())
            {
                _log.LogWarning("Ingen Spørsmål funnet");
                return NotFound();
            }
            _log.LogInformation($"{Ok(sporsmaalene)}");
            return Ok(sporsmaalene);
        }

       [HttpGet("{id}")]
        public async Task<ActionResult> HentEn(int id)
        {
            if (ModelState.IsValid)
            {
                Faq faqen = await _db.HentEn(id);
                if (faqen == null)
                {
                    _log.LogInformation("Fant ikke spørsmålsobjektet");
                    return NotFound();
                }
                _log.LogInformation($"{Ok(faqen)}");
                return Ok(faqen);
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest();
        }

        [HttpPost]
        public async Task<ActionResult> Lagre(Faq innFaq)
        {
            if (ModelState.IsValid)
            {
                bool returOK = await _db.Lagre(innFaq);
                if (!returOK)
                {
                    _log.LogInformation("Spørsmålsobjektet kunne ikke lagres!");
                    return BadRequest();
                }
                return Ok(); 
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult> Endre(Faq innFaq)
        {
            if (ModelState.IsValid)
            {
                bool returOK = await _db.Endre(innFaq);
                if (!returOK)
                {
                    _log.LogInformation("Endringen kunne ikke utføres");
                    return NotFound();
                }
                return Ok();
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest();
        }
    }
}
