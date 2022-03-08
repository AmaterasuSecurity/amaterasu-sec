import React, { useState }  from "react"
import axios from "axios";
import { Link } from "gatsby"
import Layout from "../components/layout"


const MyForm = () => {
    
    const [serverState, setServerState] = useState({
      submitting: false,
      status: null
    });
    const handleServerResponse = (ok, msg, form) => {
      setServerState({
        submitting: false,
        status: { ok, msg }
      });
      if (ok) {
        form.reset();
      }
    };
    const handleOnSubmit = e => {
      e.preventDefault();
      const form = e.target;
      setServerState({ submitting: true });
      axios({
        method: "post",
        url: "https://getform.io/f/5fbeff20-1b67-4551-a88e-6a9af48a9311",
        data: new FormData(form)
      })
        .then(r => {
          handleServerResponse(true, "Thanks!", form);
        })
        .catch(r => {
          handleServerResponse(false, r.response.data.error, form);
        });
    };
    return (
        <Layout>
    
    <div>
         <div className="col-md-8 mt-5">
            <h3>Getform.io Gatsby Form Example</h3>
            <form onSubmit={handleOnSubmit}>
            <div className="form-group">
                <label for="InputEmail1" required="required">Email address</label>
                <input type="email" name="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div> 
            <div className="form-group">
                <label for="InputName">Name</label>
                <input type="text" name="name" className="form-control" id="InputName" placeholder="Enter your name" required="required"/>
            </div>
            <div className="form-group">
                <label for="Message">Message</label>
                <input type="text" name="message" className="form-control" id="InputMessage" placeholder="Leave message" required="required"/>
            </div>
            <button type="submit" className="btn btn-primary"  disabled={serverState.submitting}>
                Submit
            </button>
            {serverState.status && (
                <p className={!serverState.status.ok ? "errorMsg" : ""}>
                {serverState.status.msg}
                </p>
            )}
            </form>
        </div>
      </div>  
    
  </Layout>
     
    );
  };
  
  export default MyForm;
