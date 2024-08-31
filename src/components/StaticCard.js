// StaticCard.js
import React, {useState, useEffect} from 'react';
import {
  getLogoImage,
  updateLogoImage,
  getCoverImage,
  updateCoverImage,
  getBusinessName,
  updateBusinessName,
 } from '../services/api';
import styles from '../style/App.module.css';
import '../style/Header.css';

const StaticCard = () => {

  const [editing, setEditing] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [newBusinessName, setNewBusinessName] = useState(businessName);
  const [logo, setLogo] = useState(require('../images/logo.PNG'));
  const [coverImage, setCoverImage] = useState(require('../images/logo.PNG'));
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    getBusinessName()
      .then(response => {
        setBusinessName(response.data.name);
        setNewBusinessName(response.data.name);
      })
      .catch(e => console.error(e));
  });

  useEffect(() => {
    getLogoImage()
      .then(response => {
        const data = response.data;
        setLogo(data.logoImage);
      })
      .catch(e => console.error(e));
  }, []);

  useEffect(() => {
    getCoverImage()
      .then(response => {
        const data = response.data;
        setCoverImage(data.coverImage)
      })
      .catch(e => console.error(e));
  }, []);

  const handleEdit = () => setEditing(true);

  const handleBusinessNameChange = (e) => {
    setNewBusinessName(e.target.value);
    setChanges(true);
  };

  const handleSave = async () => {
    if (businessName !== newBusinessName) {
      await updateBusinessName(newBusinessName);
      setBusinessName(newBusinessName);
    }
    setEditing(false);
    setChanges(false);
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    // Create a FormData object
    const formData = new FormData();
    formData.append('image', file); // 'image' is the field name expected by multer on the server
    await updateLogoImage(formData).then(response => {
      setLogo(URL.createObjectURL(file));
    })
  };

  const handleCoverImageChange = async(e) => {
    const file = e.target.files[0];
    // Create a FormData object
    const formData = new FormData();
    formData.append('image', file); // 'image' is the field name expected by multer on the server
    await updateCoverImage(formData).then(response => {
      setCoverImage(URL.createObjectURL(file));
    })
  };

  return (
    <div className="static-card">
        <input 
          type="file" 
          onChange={handleCoverImageChange} 
          style={{ display: 'none' }}
          id="coverImageInput"
          />
        <label htmlFor="coverImageInput" >
          <div className='pageCover' style={{backgroundImage: `url(${coverImage})`}}>
            <input 
            type="file" 
            onChange={handleLogoChange} 
            style={{ display: 'none' }}
            id="logoInput"
            />
            <label htmlFor="logoInput">
              <img src={logo} alt="Business Logo" className="logo" />
            </label>
          </div>
        </label>
        <div className='business-details-wrapper'>
            <div id="business-details">
                
              <div className="" onClick={handleEdit}>
                {editing ? (
                  <input 
                    type="text" 
                    value={newBusinessName} 
                    onChange={handleBusinessNameChange} 
                    className={styles.inputField}
                  />
                ) : (
                  <h1 id="business-details-name">{businessName}</h1>
                )}
              </div>

                {/*<div id="business-details-rating-wrapper" class="business-rating-wrapper" style="display: none;">
                </div>*/}

                <h2 id="business-details-address"><i className="fas fa-map-marker-alt"></i> דייר אל אסד </h2>
                {changes && (
                  <button 
                    onClick={handleSave} 
                    className={styles.button}
                    disabled={!changes}
                  >
                    Save Changes
                  </button>
                )}
            </div>
        </div>
    </div>
  );
};

export default StaticCard;
