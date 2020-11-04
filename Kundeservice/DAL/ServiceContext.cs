using Microsoft.EntityFrameworkCore;

namespace Kundeservice.DAL
{

    public class Faqs
    {

        public int Id { get; set; }  // gir en primærnøkkel med autoincrement fordi attributten heter noe med "id"
        public string Sporsmaal { get; set; }
        public string Svar { get; set; }
        public string Tema { get; set; }
        public int Rating { get; set; }
          
    }
    public class ServiceContext : DbContext
    {
            public ServiceContext(DbContextOptions<ServiceContext> options)
                    : base(options)
        {
            // setningen under brukes for å opprette databasen fysisk dersom den ikke er opprettet
            // dette er uavhenig av initiering av databasen, se DBInit(seed)
            // når man endrer på strukturen på KundeContext er det fornuftlig å slette "Kunde.Db" fysisk før nye kjøringer
            Database.EnsureCreated();
        }

        public DbSet<Faqs> Faqs { get; set; }
        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // må importere pakken Microsoft.EntityFrameworkCore.Proxies
            // og legge til"viritual" på de attriuttene som ønskes å lastes automatisk (LazyLoading)
            optionsBuilder.UseLazyLoadingProxies();
        }

    }
}

