import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{border: 0}}>
      <ul className='pagination justify-content-end'>
        {pageNumbers.map(number => (
            <React.Fragment>
            {(currentPage == number) ?
                <li key={number} className='page-item active'>
                    <a onClick={() => paginate(number)} className='page-link'>
                    {number}
                    </a>
                </li>
                :
                <li key={number} className='page-item'>
                    <a onClick={() => paginate(number)} className='page-link'>
                    {number}
                    </a>
                </li>
            }
            </React.Fragment>
          
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
