import { getProduct, updateProduct, deleteProduct } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export function EditProduct() {
    const [productImage, setProductImage] = useState(null);
    const [product, setProduct] = useState({});
    const [imageFile, setImageFile] = useState(null);

    let params = useParams();
    let id = params.id;
    let navigate = useNavigate();
    const MAX_FILE_SIZE = 15000000
    const inputFile = useRef(null)

    useEffect(() => {
        async function loadProduct() {
            let data = await getProduct(id);
            setProduct(data);
        }
        loadProduct();
    }, [id]);

    async function handleDelete() {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            await deleteProduct(id);
            navigate("/catalog"); 
        }
    }

    async function handleSave(e) {
        e.preventDefault();
    
        let updatedProduct = {
            name: product.name,
            description: product.description,
            ingredients: product.ingredients,
            manufacturer: product.manufacturer, 
            price: product.price,
        };
    
        // Додаємо зображення тільки якщо воно змінилось
        if (imageFile) {
            updatedProduct.file = imageFile; 
        }
    
        try {
            await updateProduct(id, updatedProduct); 
            alert("Product updated successfully!");
            navigate("/catalog");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product. Please try again.");
        }
    }
    

    function handleChange(e) {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        const fileExtention = file.name.substring(file.name.lastIndexOf("."))
        
        if (fileExtention != ".jpg" && fileExtention != ".png" && fileExtention != ".jpeg") {
            alert("Files must be jpg, jpeg or png")
            inputFile.current.value = ""
            inputFile.current,type = "file"
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            alert("File size exceeds the limit (15 Mb)")
            inputFile.current.value = ""
            inputFile.current,type = "file"
            return
        }

        setImageFile(file); 

        const reader = new FileReader();
        reader.onload = () => {
            setProductImage(reader.result); // Оновлюємо попередній перегляд зображення
        };

        reader.readAsDataURL(file);     
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src={productImage || product.image?.data}
                    alt={product.name}
                    style={{
                        borderRadius: "15px",
                        width: "200px",
                        height: "auto",
                        marginRight: "20px",
                    }}
                />
                <div>
                    <input
                        type="text"
                        name="name"
                        value={product.name || ""}
                        onChange={handleChange}
                        style={{ fontSize: "1.5em", marginBottom: "10px", width: "100%" }}
                    />
                    <textarea
                        name="description"
                        value={product.description || ""}
                        onChange={handleChange}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />
                    <input
                        type="text"
                        name="ingredients"
                        value={product.ingredients || ""}
                        onChange={handleChange}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />
                    <input
                        type="text"
                        name="manufacturer"
                        value={product.manufacturer || ""}
                        onChange={handleChange}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />
                    <input
                        type="number"
                        name="price"
                        value={product.price || ""}
                        onChange={handleChange}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />
                    <label style={{ marginBottom: "5px", display: "block", fontWeight: "bold" }}>
                        Upload an image (e.g., product photo):
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={inputFile}
                        style={{ marginBottom: "10px" }}
                    />
                </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                <button
                    onClick={handleSave}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Save Changes
                </button>
                <button
                    onClick={handleDelete}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Delete Product
                </button>
            </div>
        </>
    );
}
