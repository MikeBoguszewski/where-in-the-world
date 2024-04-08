import Header from "../components/Header";
import CountryCard from "../components/CountryCard";
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <div>
          <search>
            <form>
              <img src="src/assets/search.svg" alt="search"></img>
              <input name="search" type="text" placeholder="Search for a country..."></input>
            </form>
          </search>
          <select>
            <option disabled selected>
              Filter by Region
            </option>
          </select>
        </div>
        <div>
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />
          <CountryCard />w
        </div>
      </main>
    </>
  );
}
