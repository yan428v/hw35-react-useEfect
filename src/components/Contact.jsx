import React, {useEffect, useState} from 'react';
import {base_url, period_month} from "../utils/constants.jsx";

const Contact = () => {
    const [planets, setPlanets] = useState([])
    async function fillPlanets(url) {
        const response = await fetch(url);
        const json = await response.json();
        const planets = json.map(item => item.name);
        setPlanets(planets);

        const info = {
            payload: planets,
            time: Date.now()
        }
        localStorage.setItem('planets', JSON.stringify(info));
    }

    useEffect(() => {
        const planetsInfo = JSON.parse(localStorage.getItem("planets"));

        if (planetsInfo && ((Date.now() - planetsInfo.time) < period_month)) {
            setPlanets(planetsInfo.payload);
            console.log(planetsInfo.payload)
        }
        else {
            fillPlanets(`${base_url}/v1/planets`);
        }

        return () => {
            console.log("Contact Unmount");
        }
    }, []);

        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>First Name:
                        <input type='text' name='firstName'/>
                    </label>
                    <label>Planet
                        <select name='planet'>
                            {planets.map((item, index) =>
                                <option value={item} key={index}>{item}</option>
                            )}
                        </select>
                    </label>
                    <label>Text
                        <textarea name="text"/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
}

export default Contact;