import styles from "./BoardStyle.module.css"

function TopBoard({shuffleCards}) {

    return ( 
        <div className={styles.topboard}>
            <h3>Welcome to MrJ's Card Flip Game</h3>
            <button onClick={shuffleCards}>New Game</button>
        </div>
    );
}

export default TopBoard;