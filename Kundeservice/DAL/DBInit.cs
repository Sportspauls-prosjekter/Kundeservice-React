using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kundeservice.DAL
{
    public static class DBInit
    {
        public static void Seed(IApplicationBuilder app)
        {
            var serviceScope = app.ApplicationServices.CreateScope();

            var db = serviceScope.ServiceProvider.GetService<ServiceContext>();

            // må slette og opprette databasen hver gang når den skal initieres (seed`es)
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();

            var faq1 = new Faqs
            {
                Id = 1,
                Sporsmaal = "Kan jeg bestille tur/retur-reise på en rute?",
                Svar = "Nei",
                Kategori = "Reise",
                Rating = 1
            };
            var faq2 = new Faqs
            {
                Id = 2,
                Sporsmaal = "Kan jeg bestille reise på telefonen?",
                Svar = "Nei",
                Kategori = "Reise",
                Rating = 3
            };
            var faq3 = new Faqs
            {
                Id = 3,
                Sporsmaal = "Kan jeg se mine ordre på nettsiden?",
                Svar = "Nei",
                Kategori = "Ordre",
                Rating = -3
            };
            var faq4 = new Faqs
            {
                Id = 4,
                Sporsmaal = "Er det mulig å se neste bussavgang i rutetabellen?",
                Svar = "Nei",
                Kategori = "Rutetabell",
                Rating = 1
            };
            var faq5 = new Faqs
            {
                Id = 5,
                Sporsmaal = "Får man se hvor lang tid det tar fra første til siste stopp?",
                Svar = "Ja",
                Kategori = "Rutetabell",
                Rating = 4
            };
            var faq6 = new Faqs
            {
                Id = 6,
                Sporsmaal = "Er det mulig å endre ordren før jeg betaler?",
                Svar = "Ja",
                Kategori = "Ordre",
                Rating = 0
            };

            db.Faqs.Add(faq1);
            db.Faqs.Add(faq2);
            db.Faqs.Add(faq3);
            db.Faqs.Add(faq4);
            db.Faqs.Add(faq5);
            db.Faqs.Add(faq6);

            db.SaveChanges();

        }
    }
}
