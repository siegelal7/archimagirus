import React, { useState, useEffect } from 'react';
import { createWorker } from "tesseract.js";

export default function ImageTextReader() {
    const [selectedImage, setSelectedImage] = useState(null)
    // const [ocrState, setOcrState] = useState(STATUSES.IDLE)
    const [ocrData, setOcrData] = useState('');
    const worker = createWorker({
        logger: m => console.log(m),
      });
    console.log('hmm')
    console.log(worker);
    
    const onReadOcrData = (ocrData) => {
        console.log(ocrData);
        setOcrData(ocrData);
      };
    // Process image with OCR
    const readImageText = async() => {
        // setOcrState(STATUSES.PENDING)
        console.log('function ran');
        try {
        await worker.load();
        console.log('heree');

        // Set the language to recognize
        await worker.loadLanguage("eng");
        await worker.initialize("eng");
        const { data: { text } } = await worker.recognize(selectedImage) ;
        await worker.terminate();
        
        onReadOcrData(text);
        // await worker.load();
        // console.log('heree');

        // // Set the language to recognize
        // await worker.loadLanguage("eng");
        // await worker.initialize("eng");
        // const { data: { text } } = await worker.recognize(selectedImage) ;
        // await worker.terminate();
        
        // onReadOcrData(text);
        // setOcrState(STATUSES.SUCCEEDED)
        } catch (err) {
            console.log(err);
        // setOcrState(STATUSES.FAILED)
        }
    }
    const handleRemoveClicked = () => {
        setSelectedImage(null);
        // onRemoveClicked();
        // setOcrState(STATUSES.IDLE);
      }

    return (
        <div>
          {/* {selectedImage && (
            <div>
              <img src={URL.createObjectURL(selectedImage)} alt="scanned file"  />
            </div>
          )} */}
          <div>
            {selectedImage?
              <div className="button-container">
                <button onClick={readImageText}>Process the image with OCR</button>
                <button
                  className="remove-button"
                  onClick={handleRemoveClicked}
                >
                    Use another image
                </button>
              </div>
              :
              <>
                <p>Upload an image to process</p>
                <input
                  type="file"
                  name="ocr-image"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0])
                  }}
                />
                <p>Supported formats:bmp, jpg, png, pbm</p>
              </>
            }
          </div>
          <div className="status">
            {ocrData}
          </div>
          <br />
        </div>
      )
}
