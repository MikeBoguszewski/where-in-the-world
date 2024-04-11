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
      <a href="/">Back</a>
      <img src={country.flags?.svg} alt={country.flags?.alt} />
      <h1>{country.name?.common}</h1>
      <div>
        <p>
          <span>Native Name:</span> {nativeNames[0]}
        </p>
        <p>
          <span>Population:</span> {country?.population?.toLocaleString()}
        </p>
        <p>
          <span>Region:</span> {country?.region}
        </p>
        <p>
          <span>Sub Region:</span> {country?.subregion}
        </p>
        <p>
          <span>Capital:</span> {country?.capital}
        </p>
      </div>
      <div>
        <p>
          <span>Top Level Domain:</span> {country?.tld}
        </p>
        <p>
          <span>Currencies:</span> {currencies.join(", ")}
        </p>
        <p>
          <span>Languages:</span> {languages.join(", ")}
        </p>
      </div>
      <h2>Border Countries:</h2>
      <div>
        {borderingCountries.map((borderingCountry, index) => (
          <a key={index} href={`/detail/${borderingCountry}`}>
            {borderingCountry}
          </a>
        ))}
      </div>
    </>
  );
}
