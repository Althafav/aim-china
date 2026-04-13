import Image from 'next/image'
import React from 'react'

export default function DownloadCatelogue() {
  return (
    <section className='download-catelogue-wrapper'>
      <div className="container">
        <div className="row">

          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="left-container">
              <Image width={500} height={260} src="/assets/imgs/catelogue-img.png" alt="" className='w-100'
                loading="lazy" />

            </div>
          </div>
          <div className="col-lg-6">
            <div className="right-container">
              <div className="heading-wrapper">
                <p className='section-heading'>Download <strong>Our Catelogue</strong></p>
              </div>
              <p className='desc'>Discover the perfect solutions for your next project.</p>

              <form className='w-75'>
                <div className="row g-2">
                  <div className="col-lg-6 mb-2">
                    <input type="text" placeholder='First Name' className='form-control w-100'  required/>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <input type="text" placeholder='Last Name' className='form-control w-100'  required/>
                  </div>
                </div>
                <div className="row">

                  <div className="col-12 mb-2">
                    <input type="email" placeholder='Email Address' className='form-control w-100' required />

                  </div>

                  <div className="col-12 mb-2" >
                    <input type="text" placeholder='Phone Number' className='form-control w-100'  required/>

                  </div>
                </div>

                <button className='download-btn mt-3'>Download</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
