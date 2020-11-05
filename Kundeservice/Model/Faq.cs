using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Kundeservice.Model
{
    public class Faq
    {
        public int Id { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \- ?/!]{7,80}")]
        public string Sporsmaal { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \- ?/!]{7,80}")]
        public string Svar { get; set; }
        [RegularExpression(@"[a-zA-ZæøåÆØÅ. \- ?/!]{7,80}")]
        public string Kategori { get; set; }
        public int Rating { get; set; }
    }
}
