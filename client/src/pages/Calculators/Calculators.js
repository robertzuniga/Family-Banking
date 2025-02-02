import React, { Component } from 'react';
import Jumbotron from "../../components/Jumbotron"
import { Col, Row, Container } from "../../components/Grid";
// import { Input, TextArea, FormBtn } from "../../components/Form";
//import { Redirect } from 'react-router-dom';
import Octicon, {Key } from '@githubprimer/octicons-react';
import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';

class Calculator extends Component {
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
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }
  handleSubmit = event => {
    const { presentValue, rate, periods, years } = this.state;

    this.props.onSubmit(presentValue, rate, periods, years);

    //run a post to /api/calculations with an object of the above values

    event.preventDefault();
  }
  componentDidMount() {
    API.Calculators.getAll(this.context.authToken)
      .then(response => response.data)
      .then(calculators => this.setState({ calculators }))
      .catch(err => {
        if (err.response.status === 401) {
          return this.setState({ error: "Unauthorized. Please login." });
        }
        console.log(err);
      })
      .finally(() => this.setState({ isLoading: false }));
  }


  render() {
    // console.log(state);
    return (
      <div className='Calculator'>
        <div className='row'>
          <div className='col'>
            {this.state.isLoading
              ? <div className='alert alert-success'>Loading...</div>
              : this.state.error
                ? <div className='alert alert-danger'>{this.state.error}</div>
                : <div>

                  <Container fluid>
                          <Row>
                            <Col size="md-6">
                              <Jumbotron>
                                <h1>Enter Inputs Here!</h1>
                              </Jumbotron>
                              <form onSubmit={this.handleSubmit}>
                                <div className='input-group mb-3'>
                                <div className="input-group-prepend">
                                  <span className="input-group-text"><Octicon icon={Key} /></span>
                                 </div>
                                  <input
                                      className='form-control'
                                      id='presentValue'
                                      type='number'
                                      name='presentValue'
                                      placeholder='10000'
                                      value={this.presentValue}
                                      onChange={this.handleInputChange}
                                />
                              </div>


                              <div className='input-group mb-3'>
                                <div className="input-group-prepend">
                                  <span className="input-group-text"><Octicon icon={Key} /></span>
                                </div>
                                <input
                                  className='form-control'
                                  id='rate'
                                  type='number' step="any"
                                  name='rate'
                                  placeholder='5 (for 5%)'
                                  value={this.rate}
                                  onChange={this.handleInputChange}
                                />
                              </div>

                              <div className='input-group mb-3'>
                                <div className="input-group-prepend">
                                  <span className="input-group-text"><Octicon icon={Key} /></span>
                                </div>
                                <input
                                  className='form-control'
                                  id='periods'
                                  type='number'
                                  name='periods'
                                  placeholder='12 (for 12 months)'
                                  value={this.periods}
                                  onChange={this.handleInputChange}
                                />
                              </div>

                              <div className='input-group mb-3'>
                                <div className="input-group-prepend">
                                  <span className="input-group-text"><Octicon icon={Key} /></span>
                                </div>
                                <input
                                  className='form-control'
                                  id='years'
                                  type='number'
                                  name='years'
                                  placeholder='10 (for 10 years)'
                                  value={this.years}
                                  onChange={this.handleInputChange}
                                />
                              </div>

                               <button className='btn btn-primary' type='submit'>Register Now!</button>
           
                               </form>
                               </Col>
                                  <Col size="md-6 sm-12">
                                  <Jumbotron>
                                      <h1>Future Value Calculation</h1>
                                    </Jumbotron>
                                            place for table and chart
                                </Col>
            </Row>
                  </Container>

                  <p>It's never a question about how much something cost...</p>
                  {/* <p><em>{this.state.calculators[0].message}</em></p> */}
                  <p>the real question to be answered is</p> 
                  <p> <em>"How do we finance this?"</em></p>


                
                </div>}
          </div>
        </div>
      </div>
    );
  }
  
}

export default Calculator;
