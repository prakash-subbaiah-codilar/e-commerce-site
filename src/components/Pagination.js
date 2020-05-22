import React from 'react';

//Display the Number of page in Pagination Layout for Product List Page
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{border: 0}}>
      <ul className='pagination justify-content-end'>
        {pageNumbers.map(number => (
            <React.Fragment key={number}>              
              <li key={number} className={(currentPage == number) ? 'page-item active' : 'page-item'}>
                    <a onClick={() => paginate(number)} className='page-link'>
                    {number}
                    </a>
                </li>            
            </React.Fragment>
          
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
