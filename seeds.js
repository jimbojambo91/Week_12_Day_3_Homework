use countries;

db.dropDatabase();

db.countries.insert([
  {
    name: "United Kingdom",
    capital: "London"
  },
  {
    name: "France",
    capital: "Paris"
  }
  ])
