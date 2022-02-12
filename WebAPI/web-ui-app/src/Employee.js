import React, {Component} from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component{

    constructor(props){
        /* allows constructor's of components to be called*/
        /* define our variables inside the state object 
            emps: is our variable to store department data
            addModelShow: variable to show/hide AddDepModal comp
        */
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    /* component lifeCycle method (Mount) like onLoad funcs */
    /* call the refreshList method here */
    componentDidMount(){
        this.refreshList();
    }

    /* component lifeCycle method (Update) / any edits triggers this.. */
    componentDidUpdate(){
        this.refreshList();
    }

    /* function to retrieve data from API */
    refreshList(){
        fetch(process.env.REACT_APP_API+'employee') /* get data from api */
        .then(response=>response.json()) /* convert data to json */
        .then(data=>{
            this.setState({emps:data});/* update data to variable */
        });
    }

    deleteDep(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'employee/'+empid,{
                method:'DELETE',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render(){
        const {emps, empid, empname, depmt, photofilename, doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>DOJ</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr  key={emp.employeeId}>
                                    <td>{emp.employeeId}</td>
                                    <td>{emp.employeeName}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.dateOfJoining}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="m-1" variant="info"
                                                onClick={() => this.setState({editModalShow:true,
                                                empid:emp.employeeId, empname:emp.employeeName, 
                                                depmt:emp.department, photofilename:emp.photoFileName, 
                                                doj:emp.dateOfJoining})}>
                                                Edit </Button>

                                                <Button className="m-1" variant="danger"
                                                onClick={() => this.deleteDep(emp.employeeId)}>
                                                Delete </Button>

                                            <EditEmpModal show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                empid={empid} 
                                                empname={empname}
                                                depmt={depmt}
                                                photofilename={photofilename}
                                                doj={doj}
                                                />
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary' 
                    onClick={() => this.setState({addModalShow:true})}>
                        Add Employee
                    </Button>

                    <AddEmpModal 
                    show={this.state.addModalShow} 
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}