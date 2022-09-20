import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const SelectCategories = ({ dark }) => {
    const [navBarOptions, setNavBarOptions] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const itemsCollection = collection(db, "navBarOptions");
        const navOptionsDocumenst = getDocs(itemsCollection).then((snapshot) => {
            const data = snapshot.docs.map(doc => (
                { id: doc.id, ...doc.data() }));
            setNavBarOptions(data);
        })
    }, []);

    return (
        <div className="dropdown me-2">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {
                    navBarOptions.map(({route, category}) => (
                        <li key={category} ><Link to={route} className='text-decoration-none text-black p-2' >{category}</Link></li>
                    ))
                }
            </ul>
        </div>
    );
}

export default SelectCategories;