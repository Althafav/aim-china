import { Faqitem } from '@/models/faqitem';
import { Portfoliopage } from '@/models/portfoliopage';
import React, { useState } from 'react';



type AccordionProps = {
  pageData: Portfoliopage | null;
};

const AccordionComponent: React.FC<AccordionProps> = ({ pageData }) => {


  return (
    <div className='container'>
      <div className="row">
        <div className="col-12">
          <h1 className='faq-heading'>FAQs</h1>
        </div>
      </div>

      <div className="accordion" id="accordionExample">
        {pageData?.faq.value.map((m: any, index: number) => {
          var item: Faqitem = m;
          return (
            <div className="accordion-item" key={item.system.id}>
              <h2 className="accordion-header" id={`heading${item.system.id}`}>
                <button
                  className={`accordion-button fs-5 collapsed`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${item.system.id}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={`collapse${item.system.id}`}
                >
                  {item.title.value}
                </button>
              </h2>
              <div
                id={`collapse${item.system.id}`}
                className={`accordion-collapse collapse `}
                aria-labelledby={`heading${item.system.id}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.content.value,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        }

        )}
      </div>
    </div>
  );
};

export default AccordionComponent;
