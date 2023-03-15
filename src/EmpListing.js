import axios from './api/axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = '/employee/'


const EmpListing = () => {

  const [empData, empDataChange] = useState(null);
  const navigate = useNavigate();

  const detailEmployee = (id) => {
    navigate("/employee/detail/" + id);
  }

  const editEmployee = (id) => {
    navigate("/employee/edit/" + id)
  }
  const deleteEmployee = async (id) => {
    try {
      if(window.confirm("Do you want to remowe")){
       await axios.delete(apiUrl + id )
       getEmployees();
      }
    } catch (err) {
      console.error(err);
    }
  }

  const getEmployees = async () => {
    try {
      const response = await axios.get(apiUrl);
      await JSON.stringify(empDataChange(response.data));
      //console.log(response.data);
    } catch (err) {
      console.error(err);
      navigate('/');
    }
  }

  useEffect(() => {
    getEmployees();
     /* fetch("http://localhost:8000/employee").then((res) => {
        return res.json();
    }).then((resp) => {
        empdatachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })*/
  }, [])


  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="employee/create" className='btn btn-success'>Add New(+)</Link>
          </div>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <td>id</td>
                <td>name</td>
                <td>email</td>
                <td>phone</td>
                <td>action</td>
              </tr>
            </thead>
            <tbody>
              {empData && empData.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <a onClick={() => {editEmployee(item.id)}}className='btn btn-success'>Edit</a>
                    <a onClick={() => {deleteEmployee(item.id)}} className='btn btn-danger'>Remove</a>
                    <a onClick={() => {detailEmployee(item.id)}} className='btn btn-primary'>Details</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EmpListing