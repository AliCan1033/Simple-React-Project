import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom"
import axios from './api/axios';

const apiUrl = '/employee/'

const EmpDetail = () => {

  const { empid } = useParams();
  const [empdata, empdataChange] = useState({});

  const detailEmployee = async () => {
    try {
      const response = await axios.get(apiUrl + empid)
      await empdataChange(response.data);
      //console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    detailEmployee();
    // fetch("http://localhost:8000/employee/" + empid).then((res) => {
    //   return res.json();
    // }).then((resp) => {
    //   empdatachange(resp);
    // }).catch((err) => {
    //   console.log(err.message);
    // })
}, []);

return (
  <div className="container">
    <div className="card " style={{ "textAlign": "left" }}>
      {empdata &&
        <div className="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h2>Contact Details</h2>
            </li>
            <li class="list-group-item"><b>The Employee is {empdata.name}</b> ({empdata.id})</li>
            <li class="list-group-item"><b>Email is :</b> {empdata.email}</li>
            <li class="list-group-item"><b>Phone is : </b>{empdata.phone}</li>
            <li class="list-group-item"> <Link class="btn btn-dark" to={"/"}>Back</Link></li>
          </ul>
        </div>
      }
    </div>
  </div>
)
}

export default EmpDetail