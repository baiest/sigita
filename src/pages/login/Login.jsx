import { Button, Form } from "react-bootstrap";
import { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { Toast } from 'react-bootstrap';
import axios from 'axios';
import './Login.css';

// Borrar esto al desplegar
const clientId = '152237555650-4gd9i3tvp8jl0p7h1sm0avejj135ljoj.apps.googleusercontent.com'

const onSuccess = (res) =>{
    console.log('[Login success] currentUser:', res.profileObj);
    axios.post('/api/login', res.profileObj)
        .then((api_res)=> api_res.body.user != null ? console.log('Algo fallo') : console.log('Logueado'));
}

const onFailure = (res) => {
    console.log('[Login failed] res:', res);
}
export default class Login extends Component {
    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            username: '',
            password: ''
        }
        
        this.enviarDatos = this.enviarDatos.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    
    updateState(event){
        let { id, value } = event.target;
        let objeto = {};
        objeto[id] = value
        this.setState(objeto)
    }

    enviarDatos(event){
        event.preventDefault();
        let error_m = document.getElementById('error').classList;
        axios.post('/api/login', this.state)
            .then((api_res) => {
                if(api_res.data.session){
                    error_m.add('d-none');
                    event.target.username.value = ''
                    event.target.password.value = ''
                    console.log(api_res.data)
                }else{
                    this.setState({error: api_res.data.error})
                    error_m.remove('d-none');
                }
            })
            .catch(api_err => {
                console.log(api_err);
            });
    }

    render() {
        return (
        <div id="tarjeta" className="card">
            <span className="card-head display-4"><strong>Login</strong></span>
            <Form className="card-body" onSubmit={ this.enviarDatos }>
                <p id="error" className="alert alert-danger d-none">{this.state.error}</p>
                <Form.Group>
                    <Form.Control id="username" type="text" placeholder="Usuario" onChange={ this.updateState }/>
                </Form.Group>
                <Form.Group>
                    <Form.Control id="password" type="password" placeholder="Contraseña" onChange={ this.updateState }/>
                </Form.Group>
                <Form.Group>
                    <Button type="submit" variant="outline-warning" size="lg" block>Entrar</Button>
                </Form.Group>
                
                <Form.Group>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Entra con Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}  
                        cookiePolicy={'http://localhost:5000'}
                        isSignedIn={true}                  
                    />
                </Form.Group>
            </Form>


            <a href="#CorreoContraseña">¿Olvidaste tu contraseña?</a>
            <a href="#Terminos"><small>Terminos y condiciones</small></a>
        </div>
            );
    }
}