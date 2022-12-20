import React, { Fragment, useState } from 'react';

const SearchBar = ({ onSubmitRequest }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const onFormSubmit = (e) => {
		e.preventDefault();
		onSubmitRequest(searchTerm, 1);
	};

	return (
		<Fragment>
			<form className='ui form' onSubmit={onFormSubmit}>
				<input
					type='text'
					value={searchTerm}
					id='searchBox'
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
					autoComplete='off'
					placeholder='Image Search'
					required
				/>
				<button type='submit' className='btn btn-submit'>
					Search
				</button>
			</form>
		</Fragment>
	);
};

export default SearchBar;
