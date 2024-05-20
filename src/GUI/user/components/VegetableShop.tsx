import React, { useCallback, useEffect, useState } from 'react'
import { Product, ProductType } from '../../../models/Product';
import UseFetch from '../../../api/UseFetchList';
import { getProductsByCategory } from '../../../api/ProductApi';
import ProductCard from './ProductCard';
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';

const VegetableShop = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const [displayCount, setDisplayCount] = useState(4);

    const fetchProducts = useCallback(() => {
        return getProductsByCategory(ProductType.Vegetables);
    }, [ProductType.Vegetables]);

    const { data, loading, error } = UseFetch(fetchProducts);


    useEffect(() => {

        if (data) {
            setProducts(data.slice(0, displayCount));
        }
    }, [data, displayCount]);

    const handleLoadMore = () => {
        const newDisplayCount = displayCount + 4;
        setDisplayCount(newDisplayCount);
    };


    return (
        <>
            <div className="container-fluid vesitable py-5 ">
                <div className="container py-5">
                    <h1 className="mb-3">Fresh Organic Vegetables</h1>
                    <div className="vegetable-carousel justify-content-center">
                        <div className='row'>
                            {products.map((product => <ProductCard key={product.id} {...product} />))}
                        </div>
                    </div>
                    {products.length !== 0 && <div className="text-end mt-3">

                        <Button variant="contained"
                            color="success"
                            onClick={handleLoadMore}
                            sx={{ backgroundColor: green[500], color: 'white' }}>
                            Load More
                        </Button>

                    </div>}



                </div>



            </div>

        </>


    )
}

export default VegetableShop