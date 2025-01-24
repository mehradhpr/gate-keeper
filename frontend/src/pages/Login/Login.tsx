import {useState} from "react";
import styles from './Login.module.css'

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
        <div className={styles.login}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                {error && <div>{error}</div>}
                <button type="submit">{loading ? 'Logging in....' : 'Login'}</button>
            </form>
        </div>
    )
}

export default Login;