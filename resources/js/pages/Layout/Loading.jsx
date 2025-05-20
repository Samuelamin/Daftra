import React from 'react'
export const Loading = () => {
  return (
    <div className='loading_div'>
        <img src={process.env.REACT_APP_IMAGE_PATH + (localStorage.getItem('web_img') ?? '')} alt="" width={100}  /> <br />
        <div className='loading_div_body'>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    </div> 
  )
}
