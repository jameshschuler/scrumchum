using System;
using System.Collections.Generic;

namespace Scrumchum.Models
{
    public class Cardset
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public IEnumerable<Card> Cards = new List<Card>();

        public Cardset()
        {

        }
    }
}
