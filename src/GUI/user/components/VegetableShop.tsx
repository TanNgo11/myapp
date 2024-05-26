import React, { useCallback, useEffect, useState } from 'react'
import { Product, ProductType } from '../../../models/Product';
import UseFetch from '../../../api/UseFetchList';
import { getAllSalesProducts, getProductsByCategory } from '../../../api/ProductApi';
import ProductCard from './ProductCard';
import { Button } from '@mui/material';
import { green } from '@mui/material/colors';

const VegetableShop = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const [displayCount, setDisplayCount] = useState(4);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchSalesProducts = async () => {
            const response = await getAllSalesProducts();
            setFilteredProducts(response.result.slice(0, displayCount));
        }
        fetchSalesProducts();
    }, [displayCount]);


    const handleLoadMore = () => {
        const newDisplayCount = displayCount + 1;
        setDisplayCount(newDisplayCount);
    };


    return (
        <>
            <div className="container-fluid vesitable py-5 ">
                <div className="container py-5">
                    <h1 className="mb-3">Fresh Organic Vegetables</h1>
                    <div className="vegetable-carousel justify-content-center">
                        <div className='row'>
                            {filteredProducts.map((product => <ProductCard key={product.id} {...product} />))}
                        </div>
                    </div>

                    {(filteredProducts.length / displayCount) > 1 && <div className="text-end mt-3">

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