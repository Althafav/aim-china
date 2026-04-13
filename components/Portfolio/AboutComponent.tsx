import React, { useState } from 'react'

export default function AboutComponent(props: any) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };


    const limitedText = props.aboutParagraph.substring(0, 450);
    return (
        <section className='about-portfolio-section-wrapper'>
            <div className="section-container">
                <div className="row about-content">
                    <div className="col-12">
                        <h2 className='section-heading'>{props.aboutHeading}</h2>
                    </div>
                    <div className="col-12">
                        <div
                            className={`paragraph ${isExpanded ? 'expanded' : 'faded'}`}
                            dangerouslySetInnerHTML={{
                                __html: isExpanded ? props.aboutParagraph : limitedText,
                            }}
                        />

                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center mt-3" onClick={handleToggle}>
                        <button className='read-more-btn'>{isExpanded ? 'Read Less' : 'Read More'}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
