﻿using Kundeservice.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kundeservice.DAL
{
    public class ServiceRepository : IServiceRepository
    {

        private readonly ServiceContext _db;


        public ServiceRepository(ServiceContext db)
        {
            _db = db;
        }
        public async Task<bool> Endre(Faq innFaq)
        {
            try
            {
                Faqs endreObjekt = await _db.Faqs.FindAsync(innFaq.Id);
               
                endreObjekt.Sporsmaal = innFaq.Sporsmaal;
                endreObjekt.Svar = innFaq.Svar;
                endreObjekt.Tema = innFaq.Tema;
                endreObjekt.Rating = innFaq.Rating;
                await _db.SaveChangesAsync();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<List<Faqs>> HentAlle()
        {
            try
            {
                List<Faqs> alleSporsmaal = await _db.Faqs.Select(faq => new Faqs
                {
                    Id = faq.Id,
                    Sporsmaal = faq.Sporsmaal,
                    Svar = faq.Svar,
                    Tema = faq.Tema,
                    Rating = faq.Rating

                }).ToListAsync();
                return alleSporsmaal;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Faq> HentEn(int id)
        {
            Faqs hentetObjekt = await _db.Faqs.FindAsync(id);
            Faq hentetFaq = new Faq
            {
                Id = hentetObjekt.Id,
                Sporsmaal = hentetObjekt.Sporsmaal,
                Svar = hentetObjekt.Svar,
                Tema = hentetObjekt.Tema,
                Rating = hentetObjekt.Rating
            };
            return hentetFaq;
        }

        public async Task<bool> Lagre(Faq innFaq)
        {
            try
            {
                var nyFaqRad = new Faqs
                {
                    Id = innFaq.Id,
                    Sporsmaal = innFaq.Sporsmaal,
                    Svar = innFaq.Svar,
                    Tema = innFaq.Tema,
                    Rating = innFaq.Rating
                };

                _db.Faqs.Add(nyFaqRad);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Slett(int id)
        {
            try
            {
                Faqs enDBFaqs = await _db.Faqs.FindAsync(id);
                _db.Faqs.Remove(enDBFaqs);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}