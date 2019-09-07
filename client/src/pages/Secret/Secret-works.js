import React, {
  Component
} from 'react';
import Jumbotron from "../../components/Jumbotron"
import {
  Col,
  Row,
  Container
} from "../../components/Grid";
// import { Input, TextArea, FormBtn } from "../../components/Form";
//import { Redirect } from 'react-router-dom';
import Octicon, {
  Key
} from '@githubprimer/octicons-react';
import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';

class Secret extends Component {
  static contextType = AuthContext;

  state = {
    userID: '',
    isLoading: true,
    error: '',
    presentValue: '',
    rate: '',
    periods: '',
    years: ''
  }
  handleInputChange = event => {
    const {
      name,
      value
    } = event.target;

    this.setState({
      [name]: value
    });
  }
  handleSubmit = event => {
    event.preventDefault();

    function postData(url = '', data = {}) {
      // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses JSON response into native JavaScript objects 
    }

    //run a post to /api/calculations with an object of the above values
    if (this.context.user.id) {
      var userInput = {
        user_id: this.context.user.id,
        present_value: parseInt(this.state.presentValue),
        rate: parseInt(this.state.rate),
        periods: parseInt(this.state.periods),
        years: parseInt(this.state.years)
      }

      // console.log(this.context.user.id)
      // console.log(userInput)

      postData('/api/calculations', userInput)
        .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    } else {
      alert("you are not logged in")
    }

  }
  componentDidMount() {
    API.Secrets.getAll(this.context.authToken)
      .then(response => response.data)
      .then(secrets => this.setState({
        secrets
      }))
      .catch(err => {
        if (err.response.status === 401) {
          return this.setState({
            error: "Unauthorized. Please login."
          });
        }

        console.log(err);
      })
      .finally(() => this.setState({
        isLoading: false
      }));
  }


  render() {
    // console.log(state);
    return ( <
      div className = 'Secret' >
      <
      div className = 'row' >
      <
      div className = 'col' > {
        this.state.isLoading ?
        <
        div className = 'alert alert-success' > Loading... < /div> :
        this.state.error ?
        <
        div className = 'alert alert-danger' > {
          this.state.error
        } < /div> : <
        div >

        <
        Container fluid >
        <
        Row >
        <
        Col size = "md-6" >
        <
        Jumbotron >
        <
        h1 > Enter Inputs Here! < /h1> < /
        Jumbotron > <
        form onSubmit = {
          this.handleSubmit
        } >
        <
        div className = 'input-group mb-3' >
        <
        div className = "input-group-prepend" >
        <
        span className = "input-group-text" > < Octicon icon = {
          Key
        }
        /></span >
        <
        /div> <
        input
        className = 'form-control'
        id = 'presentValue'
        type = 'number'
        name = 'presentValue'
        placeholder = '10000'
        value = {
          this.presentValue
        }
        onChange = {
          this.handleInputChange
        }
        /> < /
        div >


        <
        div className = 'input-group mb-3' >
        <
        div className = "input-group-prepend" >
        <
        span className = "input-group-text" > < Octicon icon = {
          Key
        }
        /></span >
        <
        /div> <
        input
        className = 'form-control'
        id = 'rate'
        type = 'number'
        step = "any"
        name = 'rate'
        placeholder = '5 (for 5%)'
        value = {
          this.rate
        }
        onChange = {
          this.handleInputChange
        }
        /> < /
        div >

        <
        div className = 'input-group mb-3' >
        <
        div className = "input-group-prepend" >
        <
        span className = "input-group-text" > < Octicon icon = {
          Key
        }
        /></span >
        <
        /div> <
        input
        className = 'form-control'
        id = 'periods'
        type = 'number'
        name = 'periods'
        placeholder = '12 (for 12 months)'
        value = {
          this.periods
        }
        onChange = {
          this.handleInputChange
        }
        /> < /
        div >

        <
        div className = 'input-group mb-3' >
        <
        div className = "input-group-prepend" >
        <
        span className = "input-group-text" > < Octicon icon = {
          Key
        }
        /></span >
        <
        /div> <
        input
        className = 'form-control'
        id = 'years'
        type = 'number'
        name = 'years'
        placeholder = '10 (for 10 years)'
        value = {
          this.years
        }
        onChange = {
          this.handleInputChange
        }
        /> < /
        div >

        <
        button className = 'btn btn-primary'
        type = 'submit' > Register Now! < /button>

        <
        /form> < /
        Col > <
        Col size = "md-6 sm-12" >
        <
        Jumbotron >
        <
        h1 > Future Value Calculation < /h1> < /
        Jumbotron >
        place
        for table and chart <
        /Col> < /
        Row > <
        /Container>

        <
        p > It 's never a question about how much something cost...</p> {
        /* <p><em>{this.state.secrets[0].message}</em></p> */
      } <
      p > the real question to be answered is < /p>  <
      p > < em > "How do we finance this?" < /em></p >



      <
      /div>} < /
      div > <
      /div> < /
      div >
    );
  }

}

export default Secret;