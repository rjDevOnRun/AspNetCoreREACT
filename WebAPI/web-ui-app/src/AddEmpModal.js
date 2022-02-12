import React, {Component} from "react";
import {Modal, Button, Row, Col, Form, ModalTitle, Image} from 'react-bootstrap';
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]}; // var for dept dropdown values
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    // defaults for handling photos
    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API + 'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                employeeName:event.target.EmployeeName.value,
                department:event.target.Department.value,
                dateOfJoining:event.target.DateOfJoining.value,
                photoFileName:this.photofilename
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result.toString());
        })
        .catch(error =>{
            alert('Failed : ' + error.toString() );
        })
    }

    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed!');
        })

    }

    render(){
        return(
            <div className="container">
                <Modal {...this.props} size="lg" 
                aria-labelledby="contained-model-title-vcenter" centered>
                    <ModalHeader closeButton>
                        <ModalTitle id="contained-modal-title-vcenter">
                            Add Employee
                        </ModalTitle>
                    </ModalHeader>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control type="text" 
                                        name="EmployeeName" 
                                        required
                                        placeholder="Employee Name"/>
                                    </Form.Group>

                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep=>
                                                <option key={dep.departmentId}>
                                                    {dep.departmentName}
                                                </option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>Date of Joining</Form.Label>
                                       <Form.Control
                                       type="date" required
                                       name="DateOfJoining" placeholder="DateofJoining"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary mt-2" type="submit">
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.imagesrc}/>
                                <input onChange={this.handleFileSelected} type="File"/>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}