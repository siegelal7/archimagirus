import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

function ImageTextReader() {
    const [imageText, setImageText] = useState('');
    const [splitImageText,setSplitImageText]=useState([]);

    const handleImageUpload = (event) => {
        const imageFile = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        console.log(image);
        console.log('image above');
        Tesseract.recognize(image)
            .then((result) => {
                console.log('hmm');
                const split = result.data.text.split('|');
                setSplitImageText(split);
                // setImageText(result.data.text);
                console.log(result);
                // console.log(result.data.text);
                })
            .catch((err) => {
                console.error(err);
            });
        };

        reader.readAsDataURL(imageFile);
    };

    return (
    <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {/* {imageText && <div>{imageText}</div>} */}
        <ul>
            {splitImageText.map((x) => (
                <li key={x}>{x}</li>
            ))}
        </ul>
    </div>
    );
}

export default ImageTextReader;