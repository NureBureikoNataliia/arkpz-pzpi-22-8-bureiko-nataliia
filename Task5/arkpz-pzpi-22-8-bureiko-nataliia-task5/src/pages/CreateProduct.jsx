import { useState, useRef } from "react"
import { createProduct } from "../api"

export function CreateProduct() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [manufacture, setManufacture] = useState("")
    const [price, setPrice] = useState("")
    const [file, setFile] = useState()

    const MAX_FILE_SIZE = 15000000

    const inputFile = useRef(null)

    async function handleSubmit(e) {
        e.preventDefault();
        let submitObject = {
            name: name,
            description: description,
            ingredients: ingredients,
            manufacturer: manufacture,
            price: price,
            file: file
        };

        try {
            await createProduct(submitObject);
            alert("Product created successfully!");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product. Please try again.");
        }
    }

    function handleFileUpload(e) {
        const file = e.target.files[0]
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

        setFile(file)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Product Name:
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    required
                    name="name"
                />
            </label>
            <label>
                Product Description:
                <input 
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={200}
                    required
                    name="description"
                />
            </label>
            <label>
                Ingredients:
                <input 
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    maxLength={300}
                    name="ingredients"
                />
            </label>
            <label>
                Manufacturer:
                <input 
                    type="text"
                    value={manufacture}
                    onChange={(e) => setManufacture(e.target.value)}
                    maxLength={100}
                    name="manufacturer"
                />
            </label>
            <label>
                Price:
                <input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min={0}
                    step="0.01"
                    name="price"
                />
            </label>
            <label>
                Insert Image:
                <input 
                    type="file"
                    onChange={handleFileUpload}
                    ref={inputFile}
                    name="file"
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}