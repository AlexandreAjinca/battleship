import React, {Component} from 'react';

class Boats extends Component{

    render(){
        const boatList = this.props.boatList.map((boat,index) =>
        {
            const buttonSelect= (boat.placed)?
             'Placé' : (boat === this.props.selectedBoat)?
             'Sélectionné': 
             <button onClick={() => this.props.onClick(index)}>Sélectionner</button>;

            return (
                <tr key={index}>
                    <td>{boat.name}</td>
                    <td>{boat.size}</td>
                    <td>{buttonSelect}</td>
                </tr>
            )
        });
        return(
            <div className='divBoats'>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Taille</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {boatList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Boats;