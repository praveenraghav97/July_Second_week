import React, { Component } from "react";
import UserService from '../services/UserService';


const initialState={
    name: "",
    email: "",
    mobilenumber: "",
    state: "",
    gender: "",
    skills: [],
    nameError:"",
    emailError:"",
    mobilenumberError:"",
}


class CreateUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state=initialState;
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeMobileNumberHandler = this.changeMobileNumberHandler.bind(this);
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.saveUser = this.saveUser.bind(this);
    }
    changeNameHandler = (e) => {
        this.setState({ name: e.target.value });
    };
    changeEmailHandler = (e) => {
        this.setState({ email: e.target.value });
    };
    changeMobileNumberHandler = (e) => {
        this.setState({ mobilenumber: e.target.value });
    };
    changeStateHandler = (e) => {
        this.setState({ state: e.target.value });
    };
    changeGenderHandler = (e) => {
        this.setState({ gender: e.target.value });
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const index = this.state.skills.indexOf(value);
        if (index > -1) {
            this.state.skills.splice(index, 1);
        }
        else {
            this.setState({
                skills: this.state.skills.concat([value])
                        });
        }
    }

    validate =()=>{
        let nameError="";
        let emailError="";
        let mobilenumberError="";
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        const validMobile = new RegExp('^([+]\\d{2})?\\d{10}$');
        if(!this.state.name){
            nameError="This field cannot be blank";
        }
        if(!validEmail.test(this.state.email)){
            emailError="Enter email in the format someone@something.domain";
        }
        if(!validMobile.test(this.state.mobilenumber)){
            mobilenumberError="Please enter 10 digit mobile number";
        }
        if(emailError || mobilenumberError || nameError){
            this.setState({emailError, mobilenumberError, nameError});
            return false
        }
        return true;
    };


    saveUser = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        let user = {
            name: this.state.name, email: this.state.email, mobilenumber: this.state.mobilenumber,
            state: this.state.state, gender: this.state.gender, skills: this.state.skills 
        };
        console.log('user =>' + JSON.stringify(user));
        
        if(isValid){
            UserService.createUser(user).then(res => {
                this.props.history.push('/users');
            });
        }


    }
    cancel() {
        this.props.history.push('/users');
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Registration Form</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            placeholder="Enter your name"
                                            name="name"
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.changeNameHandler}
                                        />
                                        <div style={{fontSize:12,color:"red"}}>
                                            {this.state.nameError}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            placeholder="Enter your email address"
                                            name="email"
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.changeEmailHandler}
                                        />
                                        <div style={{fontSize:12,color:"red"}}>
                                            {this.state.emailError}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Mobile Number</label>
                                        <input
                                            placeholder="Enter your 10 digit mobile number"
                                            name="mobilenumber"
                                            className="form-control"
                                            value={this.state.mobilenumber}
                                            onChange={this.changeMobileNumberHandler}
                                        />
                                        <div style={{fontSize:12,color:"red"}}>
                                            {this.state.mobilenumberError}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Select State </label>

                                        <select
                                            value={this.state.state}
                                            onChange={this.changeStateHandler}
                                        >
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharsahtra">Maharashtra</option>
                                            <option value="Uttrakhand">Uttrakhand</option>
                                        </select>
                                    </div>
                                    <div className="form-group" onChange={this.changeGenderHandler}>
                                        <label>Select Gender </label>
                                        <input type="radio" value="Male" name="gender" /> Male
                                        <input type="radio" value="Female" name="gender" /> Female
                                        <input type="radio" value="Other" name="gender" /> Other
                                    </div>
                                    <div className="form-group">
                                        <label>Select your Skills: </label>
                                        <input name="skills" type="checkbox"
                                            value="Java"
                                            onChange={this.handleInputChange} />Java
                                        <input name="skills" type="checkbox"
                                            value="SpringBoot"
                                            onChange={this.handleInputChange} />SpringBoot
                                        <input name="skills" type="checkbox"
                                            value="Mysql"
                                            onChange={this.handleInputChange} />MySQL
                                        <input name="skills" type="checkbox"
                                            value="ReactJS"
                                            onChange={this.handleInputChange} />ReactJS
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveUser}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUserComponent;
