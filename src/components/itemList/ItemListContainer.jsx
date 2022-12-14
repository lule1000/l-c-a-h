import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import Spinner from '../Spinner';
import SelectCategories from './selectCategories';
import './itemListContainer.scss';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const ItemListContainer = ({ dark }) => {
    const { name } = useParams();
    const [dataItems, setItems] = useState([]);
    const [filterData, setFilterData] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        setSearch(e.target.value);
        filtrarBusqueda(e.target.value);
    }

    const filtrarBusqueda = (terminoBusqueda) => {
        let resultado = filterData.filter((e) => {
            if (e.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return e;
            }
        })
        setItems(resultado)
    }

    useEffect(() => {
        const db = getFirestore();
        const itemsCollection = collection(db, "items");

        if (name) {
            const queryFilter = query(
                itemsCollection,
                where('category', '==', name)
            )
            getDocs(queryFilter)
                .then(snapshot => {
                    setItems(snapshot.docs.map(product => ({
                        id: product.id, ...product.data()
                    })));
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false)
                });
        } else {
            getDocs(itemsCollection)
                .then(snapshot => {
                    setItems(snapshot.docs.map(product => ({
                        id: product.id, ...product.data()
                    })));
                    setFilterData(snapshot.docs.map(product => ({
                        id: product.id, ...product.data()
                    })))
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false)
                });
        }
    }, [name]);

    return loading ? <Spinner /> :
        <>
            <div className='d-flex justify-content-center align-items-center p-2 mt-3'>
                <SelectCategories dark={dark} />
                <form className="d-flex w-25" role="search">
                    <input className="form-control" onInput={handleChange} value={search} type="search" placeholder="Search..." aria-label="Search" />
                </form>
            </div>
            <main className='d-flex ms-4 flex-direction-row justify-content-center d-flex flex-wrap'>
                <ItemList items={dataItems} dark={dark} />
            </main>
        </>
}

export default ItemListContainer;