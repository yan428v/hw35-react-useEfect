import React, {useEffect, useState} from 'react';
import {base_url} from "../utils/constants.jsx";
import "../css/aboutMe.css"


const AboutMe = () => {
    const [hero, setHero] = useState();

    async function fetchHero() {
        const response = await fetch(`${base_url}/v1/peoples/1`)
            const data = await response.json();
            const hero = {
                    name: data.name,
                    height: data.height,
                    id: data.id,
                    birth_year: data.birth_year,
                    eye_color: data.eye_color,
                    gender: data.gender,
                    mass: data.mass
                }
                setHero(hero);
                localStorage.setItem("hero", JSON.stringify({hero, creationTime: new Date().getTime()}))
    }

    useEffect(() => {
        const heroStorage = localStorage.getItem("hero");
        const currentTime = new Date().getTime();

        if (heroStorage) {
            const {hero, creationTime} = JSON.parse(heroStorage);
            if(currentTime - creationTime < 1000 * 60 * 60 * 24 * 30) {
                setHero(hero);
            }
            else{
                fetchHero()
            }
        }
        else {
            fetchHero()
        }

        return () => {
            console.log("About Me unmount");
        }
    }, []);

    return (
        <div>
            {(hero) &&
                <div className={"farGalaxy hero_box"}>
                    <p><span className={"hero_text"}>Name:</span>{hero.name}</p>
                    <p><span className={"hero_text"}>Id:</span>{hero.id}</p>
                    <p><span className={"hero_text"}>Height:</span> {hero.height}</p>
                    <p><span className={"hero_text"}>Birth Year:</span> {hero.birth_year}</p>
                    <p><span className={"hero_text"}>Eye color:</span> {hero.eye_color}</p>
                    <p><span className={"hero_text"}>Gender:</span> {hero.gender}</p>
                    <p><span className={"hero_text"}>Mass:</span> {hero.mass}</p>
                </div>
            }
        </div>
    );
}

export default AboutMe;