import styles from './Home.module.css'

function Home(): JSX.Element {
    return (
        <div className={styles.home}>
        <h1>Gate Keeper</h1>
        <h2>Guest - Not Logged In</h2>
        </div>
    )
}

export default Home