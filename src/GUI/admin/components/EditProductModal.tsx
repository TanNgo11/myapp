import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import DragFileAndPreview, { ImageType } from './DragFileAndPreview';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { getCategories, getProductsById, updateProduct } from '../../../api/ProductApi';
import { toast } from 'react-toastify';
import { Category, Product, ProductStatus, UpdateProductRequest, UpdateProductRequestSchema } from '../../../models/Product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

type EditProductModalProps = {
    isShow: boolean;
    onHide: () => void;
    productId: number;
    onProductUpdate: () => void;
};

function EditProductModal({ isShow, onHide, productId, onProductUpdate }: EditProductModalProps) {
    const [imageProduct, setImageProduct] = useState<ImageType | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [productStatus, setProductStatus] = useState<ProductStatus[]>([ProductStatus.ACTIVE, ProductStatus.INACTIVE]);
    const [isLoading, setIsLoading] = useState(false);
    const { control, register, handleSubmit, reset, formState: { errors }, setValue } = useForm<UpdateProductRequest>({
        mode: 'all',
        resolver: zodResolver(UpdateProductRequestSchema),
        defaultValues: {
            id: 0,
            name: '',
            price: 0,
            salePrice: 0,
            description: '',
            categoryId: 0,
            quantity: 0,
            productStatus: ProductStatus.INACTIVE,
        }
    });

    useEffect(() => {
        if (isShow && productId) {
            fetchProductData(productId);
        } else {
            resetFormState();
        }
    }, [isShow, productId]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchProductData = async (id: number) => {
        setIsLoading(true);
        try {
            const response = await getProductsById(id);
            const product = response.result;
            setEditProduct(product);
            setImageProduct({ name: product.image, url: product.image });
        } catch (error) {
            toast.error('Error fetching product.');
            console.error('Error fetching product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.result);
        } catch (error) {
            toast.error('Error fetching categories.');
            console.error('Error fetching categories:', error);
        }
    };

    const setEditProduct = (product: Product) => {
        setValue('id', product.id);
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('salePrice', product.salePrice);
        setValue('description', product.description);
        setValue('categoryId', product.category?.id || 0);
        setValue('quantity', product.quantity);
        setValue('productStatus', product.productStatus);
    };

    const resetFormState = () => {
        reset();
        setSelectedFile(null);
        setImageProduct(null);
    };

    const handleClose = () => {
        resetFormState();
        onHide();
    };

    const onSubmit = async (data: UpdateProductRequest) => {

        const formData = new FormData();
        formData.append('product', JSON.stringify(data));
        if (selectedFile)
            formData.append('file', selectedFile);

        setIsLoading(true);
        try {
            await updateProduct(formData);
            toast.success('Product updated successfully!');
            resetFormState();
            onProductUpdate();
            onHide();
        } catch (error) {
            toast.error('Error updating product.');
            console.error('Error updating product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal size="xl" show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit the Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label htmlFor="productName" className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    {...register("name")}
                                    required
                                />
                                {errors.name && <div className="text-danger small">{errors.name.message}</div>}
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="productCategory" className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    id="productCategory"
                                    {...register("categoryId", {
                                        setValueAs: value => parseInt(value) || 0
                                    })}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.categoryId && <div className="text-danger small">{errors.categoryId.message}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label htmlFor="productPrice" className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="productPrice"
                                    {...register("price", {
                                        setValueAs: value => parseInt(value) || 0
                                    })}
                                    required
                                />
                                {errors.price && <div className="text-danger small">{errors.price.message}</div>}
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="productSalePrice" className="form-label">Sale Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="productSalePrice"
                                    {...register("salePrice", {
                                        setValueAs: value => parseInt(value) || 0
                                    })}
                                    required
                                />
                                {errors.salePrice && <div className="text-danger small">{errors.salePrice.message}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label htmlFor="productQuantity" className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="productQuantity"
                                    {...register("quantity", {
                                        setValueAs: value => parseInt(value) || 0
                                    })}
                                    required
                                />
                                {errors.quantity && <div className="text-danger small">{errors.quantity.message}</div>}
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="productStatus" className="form-label">Status</label>
                                <select
                                    className="form-select"
                                    id="productStatus"
                                    {...register("productStatus")}
                                >
                                    {productStatus.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                {errors.productStatus && <div className="text-danger small">{errors.productStatus.message}</div>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productDescription" className="form-label">Description</label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={field.value}
                                        onChange={(_, editor) => {
                                            const data = editor.getData();
                                            field.onChange(data);
                                        }}
                                    />
                                )}
                            />
                            {errors.description && <div className="text-danger small">{errors.description.message}</div>}
                        </div>
                        <div className="mb-3">
                            <DragFileAndPreview
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                                initialImages={imageProduct ? [imageProduct] : []}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        {isLoading && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 10
                            }}>
                                <ReactLoading type="spin" color="#ffebcd" height={'10%'} width={'10%'} />
                            </div>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditProductModal;
