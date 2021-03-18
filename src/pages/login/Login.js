import { Button, Form } from "react-bootstrap";
import { Component } from "react";
import './Login.css';

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
            </Form>
            
            <a href="#CorreoContraseña">¿Olvidaste tu contraseña?</a>
            <a href="#Terminos"><small>Terminos y condiciones</small></a>
        </div>
            );
    }
}

export default Login;