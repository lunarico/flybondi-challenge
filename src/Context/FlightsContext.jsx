import { createContext, useState, useEffect } from "react";

export const FlightsContext = createContext();

export const FlightsProvider = ({ children }) => {
  const [flights, setFlights] = useState([]); // Estado para guardar todos los vuelos
  const [error, setError] = useState(null); //Estado para mostrar error en caso de que haya un error al cargar los datos
  const [origin, setOrigin] = useState(""); // Estado para guardar los vuelos de origen
  const [destination, setDestination] = useState(""); // Estado para guardar los vuelos de destino
  const [filteredFlights, setFilteredFlights] = useState([]); // Estado para guardar los vuelos filtrados
  const [topFlights, setTopFlights] = useState([]); // Estado para guardar los 10 vuelos más baratos
  const [orderFlights, setOrderFlighs] = useState(null); //Estado para guardar los vuelos ordenados

  //Objeto para relacionar los códigos con los respectivos nombres de ciudades
  const airportCity = {
    COR: "Córdoba",
    BRC: "Bariloche",
    MDZ: "Mendoza",
    EPA: "Buenos Aires (El Palomar)",
  };

  // Llamada a los datos del JSON
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/dataset.json`)
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch(() => setError("Error cargando vuelos. Intenta más tarde."));
  }, []);

  // Función para formatear la fecha
  const showDate = (dateString) => {
    const date = new Date(dateString);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return (
      <>{date.getUTCDate()} de {months[date.getUTCMonth()]}{""}
        <i className="fa-solid fa-plane-departure"></i>{" "}
        {date.getUTCHours().toString().padStart(2, "0")}:{date.getUTCMinutes().toString().padStart(2, "0")} hs
      </>)
  };

  //Función para renderizar los Selects de Origen y Destino
  const SelectCity = ({ label, value, onChange, options }) => (
    <div>
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">--</option>
        {options.map((code, i) => (<option key={i} value={code}>{airportCity[code]}</option>))}
      </select>
    </div>
  );

  //Función para mostrar los vuelos buscados 
  const showFlights = () => {
    return filteredFlights.length > 0 && !topFlights.length ? filteredFlights : topFlights;
  };
    
  // Filtrar vuelos cuando cambian origen/destino
  useEffect(() => {
    if (origin && destination) {
      const filtered = flights.filter((flight) => 
        flight.origin === origin && flight.destination === destination && flight.availability > 0)
      setFilteredFlights(filtered);
      setTopFlights([]); // Resetear top 10 cuando cambia el filtro
    }
  }, [origin, destination, flights]);

  // Función para buscar los 10 vuelos más baratos
  const topSearch = () => {
    const topTen = filteredFlights.sort((a, b) => a.price - b.price).slice(0, 10);
    setTopFlights(topTen);
  };

  //Función para vaciar el array de los 10 vuelos más baratos
  const allFlights = () => {
    setTopFlights([])
  }

  //Función para ordenar los vuelos por fecha
  const orderDate = () => {
    setOrderFlighs(orderFlights === "asc" ? "desc" : "asc");
    filteredFlights.sort((a, b) =>
      orderFlights === "asc" 
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date))
  };

  return (
    <FlightsContext.Provider value={{
      flights, 
      origin, 
      setOrigin, 
      destination, 
      setDestination, 
      filteredFlights, 
      topFlights, error, 
      orderFlights, 
      airportCity, 
      showDate, 
      SelectCity, 
      showFlights, 
      topSearch, 
      allFlights, 
      orderDate 
      }}>{children}
    </FlightsContext.Provider>
  );
};