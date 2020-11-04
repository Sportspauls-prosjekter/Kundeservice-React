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
                _log.LogWarning($"{Ok(sporsmaalene)}");
                return NotFound("Ingen Spørsmål funnet");
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
                    return NotFound("Fant ikke spørsmålsobjektet");
                }
                _log.LogInformation($"{Ok(faqen)}");
                return Ok(faqen);
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest("Feil i inputvalidering");
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
                    return BadRequest("Spørsmålsobjektet kunne ikke lagres!");
                }
                return Ok(); 
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest("Spørsmålsobjektet kunne ikke lagres!");
        }

        [HttpPut]
        public async Task<ActionResult> Endre(Faq innFaq)
        {
            if (ModelState.IsValid)
            {
                bool returOK = await _db.Endre(innFaq);
                if (!returOK)
                {
                    _log.LogInformation("FAQ ble ikke funnet");
                    return NotFound("FAQ ble ikke funnet");
                }
                _log.LogInformation("Endringen av FAQ-objektet ble utført");
                return Ok("Endringen av FAQ-objektet ble utført");
            }
            _log.LogWarning("Feil i inputvalidering");
            return BadRequest("Feil i inputvalidering");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Slett(int id)
        {
            bool returOK = await _db.Slett(id);
            if (!returOK)
            {
                _log.LogWarning("Sletting av spørsmålet ble ikke utført");
                return NotFound("Sletting av spørsmålet ble ikke utført");
            }
            _log.LogInformation("Sletting av spørsmålet ble utført");
            return Ok("Sletting av spørsmålet ble utført");

        }

    }
}
