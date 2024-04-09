export default function CountryCard({flag, name, population, region, capital }) {
  return (
    <div className="flex flex-col shadow rounded overflow-hidden h-96">
      <img src={flag.svg} alt={flag.alt} className="h-1/2 object-fill" />
      <div className="p-6">
        <h2 className="font-bold text-xl">{name.common}</h2>
        <p>
          <span className="font-medium">Population:</span> {population}
        </p>
        <p>
          <span className="font-medium">Region:</span> {region}
        </p>
        <p>
          <span className="font-medium">Capital:</span> {capital}
        </p>
      </div>
    </div>
  );
}