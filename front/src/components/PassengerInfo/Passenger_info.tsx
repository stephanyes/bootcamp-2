import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import axios from 'axios';
import _ from 'lodash';

interface IState {
  packages: any[];
  datarecords: any[];
  datacolumns: any[];
  datapackages: any[];
  api_response: string;
  picked: boolean;
}

interface IProps {
  match: any
}

interface Values {
  passengerId: number[];
  category: number[];
}

class PassengerInfo extends React.Component<IProps, IState> {
  constructor(props: RouteComponentProps){
    super(props);
    this.state = { 
      packages: [],
      datacolumns: [],
      datapackages: [],
      datarecords: [],
      api_response: "",
      picked: false,
    }
    this.callApi = this.callApi.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    const {passengerId} = this.props.match.params;
    await this.callApi(passengerId);
  }

  private async callApi(id: string): Promise<void> {
    const api_url = `http://localhost:3001/passengers/${id}`;
    await axios.get(api_url).then(response => {
     const { result, packages } = response.data;
     this.setState({
      datarecords: [result],
      packages: packages,
      picked: !result.pick_up_time ? false : true
     })
     this.extractColumnNames();
    })
  }

  private extractColumnNames() 
  { 
    const firstrecord = _.keys(this.state.datarecords[0]);
    if(this.state.packages) {
      const secondrecord = _.keys(this.state.packages[0]);
      this.setState({datacolumns: firstrecord, datapackages: secondrecord});
    } else {
      this.setState({datacolumns: firstrecord})
    }
  }
//Passengers Table
  private displayRecords(key: number) {
    const datacolumns= this.state.datacolumns;
    return datacolumns.map((each_col) => 
      this.displayRecordName(each_col,key)
    ) 
  }

  private displayRecordName(colname:string, key:number){
    const record = this.state.datarecords[key];
    return <th key={record[colname]}>{record[colname]}</th> 
  }

//Packages Table
  private displayPackages(key: number) {
    const datapackages= this.state.datapackages;
    return datapackages.map((each_col) => 
      this.displayPackageName(each_col,key)
    ) 
  }

  private displayPackageName(colname:string, key:number){
    const record = this.state.packages[key];
    return <th key={record[colname]}>{record[colname]}</th> 
  }

  private Capitalize(str: string){
      const str_t = str.toUpperCase();
      const str_tt = str_t.replace("_", " ");
      return str_tt;
  }

  private async removePackages(event: React.MouseEvent<HTMLElement>): Promise<void> {
    event.preventDefault();
    const {passengerId} = this.props.match.params;
    const api_url = `http://localhost:3001/passengers/${passengerId}`;
    await axios.delete(api_url).then(response => {
     const { success } = response.data;
     this.setState({
      api_response: success
     })
    })
    setTimeout(function() {
      document.location.reload(true);
  }, 2000)
  }

  public render() {
    const { datacolumns, datarecords, packages, datapackages, api_response, picked } = this.state;
    return (
      <div>
        <h1>Passengers Info: {datarecords[0] ? (datarecords[0].first_name + " " + datarecords[0].last_name) : null}</h1>
        <div className="container">
          <div className="row">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    {datacolumns && datacolumns.map(each_datarecord_key => 
                      <th key={each_datarecord_key} scope="col">{this.Capitalize(each_datarecord_key)}</th>
                    )}
                  </tr>
                </thead>                            
                  <tbody> 
                    {datarecords && (datarecords.map((each_datarecord, recordindex) =>
                        <tr key={each_datarecord.uuid}>
                        {this.displayRecords(recordindex)}
                        </tr>
                    ))}
                  </tbody>
              </table>
          </div>
        </div>
        <div className="container">
          <div className="row">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    {datapackages && datapackages.map(each_datarecord_key => 
                      <th key={each_datarecord_key} scope="col">{this.Capitalize(each_datarecord_key)}</th>
                    )}
                  </tr>
                </thead>                            
                  <tbody> 
                    {packages && (packages.map((each_datarecord, recordindex) =>
                        <tr key={each_datarecord.uuid}>
                        {this.displayPackages(recordindex)}
                        </tr>
                    ))}
                  </tbody>
              </table>
          </div>
          {packages ? (
            !picked ? <button type="submit" onClick={(event: React.MouseEvent<HTMLElement>) => this.removePackages(event)}>Checking out?</button> : <h5>Passenger already claimed bagage</h5>
          ) : null}
        </div>
        {api_response ? <h5>{api_response}</h5> : null}
      </div>
    )
  }
}

export default PassengerInfo;