import styles from './Nav.module.css'

function Nav(): JSX.Element {

    return (
        <div className={styles.nav} >
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="login">Login</a></li>
            <li><a href="register">Register</a></li>
        </ul>
        </div>
    )
}

export default Nav;