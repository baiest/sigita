import { Button, Form } from "react-bootstrap";
import { Component } from "react";
import { GoogleLogin } from "react-google-login";
import axios from 'axios';
import './Login.css';

// Borrar esto al desplegar
const clientId = '152237555650-4gd9i3tvp8jl0p7h1sm0avejj135ljoj.apps.googleusercontent.com'

// Funciones para autenticacion con Google
const onSuccess = (res) =>{
    console.log('[Login success] currentUser:', res.profileObj);
    axios.post('/api/login', res.profileObj)
        .then((api_res)=> {
            if(api_res.data.session){
                window.localStorage.setItem('token', api_res.data.token);
                window.location = '/';
            }else{
                console.log('Algo salio mal');
            }
        })
        .catch((api_err) => console.log("Hubo un error: ", api_err));
}

const onFailure = (res) => {
    console.log('[Login failed] res:', res);
}

//Funciones para autenticacion
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        }
        
        this.enviarDatos = this.enviarDatos.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    
    updateState(event){
        let { id, value } = event.target;
        let objeto = {};
        objeto[id] = value
        this.setState(objeto)
        if (this.state.username.includes(' ')){
            this.setState({error: 'Username invalido'})
        }else{
            this.setState({error: ''})
        }

        console.log(this.state.error)
    }

    enviarDatos(event){
        event.preventDefault();
        let form = event.currentTarget;
        delete this.state.error;

        axios.post('/api/login', this.state)
            .then((api_res) => {
                                
                if(api_res.data.session){
                
                    form.username.value = '';
                    form.password.value = '';
                    window.localStorage.setItem('token', api_res.data.token);
                    this.props.history.push('/');
                }else{
                    this.setState({error: api_res.data.error});
                }
            })
            .catch(api_err => {
                console.log("Hubo un error: ", api_err);
            });
    }

    render() {
        return (
        <div id="tarjeta" className="card">
            <span className="card-head display-4"><strong>Login</strong></span>
            <Form className="card-body" onSubmit={ this.enviarDatos }>
                <p id="error" className={`alert alert-danger ${this.state.error === '' ? 'd-none' : '' }`}>{this.state.error}</p>
                <Form.Group>
                    <Form.Control required id="username" type="text" placeholder="Usuario" onChange={ this.updateState }/>
                </Form.Group>
                <Form.Group>
                    <Form.Control required id="password" type="password" placeholder="Contraseña" onChange={ this.updateState }/>
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