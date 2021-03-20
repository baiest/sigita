import { Button, Form } from "react-bootstrap";
import { Component } from "react";
import { GoogleLogin } from "react-google-login";
import './Login.css';

const clientId = '152237555650-4gd9i3tvp8jl0p7h1sm0avejj135ljoj.apps.googleusercontent.com'

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
}
const onSuccess = (res) =>{
    console.log('[Login success] currentUser:', res.profileObj);
    requestOptions.body = JSON.stringify({ user: res.profileObj});
    fetch('/api/login', requestOptions)
        .then((api_res)=> api_res.body.user != null ? console.log('Algo fallo') : console.log('Logueado'));
}

const onFailure = (res) => {
    console.log('[Login failed] res:', res);
}
class Login extends Component {
    render() {
        return (
        <div id="tarjeta" className="card">
            <span className="card-head display-4"><strong>Login</strong></span>
            <Form className="card-body">
                <Form.Group>
                    <Form.Control type="text" placeholder="Usuario"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Contraseña"/>
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

export default Login;