import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

export default function DetailPage() {
  const { name } = useParams();
  const [country, setCountry] = useState({});
  const [borderingCountries, setBorderingCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };
    fetchCountry();
  }, [name]);

  useEffect(() => {
    const fetchBorderingCountries = async () => {
      try {
        const borders = country?.borders || [];
        if (borders) {
          const promises = borders.map(async (border) => {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${border}?fullText=true`);
            const data = await response.json();
            console.log(data[0]);
            return data[0].name.common;
          });
          const borderingCountries = await Promise.all(promises);
          setBorderingCountries(borderingCountries);
        }
      } catch (error) {
        console.error("Error fetching bordering countries:", error);
      }
    };

    fetchBorderingCountries();
  }, [country]);

  const nativeNames = country?.name?.nativeName ? Object.values(country.name.nativeName).map((name) => name.common) : [];
  const currencies = country?.currencies ? Object.values(country.currencies).map((currency) => currency.name) : [];
  const languages = country?.languages ? Object.values(country.languages).map((language) => language) : [];

  return (
    <>
      <Header />
      <div className="p-12 leading-loose">
        <a href="/" className="shadow-2xl bg-white w-32 rounded mb-16 h-10 flex items-center justify-center gap-2">
          <img src="/src/assets/arrow-left.svg" alt="back-arrow" />
          Back
        </a>
        <div className="flex flex-col lg:flex-row lg:gap-32 lg:items-center lg:justify-center">
          <img src={country.flags?.svg} alt={country.flags?.alt} className="mb-10 lg:w-1/3" />
          <div className="lg:w-2/3 lg:pl-20">
            <h1 className="text-3xl font-bold mb-8">{country.name?.common}</h1>
            <div className="flex flex-col lg:flex-row lg:gap-32">
              <div className="mb-8 whitespace-nowrap">
                <p>
                  <span className="font-medium">Native Name:</span> {nativeNames[0]}
                </p>
                <p>
                  <span className="font-medium">Population:</span> {country?.population?.toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Region:</span> {country?.region}
                </p>
                <p>
                  <span className="font-medium">Sub Region:</span> {country?.subregion}
                </p>
                <p>
                  <span className="font-medium">Capital:</span> {country?.capital}
                </p>
              </div>
              <div className="mb-8">
                <p>
                  <span className="font-medium">Top Level Domain:</span> {country?.tld}
                </p>
                <p>
                  <span className="font-medium">Currencies:</span> {currencies.join(", ")}
                </p>
                <p>
                  <span className="font-medium">Languages:</span> {languages.join(", ")}
                </p>
              </div>
            </div>

            <h2 className="font-medium mb-5">Border Countries:</h2>
            <div className="flex gap-5">
              {borderingCountries.map((borderingCountry, index) => (
                <a key={index} href={`/detail/${borderingCountry}`} className="shadow-2xl bg-white w-32 rounded mb-16 h-10 flex items-center justify-center leading-none text-center">
                  {borderingCountry}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
