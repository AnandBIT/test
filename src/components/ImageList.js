import React from 'react';
import ImageCard from './ImageCard';

const ImageList = ({ images }) => {
	if (images.length === 0) {
		return <h2 style={{ color: 'red' }}>No images found!</h2>;
	}

	return (
		<div className='image-list'>
			{/* We should assign an unique key property to the root tag we are returning inside the map statement */}
			{images.map((image) => {
				return <ImageCard image={image} key={image.id} />;
			})}
		</div>
	);
};

export default ImageList;
