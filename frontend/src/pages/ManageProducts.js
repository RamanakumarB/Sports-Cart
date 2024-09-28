// src/pages/ManageProducts.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });
    const [editProduct, setEditProduct] = useState(null); // State for editing a product
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/admin/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) throw new Error('Failed to add product');
            const data = await response.json();
            setProducts((prev) => [...prev, { ...newProduct, id: data.id }]); // Update products state
            closeModal(); // Close modal after adding product
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete product');
            setProducts(products.filter((product) => product.id !== id)); // Update state after deletion
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditProduct = (product) => {
        setEditProduct(product); // Populate the edit form with the selected product
        setNewProduct({ ...product }); // Set newProduct state to the product to edit
        setIsModalOpen(true); // Open modal for editing
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/products/${editProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct), // Send updated product data
            });
            if (!response.ok) throw new Error('Failed to update product');
            const updatedProduct = await response.json();
            setProducts((prev) => prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))); // Update product in state
            closeModal(); // Close modal after updating
        } catch (err) {
            setError(err.message);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditProduct(null); // Reset edit state
        setNewProduct({ name: '', price: '', description: '', image: '' }); // Reset form
    };

    if (loading) {
        return <p>Loading products...</p>; // Loading message
    }

    return (
        <div>
            <h2>Manage Products</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={() => setIsModalOpen(true)}>Add Product</button> {/* Button to open modal */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                <h2>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        required
                    />
                    <button type="submit">{editProduct ? 'Update Product' : 'Add Product'}</button>
                    <button type="button" onClick={closeModal}>Cancel</button> {/* Cancel button */}
                </form>
            </Modal>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleEditProduct(product)}>Edit</button> {/* Edit button */}
                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button> {/* Delete button */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProducts;
