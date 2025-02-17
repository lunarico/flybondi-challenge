import { useContext } from "react";
import { FlightsContext } from "../Context/FlightsContext";
import imgFly from "../assets/logoFly2.png"

const FlightSearch = () => { 
  
  /*Se accede a los valores y funciones del FlightsContext*/
  const { flights, origin, setOrigin, destination, setDestination, filteredFlights, topFlights, error, orderFlights, 
    airportCity, showDate, SelectCity, showFlights, topSearch, allFlights, orderDate } = useContext(FlightsContext);

  return (
    <div>
      <div id="header">
        <img src={imgFly} alt="Flybondi"></img>
        <h1>Bienvenido, buscá tu próximo viaje!</h1>
      </div>

      {/* Listas desplegable de Origen y Destino */}
      <div id="selects">
        <div>
          <i class="fa-solid fa-plane-departure"></i>
          <SelectCity label="Origen" value={origin} onChange={setOrigin} 
            options={[...new Set(flights.map((f) => f.origin))]} />
        </div>
        <div>
          <i class="fa-solid fa-plane-arrival"></i>
          <SelectCity label="Destino" value={destination} onChange={setDestination} 
            options={[...new Set(flights.map((f) => f.destination))]} />
        </div>
      </div>
      
      {/*Botón para mostrar los 10 vuelos más baratos dentro de los filtrados*/}
      <button className="buttons" onClick={topSearch} 
              disabled={!origin || !destination || filteredFlights.length === 0}>
              Buscar 10 vuelos más baratos
      </button>

      {/*Botón para ordenar los vuelos por fecha*/}
      {filteredFlights.length > 0 && (
        <button className="buttons" onClick={orderDate}> Fecha {orderFlights === "asc" ? "↓" : orderFlights === "desc" ? "↑" : ""}</button>
      )}
      
      {/*Mostrar los vuelos buscados y los filtrados*/}
      {showFlights().length > 0 && (
        <div id="flightList">
          <h2>{topFlights.length > 0 ? "Top 10 vuelos más baratos:" : "Vuelos disponibles:"}</h2>
            <ul>
              {showFlights().map((f, index) => (
                <li key={index}> 
                  <div>
                    <p>{showDate(f.date)}</p>
                    <p>{airportCity[f.origin]} → {airportCity[f.destination]}</p>
                  </div>
                  <p id="price">${f.price}</p>
                </li>
              ))}
            </ul>
        </div>
      )}
      
      {/*Botón para volver a ver toddos los vuelos buscados sin filtro ni orden*/}
      {topFlights.length > 0 && (
        <button className="buttons" onClick={allFlights} disabled={topFlights.length === 0}>Ver todos los vuelos</button>
      )}

      {/* Mensaje de error si ocurre */}
      {error && <div>{error}</div>}

    </div>
  );
};

export default FlightSearch;