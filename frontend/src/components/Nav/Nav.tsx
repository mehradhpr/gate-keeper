function Nav(): JSX.Element {
    return (
        <div>
        <h1>Nav</h1>
        <ul>
            <a href="/"><li>Home</li></a>
            <a href="login"><li>Login</li></a>
            <a href="register"><li>Register</li></a>
        </ul>
        </div>
    )
}

export default Nav;