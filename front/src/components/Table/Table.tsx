import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

interface IState {
    apiurl: string;
    datarecords: any[];
    datacolumns: any[];
    loaded: boolean;
}

interface IProps {
  algo: any;
  history: any
}

class BuildDynamicTable extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { 
             apiurl: "",
             datarecords: [], 
             datacolumns: [],
             loaded: false
        }
        this.callApi = this.callApi.bind(this);
    }
    
    public async componentDidMount(): Promise<void> {
      await this.callApi()
    }

    private async callApi(): Promise<void> {
      const api_url = "http://localhost:3001/passengers/";
      await axios.get(api_url).then(response => {
       this.setState({datarecords: response.data, loaded: true});
        this.extractColumnNames();
      })
    }

    private addNewPassenger(event: React.MouseEvent<HTMLElement>): void {
      event.preventDefault();
      this.props.history.push("/add-passenger")
    }

    private addNewPackage(event: React.MouseEvent<HTMLElement>): void {
      event.preventDefault();
      this.props.history.push("/add-package")
    }

    private extractColumnNames() 
    { 
        const firstrecord = _.keys(this.state.datarecords[0]);
        this.setState({datacolumns: firstrecord});
    }

    private displayRecords(key: number) {
    	const datacolumns= this.state.datacolumns;
   
    	return datacolumns.map((each_col) => 
    		this.displayRecordName(each_col,key)
    	) 
    }

    private displayRecordName(colname:string, key:number){
      const record = this.state.datarecords[key];
      if(colname === "uuid_code") return <th key={record[colname]}><Link to={`/passenger/${record['uuid']}`}>{record[colname]}</Link></th>
    	return <th key={record[colname]}>{record[colname]}</th> 
    }

    private Capitalize(str: string){
        const str_t = str.toUpperCase();
        const str_tt = str_t.replace("_", " ");
        return str_tt;
    }

    public render() {
        const {datarecords, loaded, datacolumns} = this.state;
        return (
            <div>
                {!loaded && (
                    <div className="text-center">
                        <h2>No datarecords found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                          <button type="submit" onClick={this.callApi}>Reload Passengers</button>
                          <button type="submit" onClick={(event: React.MouseEvent<HTMLElement>) => this.addNewPassenger(event)}>Add new Passenger</button>
                          <button type="submit" onClick={(event: React.MouseEvent<HTMLElement>) => this.addNewPackage(event)}>Add new Package</button>
                        <table className="table table-bordered">
                          <thead className="thead-light">
                            <tr>
                              {datacolumns && datacolumns.map(each_datarecord_key => 
                                <th key={each_datarecord_key} scope="col">{this.Capitalize(each_datarecord_key)}</th>
                              )}
                            </tr>
                          </thead>                            
                            <tbody> 
                              {loaded ? (
                                datarecords && (datarecords.map((each_datarecord, recordindex) =>
                                  <tr key={each_datarecord.uuid}>
                                  {this.displayRecords(recordindex)}
                                  </tr>
                                  ))
                              ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuildDynamicTable;