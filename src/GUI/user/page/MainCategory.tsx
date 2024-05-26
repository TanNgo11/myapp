import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Product, ProductType } from '../../../models/Product';
import { getProductsByCategory } from '../../../api/ProductApi';
import UseFetch from '../../../api/UseFetchList';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import { set } from 'lodash';
import { getAllCategories, countProductsInCategory } from '../../../api/CategoryApi';
import { NavLink } from 'react-router-dom';

const MainCategory = () => {
    const { categoryName } = useParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ProductType[]>([ProductType.All, ProductType.Fruits, ProductType.Vegetables]);
    const [countProducts, setCountProducts] = useState<Map<string, number>>(new Map());
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 2;


    useEffect(() => {
        const getProductsBycategoy = async () => {
            const response = await getProductsByCategory(categoryName ?? '');
            setProducts(response.result);
        }
        getProductsBycategoy();
    }, [categoryName]);


    useEffect(() => {
        const getCountProductsInCategory = async () => {
            for (let category of categories) {
                const response = await countProductsInCategory(category);
                setCountProducts(prevCountProducts => new Map(prevCountProducts).set(category, response.result));
            }
        }

        getCountProductsInCategory();
    }, []);





    const filteredAndSortedProducts = useMemo(() => {
        let filteredProducts = products;


        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterOption) {
            filteredProducts = filteredProducts.filter(product => {
                // if (filterOption === 'organic') {
                //     return product.isOrganic; // Assuming there's a boolean 'isOrganic' field
                // }

                return true;
            });
        }

        // Sort products
        // if (sortOption) {
        //     filteredProducts.sort((a, b) => {
        //         if (sortOption === 'popularity') {
        //             return b.popularity - a.popularity; // Assuming there's a 'popularity' field
        //         }
        //         // Add more sorting conditions as necessary
        //         return 0;
        //     });
        // }

        return filteredProducts;
    }, [products, searchTerm, sortOption, filterOption]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredAndSortedProducts.slice(startIndex, endIndex);
    }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };





    return (
        <>
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Fresh fruits shop</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input type="search" className="form-control p-3" placeholder="keywords"
                                            aria-describedby="search-icon-1" />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                    </div>
                                </div>
                                <div className="col-6"></div>
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits">Default Sorting:</label>
                                        <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                                            <option >Nothing</option>
                                            <option >Popularity</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Categories</h4>
                                                <ul className="list-unstyled fruite-categorie">

                                                    {categories.map((category) => (
                                                        <li key={category}>
                                                            <div className="d-flex justify-content-between fruite-name">
                                                                <NavLink to={`/category/${category}`}><i className="fas fa-apple-alt me-2"></i>{category}</NavLink>
                                                                <span>({countProducts.get(category)})</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4 className="mb-2">Price</h4>
                                                <input type="range" className="form-range w-100" id="rangeInput" name="rangeInput" min="0" max="500" />
                                                <output htmlFor="rangeInput" id="amount" name="amount"></output>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Additional</h4>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-1" name="Categories-1" />
                                                    <label htmlFor="Categories-1"> Organic</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-2" name="Categories-1" />
                                                    <label htmlFor="Categories-2"> Fresh</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-3" name="Categories-1" />
                                                    <label htmlFor="Categories-3"> Sales</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 className="mb-3">Featured products</h4>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <div className="rounded me-4" style={{ width: '100px', height: '100px' }}>
                                                    <img src="/user-assets/assets/featur-1.jpg" className="img-fluid rounded" alt="" />
                                                </div>
                                                <div>
                                                    <h6 className="mb-2">Big Banana</h6>
                                                    <div className="d-flex mb-2">
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star text-secondary"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                    <div className="d-flex mb-2">
                                                        <h5 className="fw-bold me-2">$2.99</h5>
                                                        <h5 className="text-danger text-decoration-line-through">$4.11</h5>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center my-4">
                                                <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">View More</a>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="position-relative">
                                                <img src="/user-assets/assets/banner-fruits.jpg" className="img-fluid w-100 rounded" alt="" />
                                                <div className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                                    <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center">

                                        {paginatedProducts.map((product => <ProductCard key={product.id} {...product} />))}

                                    </div>
                                    <div className="col-12">
                                        <div className="pagination d-flex justify-content-center mt-5">

                                            {totalPages && totalPages > 1 && Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                                <a key={pageNumber}
                                                    onClick={() => handlePageChange(pageNumber)}
                                                    className={`rounded ${pageNumber === currentPage ? 'active' : ''}`}>{pageNumber}</a>
                                            ))}
                                            {/* <a href="#" className="rounded">&laquo;</a>
                                            <a href="#" className="active rounded">1</a> */}

                                        </div>
                                    </div>
                                </div>





                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MainCategory
