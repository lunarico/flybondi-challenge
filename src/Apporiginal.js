import { useState, useEffect } from "react";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]); /*Estado para gurdar los vuelos del json*/
  const [error, setError] = useState(null); /*Estado para mostrar error en caso de que haya un error al cargar los datos */
  const [origin, setOrigin] = useState(""); /*Estado para guarddar los vuelos de origen*/
  const [destination, setDestination] = useState("");/*Estadp para guardar los vuelos de destino*/

  /*Diccionario de mapeo para relacionar códigos de Aeropuerto con las ciudades*/
  const airportCity = {
    COR: "Córdoba",
    BRC: "Bariloche",
    MDZ: "Mendoza",
    EPA: "Buenos Aires (El Palomar)",
  };

  /*Llamada a los datos del JSON*/
  useEffect(() => {
    fetch("/dataset.json")
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => setError("Error cargando vuelos. Intenta más tarde."));
  }, []);

/*Filtrar los vuelos segpun la elección del usuario*/
  const filterFlights = flights.filter(
    (flight) => flight.origin === origin && flight.destination === destination
  );

  return (
    <div>
      <h1>Flybondi</h1>
      <h2>Bienvenido, buscá tu próximo viaje!</h2>

      {/*Lista deplegable de Origen*/}
      <select onChange={(e) => setOrigin(e.target.value)}> {/*Se guarda el valor elegido por el usuario en Origin*/}
        <option value="">Origen</option>
        {/*Se crea una option por cada valor del array*/}
        {[...new Set(flights.map((f) => f.origin))].map((code, i) => ( 
            <option key={i} value={code}>{airportCity[code]}</option>
        ))}
      </select>

      {/*Lista deplegable de Destino*/}
      <select onChange={(e) => setDestination(e.target.value)}> {/*Se guarda el valor elegido por el usuario en Destino*/}
        <option value="">Destino</option>
        {/*Se crea una option por cada valor del array*/}
        {[...new Set(flights.map((f) => f.destination))].map((code, i) => (
          <option key={i} value={code}>{airportCity[code]}</option>
        ))}
      </select>

      {origin && destination && (
        filterFlights.length > 0 ? (
          <ul>
            {filterFlights.map((f) => (
              <li>{airportCity[f.origin]} → {airportCity[f.destination]} | ${f.price}</li>
            ))}
          </ul>
        ) : (
        <p>No se encontraron vuelos.</p>
      )
    )}
  </div>
  );
};

export default FlightSearch;