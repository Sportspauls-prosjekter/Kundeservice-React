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
            //TODO: Seede resten

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

            db.Faqs.Add(faq1);
            db.Faqs.Add(faq2);
            db.Faqs.Add(faq3);

            db.SaveChanges();

        }
    }
}
