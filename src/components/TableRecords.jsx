import '../assets/styles/clientsService.css'
import { useEffect, useState } from 'react';
import { getRecordsId } from '../service/services';
import useAuthProvider from '../store/AuthProvider';

function TableRecords({ id, token }) {
  const [records, setRecords] = useState({});
  const [modalRecordId, setModalRecordId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecordsId(id, token);
        setRecords(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, token]);

  const openModal = (data) => {
    setModalRecordId(data);
  };

  const closeModal = () => {
    setModalRecordId(null);
  };

  return (
    <div className="mt-5">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope='col'>Ver</th>
              <th scope="col">ID</th>
              <th scope="col">Fecha de pago</th>
              <th scope="col">total</th>
              <th scope="col">Método de pago</th>
              <th scope="col">Cuenta</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {records && records.message && records.message.map((record) => (
              <tr key={record.id}>
                <td>
                  <button onClick={() => openModal({datePayment: record.datePayment, totalRegis: record.totalRegis, payment: record.payment, nameAccount: record.nameAccount, typeIncome: record.typeIncome, wallet: record.wallet, comments: record.comments})}>Ver</button>
                </td>
                <td>{record.id}</td>
                <td>{record.datePayment}</td>
                <td>{record.totalRegis}</td>
                <td>{record.payment}</td>
                <td>{record.nameAccount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalRecordId !== null && (
        <div className="modal">
          <div className="modal-content">
            <div className='modal-sup'>
            <h2>INFORME DE MOVIMIENTO</h2>
            <span className="close" onClick={closeModal}>&times;</span>
            </div>
            <p>Fecha de pago: {modalRecordId.datePayment}</p>
            <p>Total pagado: {modalRecordId.totalRegis}</p>
            <p>Cuenta receptora: {modalRecordId.nameAccount}</p>
            <p>Método de pago: {modalRecordId.payment}</p>
            <p>Tipo de ingreso: {modalRecordId.typeIncome}</p>
            <p>Cartera: {modalRecordId.wallet}</p>
            <p>Comentarios: {modalRecordId.comments}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableRecords;
