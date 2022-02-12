import React, {Component} from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddDepModal } from "./AddDepModal";
import { EditDepModal } from "./EditDepModal";

export class Department extends Component{

    constructor(props){
        /* allows constructor's of components to be called*/
        /* define our variables inside the state object 
            deps: is our variable to store department data
            addModelShow: variable to show/hide AddDepModal comp
        */
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
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
        fetch(process.env.REACT_APP_API+'department') /* get data from api */
        .then(response=>response.json()) /* convert data to json */
        .then(data=>{
            this.setState({deps:data});/* update data to variable */
        });
    }

    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'department/'+depid,{
                method:'DELETE',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render(){
        const {deps, depid, depname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Department Id</th>
                            <th>Department Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr  key={dep.departmentId}>
                                    <td>{dep.departmentId}</td>
                                    <td>{dep.departmentName}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="m-1" variant="info"
                                                onClick={() => this.setState({editModalShow:true,
                                                depid:dep.departmentId, depname:dep.departmentName})}>
                                                Edit </Button>

                                                <Button className="m-1" variant="danger"
                                                onClick={() => this.deleteDep(dep.departmentId)}>
                                                Delete </Button>

                                            <EditDepModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            depid={depid} depname={depname}/>
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary' 
                    onClick={() => this.setState({addModalShow:true})}>
                        Add Department
                    </Button>

                    <AddDepModal 
                    show={this.state.addModalShow} 
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}