using Kundeservice.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kundeservice.DAL
{
    public interface IServiceRepository
    {
        Task<bool> Lagre(Faq innFaq);
        Task<List<Faqs>> HentAlle();
        Task<Faq> HentEn(int id);
        Task<bool> Endre(Faq innFaq);

    }
}