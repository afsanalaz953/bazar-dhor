import React from 'react';

const Search = () => {
    return (
        <div>
            <div className="dropdown dropdown-start">
  <div tabIndex={0} role="button" className="btn m-1">ডিফল্ট ⬇️</div>
  <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a>দাম: কম থেকে বেশি</a></li>
    <li><a>দাম: বেশি থেকে কম</a></li>
  </ul>
</div>
        </div>
    );
};

export default Search;