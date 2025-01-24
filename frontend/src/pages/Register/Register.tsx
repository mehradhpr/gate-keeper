import {useState} from "react";
import styles from './Register.module.css'

function Register(): JSX.Element {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');
        setLoading(true);

    }
    return (
        <div >
            <h1>Registeration Page</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>First Name</label><br/>
                <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/><br/>
                <label>Last Name</label><br/>
                <input type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/><br/>
                <label>Email</label><br/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <label>Password</label><br/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                <label>Re-enter Password</label><br/>
                <input type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)}/><br/>
                {error && <div>{error}</div>}
                <button type="submit">{loading ? 'Registering Account....' : 'Register'}</button>
            </form>
        </div>
    )
}

export default Register;