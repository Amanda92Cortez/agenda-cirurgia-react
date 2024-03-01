import React, { useState } from "react";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const Teste = () => {
  const [dados, setDados] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(false);

  /* Conversão de Array para Objeto */
  const convertItemsToObjects = (array) => {
    return Array.from(array, (item, i) => {
      return {
        sala: item[0],
        status: item[1],
        horaInicio: item[2],
        duracao: item[3],
        reserva: item[4],
        dataDaAgenda: item[5],
        codSala: item[6],
      };
    });
  };

  const handleFilterClick = async () => {
    try {
      setLoading(true);
      const formattedDate = format(selectedDate, "dd-MM-yyyy");
      const resp = await fetch(
        `http://localhost:3001/agendamentos?data=${formattedDate}`
      );
      const data = await resp.json();
      const convertedList = convertItemsToObjects(data);
      setDados(convertedList);
    } catch (error) {
      console.error("Erro ao obter dados da API OracleDB", error);
    } finally {
      setLoading(false);
    }
  };

  /***************************************************************** */

  /* Apresentação na tela */
  return (
    <div className="container">
      <header className="container">
        <div className="d-flex bg-body-tertiary justify-content-center align-items-center">
          <div className="col">
            <img src="../../logo-h10j.png" alt="Logo Hospital 10 de Julho" />
          </div>
          <div className="col">
            <p className="navbar-brand fs-5 text-center text-uppercase">
              ...
            </p>
          </div>
          <div className="row justify-content-center align-items-center">
            
            <div className="col">
              <input className="form-control me-2" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>

            <div className="col">
              <select className="form-select" aria-label="Default select example">
                <option value="1">SALA 01</option>
                <option value="2">SALA 02</option>
                <option value="3">SALA 03</option>
                <option value="3">SALA 04</option>
                <option value="3">SALA 05</option>
                <option value="3">HEMODINÂMICA</option>
              </select>
            </div>
            
            <div className="col">
              <button className="btn btn-outline-success" onClick={handleFilterClick} >{" "}Carregar{" "}</button>
            </div>
          </div>
          
        </div>
      </header>

      <section>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">SALA</th>
              <th scope="col">HORÁRIO</th>
              <th scope="col">DURAÇÃO</th>
              <th scope="col">RESERVADO</th>
              <th scope="col">DATA</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Carregando</td>
              </tr>
            ) : dados.length > 0 ? (
              dados.map((item, index) => (
                <tr key={index}>
                  <td>{item.sala}</td>
                  <td>{item.horaInicio}</td>
                  <td>{item.duracao}</td>
                  <td>{item.reserva}</td>
                  <td>{item.dataDaAgenda}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhuma agenda disponível</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="footer">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a
                href="https://www.hospital10dejulho.com.br/"
                className="nav-link px-2 text-body-secondary texto-verde"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hospital 10 de Julho
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://www.hospital10dejulho.com.br/centro-cirurgico/"
                className="nav-link px-2 text-body-secondary texto-verde"
                target="_blank"
                rel="noopener noreferrer"
              >
                Centro Cirúrgico
              </a>
            </li>
          </ul>
          <p className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"></p>
          <p className="col-md-4 mb-0 text-body-secondary texto-menor">
            "Desenvolvido pelo setor T.I Hospital"
          </p>
        </footer>
      </section>
    </div>
  );
};

export default Teste;
