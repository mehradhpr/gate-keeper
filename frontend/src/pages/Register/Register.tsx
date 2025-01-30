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

        try {
            const response = await fetch("http://localhost:5011/auth/register", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                })
            });
            console.log(response);
        } catch (error) {
            console.log(error);
            setError(error)
        } finally {
            setLoading(false);
        }
        
        


    }
    return (
        <div className={styles.register}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label>Re-enter Password</label>
                <input type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
                {error && <div className="error">{error}</div>}
                <button type="submit">{loading ? 'Registering....' : 'Register'}</button>
            </form>
        </div>
    )
}

export default Register;