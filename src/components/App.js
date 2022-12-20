import React, { Fragment, useCallback, useState } from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

let userTerm = '',
	currentPageNumber = 1;

const App = () => {
	const [images, setImages] = useState([]);
	const [nextButtonVisibility, setNextButtonVisibility] = useState(false);
	const [content, setContent] = useState({ status: false, content: null });

	const onSearchSubmit = useCallback(async (term, pageNumber) => {
		try {
			// Resetting state and showing a loader, each time a new search call is made

			setImages([]);
			setNextButtonVisibility(false);
			setContent({ status: false, content: <div id='loader'></div> });

			userTerm = term;
			currentPageNumber = pageNumber;
			const response = await unsplash.get('/search/photos', {
				params: {
					query: userTerm,
					per_page: 20,
					page: pageNumber,
				},
			});

			setImages(response.data.results);
			setNextButtonVisibility(
				response.data.results.length === 0 ? false : true
			);
			setContent({
				status: true,
				content: null,
			});
		} catch (err) {
			setContent({
				status: false,
				content: (
					<Fragment>
						<h2 style={{ color: 'red', margin: '.5rem 0' }}>
							Server can't be reached!
						</h2>
						<p style={{ color: 'red', fontSize: '1.3rem' }}>
							Please check your Internet Connection
						</p>
					</Fragment>
				),
			});
		}
	}, []);

	return (
		<div
			className='container'
			style={{ marginTop: '1rem', textAlign: 'center' }}
		>
			<SearchBar onSubmitRequest={onSearchSubmit} />
			{!content.status ? (
				content.content
			) : (
				<Fragment>
					<ImageList images={images} />
					{nextButtonVisibility && (
						<button
							onClick={() => {
								if (userTerm) {
									currentPageNumber++;
									onSearchSubmit(userTerm, currentPageNumber);
									window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
								}
							}}
							className='btn'
						>
							Next Page
						</button>
					)}
				</Fragment>
			)}
		</div>
	);
};

export default App;
