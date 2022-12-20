import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import loader from '../giphy.gif';
import { FiExternalLink } from 'react-icons/fi';

const ImageCard = ({ image }) => {
	const [spans, setSpans] = useState(0);
	const imageRef = useRef();

	const setImgSrc = useCallback(() => {
		const {
			urls: { thumb },
			alt_description,
		} = image;

		imageRef.current.src = thumb;
		imageRef.current.alt = alt_description;
	}, [image]);

	const setModifiedSpans = useCallback(() => {
		const height = imageRef.current.clientHeight;

		// Adding 2 so that there is 2*4 = 8px more space to behave as margin-bottom
		const spans = Math.ceil(height / 4) + 2;
		setSpans(spans);
	}, []);

	useLayoutEffect(() => {
		const curr = imageRef.current;
		curr.addEventListener('load', setImgSrc, {
			once: true,
		});
		curr.addEventListener('load', setModifiedSpans);
		return () => {
			curr.removeEventListener('load', setImgSrc);
			curr.removeEventListener('load', setModifiedSpans);
		};
	}, [setImgSrc, setModifiedSpans]);

	return (
		<div style={{ gridRowEnd: `span ${spans}` }} className='image__card'>
			<img ref={imageRef} src={loader} alt='loading' />
			<a
				href={image.links.download}
				target='_blank'
				rel='noreferrer noopener'
				className='image__card-description'
			>
				<FiExternalLink
					color='#fff'
					className='image__card-dldIcon'
					title='See original image'
				/>
			</a>
		</div>
	);
};

export default ImageCard;
