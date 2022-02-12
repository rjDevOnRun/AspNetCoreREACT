import React, {Component} from "react";
import {Modal, Button, Row, Col, Form, ModalTitle} from 'react-bootstrap';
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export class AddDepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'department',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                departmentId:null,
                departmentName:event.target.DepartmentName.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            alert(result.toString());
        })
        .catch(error =>{
            alert('Failed : ' + error.toString() );
        })
    }

    render(){
        return(
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-model-title-vcenter" centered>
                    <ModalHeader closeButton>
                        <ModalTitle id="contained-modal-title-vcenter">
                            Add Department
                        </ModalTitle>
                    </ModalHeader>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control type="text" 
                                        name="DepartmentName" 
                                        required
                                        placeholder="Department Name"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary mt-2" type="submit">
                                            Add Department
                                        </Button>
                                    </Form.Group>
                                </Form>
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