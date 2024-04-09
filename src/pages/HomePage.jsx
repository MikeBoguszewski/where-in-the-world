import Header from "../components/Header";
import CountryCard from "../components/CountryCard";
import { useEffect, useLayoutEffect, useState } from "react";
export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  useEffect(() => {
    const fetchCountries = async () => {
      let response = {}
      if (region) {
        response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      } else {
        response = await fetch("https://restcountries.com/v3.1/all");
      }
      const data = await response.json();
      console.log(data)
      setCountries(data);
    };
    fetchCountries();
  }, [region]);

  return (
    <>
      <Header />
      <main className="px-24">
        <div className="flex justify-between py-16">
          <search>
            <form className="flex shadow py-5 px-8 gap-6 w-[34rem] rounded">
              <img src="src/assets/search.svg" alt="search"></img>
              <input name="search" type="text" placeholder="Search for a country..." className="w-full p-1"></input>
            </form>
          </search>
          <select className="shadow p-2 rounded" defaultValue="" onChange={(event) => setRegion(event.target.value)}>
            <option disabled value="">
              Filter by Region
            </option>
            <option>Africa</option>
            <option>America</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>Oceania</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-4 gap-24">
          {countries.map((country) => (
            <CountryCard key={country.cca3} flag={country.flags} name={country.name} population={country.population} region={country.region} capital={country.capital} />
          ))}
        </div>
      </main>
    </>
  );
}
