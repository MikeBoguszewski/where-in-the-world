import Header from "../components/Header";
import CountryCard from "../components/CountryCard";
import { useEffect, useState } from "react";
export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      if (region) {
        setCountries(data.filter((country) => country.region === region));
      } else {
        setCountries(data);
      }
    };
    fetchCountries();
  }, [region]);

  const searchForCountry = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://restcountries.com/v3.1/name/${search}`);
    const data = await response.json();
    let searchedCountries;
    if (region) {
      searchedCountries = data.filter((country) => country.region === region);
    } else {
      searchedCountries = data;
    }

    setCountries(searchedCountries);
    console.log(searchedCountries);
    console.log(data);
  };
  return (
    <>
      <Header />
      <main className="px-24">
        <div className="flex justify-between flex-col lg:flex-row py-16">
          <search>
            <form className="flex shadow py-5 px-8 mb-16 gap-6 max-w-[34rem] lg:w-[34rem] h-16 rounded bg-white dark:bg-slate-700" onSubmit={searchForCountry}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="dark:fill-white">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
              <input name="search" type="text" placeholder="Search for a country..." className="w-full p-1 dark:bg-slate-700" onChange={(event) => setSearch(event.target.value)} value={search}></input>
            </form>
          </search>
          <select className="shadow p-2 rounded w-52 h-16 dark:bg-slate-700" defaultValue="" onChange={(event) => setRegion(event.target.value)}>
            <option disabled value="">
              Filter by Region
            </option>
            <option>Africa</option>
            <option>Americas</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>Oceania</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
          {countries.map((country) => (
            <CountryCard key={country.cca3} flag={country.flags} name={country.name} population={country.population} region={country.region} capital={country.capital} />
          ))}
        </div>
      </main>
    </>
  );
}
