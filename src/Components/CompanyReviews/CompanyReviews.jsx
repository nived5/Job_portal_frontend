import React from 'react'
import "./companyreview.css"

function CompanyReviews() {
  return (
    <div className='review-wrapper'>
        <h1>Find great places to work</h1>
        <h3>Get access to millions of company reviews</h3>
        <div className='input-wrap2'>
              <input className='review-ip' type="text" />
              <button className='button-ip'>Find Companies</button>
            </div>
    </div>
    
  )
}

export default CompanyReviews