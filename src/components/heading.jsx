import React, { useEffect, useState } from "react";
import { } from "react";
import { Card, Button } from "react-bootstrap";
function UserProfile() {
    const token = "33|UXQrUyY4vUB98jl9i3WeOMuLs7bHl9ngPEsAi4cS5530a7bf"; //diambil dari postman
    const [user, setUser] = useState(null);

    const fetchMe = async function () {
        if (!token) return;

        try {
            const response = await fetch("http://localhost:8000/api/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const userData = await response.json();
            console.log(userData)
            setUser(userData.data)
        } catch (error) {
            console.log(error);
            setUser(null)
        }
    };

    useEffect(function () {
        fetchMe();
    }, []);
    return (
        <Card>
            <Card.Header>UserProfile</Card.Header>
            <Card.Body>
                <Card.Title>Data Profile</Card.Title>
                <Card.Text>
                    <strong>Name :  {user?.name}</strong> <br />
                    <strong>Email : {user?.email}</strong>
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default UserProfile;