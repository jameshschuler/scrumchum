using System;
using System.Collections.Generic;
using Scrumchum.Models;

namespace Scrumchum.Services
{
    public interface IDataService
    {
        IEnumerable<Cardset> GetCardsets( );
    }

    public class DataService : IDataService
    {
        private List<Cardset> _cardsets = new List<Cardset>
        {
            new Cardset
            {
                Id = 1,
                Value = "0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, coffee, infinity"
            }
        };

        public DataService( )
        {

        }

        public IEnumerable<Cardset> GetCardsets( )
        {
            return _cardsets;
        }
    }
}
