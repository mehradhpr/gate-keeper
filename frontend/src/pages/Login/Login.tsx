import {useState} from "react";

function Login(): JSX.Element {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');
        setLoading(true);

    }
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <label>Password</label><br/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                {error && <div>{error}</div>}
                <button type="submit">{loading ? 'Logging in....' : 'Login'}</button>
            </form>
        </div>
    )
}

export default Login;