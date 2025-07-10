import { useState } from "react";
import { Container, Button,Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch ('http://localhost:8000/api/login',{
                method: 'POST',
                headers:{
                    'content-Type':'application/json'
                },
                body:JSON.stringify({email, password})
            });
            const result = await response.json();
            if(response.status === 422){
                setErrors(result.errors || {});
                return;
            }
            
            if (!response.ok){
               setErrorMsg(result.message||"Login Gagal");
                return;
            }
            localStorage.setItem("token", result.token);
            navigate("/user");
        } catch (error) {
            console.log(error);
            setErrorMsg("Database error, gagal terhubung ke server");
        }
    };

    return (
    <Container className="mt-5">
     <h3>Login</h3>
     {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
     <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value);}} isInvalid={!!errors.email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value); }} isInvalid={!!errors.password} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
     </Form>
</Container>
    )
}

export default Login;