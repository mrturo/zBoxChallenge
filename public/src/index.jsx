var LoginForm = React.createClass({
    render: function() {
        return <form method='post' name='loginform' action='/login'>
            <input type="text" name='username' placeholder='Nombre de Usuario' required /> <br />
            <input type="password" name='password' placeholder='Contraseña' required /> <br />
            <button id='login-button'>Login</button>
        </form>;
    }
});

ReactDOM.render(
    <LoginForm />,
    document.getElementById('container')
);