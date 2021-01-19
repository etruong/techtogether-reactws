import React from 'react';

export function Critterpedia(props) {
    const [loading, setLoading] = React.useState(false);
    const [critterImg, setCritterImg] = React.useState("");

    const fetchCritter = async () => {
        setLoading(true);
        let critterType = "fish";
        if (Math.round(Math.random()) === 1) {
            critterType = "bugs";
        }
        const randomId = Math.round(Math.random() * 50) + 1;
        const caughtCritter = await fetch('https://acnhapi.com/v1/' + critterType + '/' + randomId)
            .then((data) => {
                return data.json()
            })
            .catch((e) => {
                console.log(e);
            })
            .then((data) => {
                setLoading(false);
                return data;
            });
        props.setCritter(caughtCritter.name["name-USen"]);
        setCritterImg(caughtCritter["image_uri"]);
    }
    const critterStyle = critterImg ? {
        backgroundImage: `url('${critterImg}')`
    } : {};

    return <div className="critter-container">
        <p className="bold">Critterpedia</p>
        <div className={"critter " + (loading ? "hidden" : "")} style={critterStyle}>&nbsp;</div>
        <LoadSpinner loading={loading} />
        <button id="critter-btn" onClick={fetchCritter}>Show me a critter</button>
    </div>;
}

function LoadSpinner(props) {
    return <div className={"loading " + (props.loading ? "" : "hidden")}>&nbsp;</div>;
}