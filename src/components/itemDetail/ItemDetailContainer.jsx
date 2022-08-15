import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import './itemDetailContainer.scss';
import ItemDetail from "./ItemDetail";
import Spinner from "../spinnerLoading/Spinner";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const ItemDetailContainer = () => {
    let [itemDetail, setItemDetail] = useState({});
    const { id } = useParams();
    let [loading, setLoading] = useState(true);

    const db = getFirestore();
    const itemsCollection = collection(db, "items");


    useEffect(() => {
        getDocs(itemsCollection).then((snapshot) => {
            const data = snapshot.docs.map(doc => (
                { id: doc.id, ...doc.data() }
            ));
            const foundItem = data.filter(item => item.id === id);
            setItemDetail(foundItem[0]);
        })
            .finally(() => {
                setLoading(false)
            })
    }, []);

    return loading ? <Spinner /> :
        <ItemDetail item={itemDetail} />
}

export default ItemDetailContainer;