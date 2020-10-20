import * as React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';

interface IState {
  apiurl: string;
  api_response: string;
}

interface IProps {
algo: any;
history: any
}

interface Values {
  passengerId: number[];
  category: number[];
}

class AddPackage extends React.Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = { 
      apiurl: "",
      api_response: ""
    }
  }

  public render() {
    const {api_response} = this.state;
    return (
      <div>
        <h1>Add New Package</h1>
        <Formik
          initialValues={{
            passengerId: [],
            category: [],
          }}
          // validationSchema={PassengerSchema}
          
          onSubmit={async (values: Values) => {
            const obj = {
              passengerId: values.passengerId,
              category: values.category,
            }
            const api_url = "http://localhost:3001/packages/"
            axios.post(api_url, obj).then(response => {
              const {success, items_added} = response.data
              this.setState({
                api_response: `${success}. Items added ${items_added}`
              })
            }).catch(err => {
              const {data} = err.response
              this.setState({
                api_response: data.failure
              })
            })
          }}
          
        >
            <Form>
              <label htmlFor="passengerId">Passenger Id</label>
              <Field id="passengerId" name="passengerId" placeholder="John" />
              <ErrorMessage name="passengerId" />

              <div role="group" aria-labelledby="checkbox-group">
              <label htmlFor="category">Select Category</label>
                <label>
                  <Field type="checkbox" name="category" value="1" />
                  Big
                </label>
                <label>
                  <Field type="checkbox" name="category" value="2" />
                  Small
                </label>
                <label>
                  <Field type="checkbox" name="category" value="3" />
                  Clothes
                </label>
                <ErrorMessage name="category" />
              </div>
              <button type="submit">Submit</button>
            </Form>
        </Formik>
        {api_response !== "" ? <h5>{api_response}</h5> : null}
      </div>
    )
  }
}

export default AddPackage;