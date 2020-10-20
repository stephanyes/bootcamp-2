import * as React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

interface IState {
  apiurl: string;
  checked: any[];
  api_response: string;
}

interface IProps {
algo: any;
history: any
}

interface Values {
  first_name: string;
  last_name: string;
  uuid_code: string;
  category: number[];
}

const PassengerSchema = yup.object().shape({
  first_name: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First Name Required'),
    last_name: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last Name Required'),
  uuid_code: yup.string()
    .min(5)
    .max(5)
    .matches(/^([A-Z]{2}\d{3})$/, "Must be 2 Letters and 3 Numbers")
    .required("Flight Code Required"),
}) 

class AddPassenger extends React.Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = { 
      apiurl: "",
      checked: [],
      api_response: ""
    }
  }

  public render() {
    const {api_response} = this.state;
    return (
      <div>
        <h1>Add New Passenger</h1>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            uuid_code: '',
            category: []
          }}
          validationSchema={PassengerSchema}
          onSubmit={async (values: Values) => {
            const obj = {
              first_name: values.first_name,
              last_name: values.last_name,
              uuid_code: values.uuid_code,
              category: values.category
            }
            const api_url = "http://localhost:3001/passengers/"
            axios.post(api_url, obj).then(response => {
              const {success, items_added} = response.data
              this.setState({
                api_response: `${success}. Items added: ${items_added}`
              })
            }).catch(err => {
              const {data} = err.response;
              this.setState({
                api_response: data.failure
              })
            })
          }}
          
        >
            <Form>
              <label htmlFor="first_name">First Name</label>
              <Field id="first_name" name="first_name" placeholder="John" />
              <ErrorMessage name="first_name" />

              <label htmlFor="last_name">Last Name</label>
              <Field id="last_name" name="last_name" placeholder="Doe" />
              <ErrorMessage name="last_name" />

              <label htmlFor="uuid_code">Flight Code</label>
              <Field
                id="flight_code"
                name="uuid_code"
                placeholder="Flight Code"
              />
              <ErrorMessage name="uuid_code" />

              <div role="group" aria-labelledby="checkbox-group">
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
              </div>
              <button type="submit">Submit</button>
            </Form>
        </Formik>
        {api_response !== "" ? <h5>{api_response}</h5> : null}
      </div>
    )
  }
}

export default AddPassenger;