import React, { useEffect, useState} from 'react';

function Settings(props){
    
    const [boatList,setBoatList] = useState(props.boats.map(a=>({...a})));
    const [text,setText] = useState("");
    
    useEffect(() => {
        console.log(" effect triggered");
    });

    function updateValue(target,index){
        const id = target.target.id;
        const value = target.target.value
        const newBoatList = boatList.slice();
        if(id.includes("Name")){
            newBoatList[index].name = value;
        }else if(id.includes("Size")){
            newBoatList[index].size = Number.parseInt(value);
        }
        colorButtonSave();
        setBoatList(newBoatList);
        setText(id + " modifié");
    }

    function colorButtonSave(){
        var buttonSave = document.getElementById("buttonSaveBoats");
        if(buttonSave.style["background-color"] !== "lightGreen")
            buttonSave.style["background-color"] = "lightGreen";
    }
    function addBoat(){
        setBoatList([
            ...boatList,
            {
                name:"default",
                size:1,
            }
        ])
        colorButtonSave();
        setText("Bateau ajouté");
    }

    function deleteBoat(index){
        setBoatList(
            boatList.filter((boat,i) => {
                return i!==index;
            })
        );
        colorButtonSave();
        setText("bateau supprimé");
    }
    
    const listBoat = boatList.map((boat,index) =>
        {
            const idName = "inputName_"+index;
            const idSize = "inputSize_"+index;
            return(
                <li key={index}>
                    <label htmlFor={idName}>Nom : </label>
                    <input 
                        id={idName} 
                        name={idName}
                        onChange={(target)=>updateValue(target,index)} 
                        type="text" 
                        defaultValue={boat.name}></input>
                    <br/>
                    <label htmlFor={idSize}>Taille : </label>
                    <input 
                        id={idSize}
                        nae={idSize}
                        onChange={(target)=>updateValue(target,index)} 
                        type="number" 
                        defaultValue={boat.size}></input>
                    <button onClick={() => deleteBoat(index)}>Delete</button>
                </li>
            )
        }   
    )

    return(
        <div className='settings'>
            <h2>Settings</h2>
            <ul>
                {listBoat}
            </ul>
            <button id="addBoatButton" onClick={() => addBoat()} >Add</button>
            <button id='buttonSaveBoats' onClick={() => props.onClick(boatList)} >Save</button><br />
            {text}
        </div>
    )
}

export default Settings;