import React from 'react';

const Card = ({title, text, click, buttonName, children, arg, date, status}) => {

    

    const clickHandler = () => {
        if (click)
            if(arg) 
                click(arg);
            else click();
    }

   

    return (
        <div className="card bg-light half rounded">
        <h3>{title}</h3>
        <p>{text}</p>
        <h6>{date}</h6>
        <h6>{status}</h6>
        {(buttonName || click)? 
            (<button onClick={clickHandler} className="btn btn-dark btn-sm">{buttonName}</button>) 
            : null}
        
        {children}
        </div>
    )
}

export default Card;