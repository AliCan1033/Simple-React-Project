import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from './api/axios';

const EmpCreate = () => {

    const [id, idChange] = useState("");
    const [name, nameChange] = useState("");
    const [email, emailChange] = useState("");
    const [phone, phoneChange] = useState("");
    const [active, activeChange] = useState(false);
    const [validation, valChange] = useState(false);

    const navigate = useNavigate();

    //first way
    /*const handleSubmit=(e)=>{
        e.preventDefault();
        const empdata={name,email,phone,active};
        
  
        fetch("http://localhost:8000/employee",{
          method:"POST",
          headers:{"content-type":"application/json"},
          body:JSON.stringify(empdata)
        }).then((res)=>{
          alert('Saved successfully.')
          navigate('/');
        }).catch((err)=>{
          console.log(err.message)
        })
  
      }*/
  
    //second way
    const handleSubmit = async (e) => {
        e.preventDefault();
        const empdata = {id,name,email,phone,active};
        try {
            await axios.post('/employee', JSON.stringify(empdata),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
            //console.log(JSON.stringify(response));
            alert('Saved success if you close this screen select ok.');
            nameChange('');
            emailChange('');
            phoneChange('');
            navigate('/')
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>

                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2>Employee Edit</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div hidden className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input 
                                            value={id} 
                                            disabled="disabled" 
                                            className="form-control"
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                required
                                                value={name}
                                                onMouseDown={e => valChange(true)}
                                                onChange={e => nameChange(e.target.value)}
                                                className="form-control"
                                            ></input>
                                            {name.length === 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                value={email}
                                                onChange={e => emailChange(e.target.value)}
                                                className="form-control"
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input
                                                value={phone}
                                                onChange={e => phoneChange(e.target.value)}
                                                className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input
                                                checked={active}
                                                onChange={e => activeChange(e.target.checked)}
                                                type="checkbox"
                                                className="form-check-input"
                                            ></input>
                                            <label className="form-check-label">Is Active</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default EmpCreate