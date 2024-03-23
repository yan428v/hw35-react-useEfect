import React, {useEffect, useState} from 'react';
import styles from '../css/farGalaxy.module.css';

const StarWars = () => {
    const [starWarsInfo, setStarWarsInfo] = useState("")

    useEffect(() => {
        const data = sessionStorage.getItem("opening_crawl");
        setStarWarsInfo(data);
    }, []);

        return (
            <div className={styles.farGalaxy}>
                {starWarsInfo}
            </div>
        );
}

export default StarWars;

