import React from 'react'
import BaseLoadingComponent from './BaseLoadingComponent'
import {Table} from 'react-bootstrap'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
class DynamicTable extends BaseLoadingComponent{
    constructor(props)
    {
        super(props)
        this.state = {
            ComponentFunction : this.GetComponentFunction(),
            Columns : props.Columns,
            Data : props.Data,
            PropertyAsKey : props.PropertyAsKey
        }
    }
    GetComponentFunction = () =>{
        return(
            <Table variant="light" striped bordered hover size='sm' className="col-lg-12 col-md-8 col-sm-4">
          {this.buildTable([{heading : 'ID'}, {heading:'Name'}, {heading : 'Medication'}, {heading : 'UsedLast'}], this.state.Medicals, '')}
          </Table>
        )
    }
    buildTable = () => {
        const columns = this.state.Columns;
        const data = this.state.Data
        const propertyAsKey = this.state.PropertyAsKey
        return (<>
        <thead>
              <tr>{columns.map(col => <th key={`header-${col.heading}`}>{col.heading === 'ID' ? '' : col.heading}</th>)}
              <th></th>
              <th></th>
              </tr>
          </thead>
          <tbody>
          <tr >
        {columns.map(col => <td key={`Add-${col.heading}`}>{col.heading !== 'ID' ?<input type="text"></input> :''}</td>)}
                      <td><button className="btn btn-primary"><i className="fa fa-plus"></i></button></td>
                      <td></td>
                  </tr>
              {data.map(item =>
                  <tr key={`${item[propertyAsKey]}-row`}>
                      {columns.map(col => <td key={`${item[propertyAsKey]}-${col.heading}`}>{item[col.heading]}</td>)}
                      <td><button className="btn btn-primary"><i className="fa fa-pencil-square-o"></i></button></td>
                      <td><button className="btn btn-danger"><i className="fa fa-trash"></i></button></td>
                  </tr>
              )}
          </tbody></>
        );
    };
    render(){
        return this.renderAllComponents()
        
          }
}
export default DynamicTable