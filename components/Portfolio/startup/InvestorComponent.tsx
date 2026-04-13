import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Startuppartners } from "@/models/startuppartners";
import { Startuppartnersitem } from "@/models/startuppartnersitem";
import Globals from "@/modules/Globals";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";


export default function InvestorComponent() {

    const [pageData, setPageData] = useState<Startuppartners | null>(null);
    const [visibleItems, setVisibleItems] = useState<number>(24);


    useEffect(() => {
        Globals.KontentClient.item("investors_line_up")
            .withParameter("depth", "2")
            .toObservable()
            .subscribe((response: any) => {
          
                setPageData(response.item);
            });
    }, []);

    const showMoreItems = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 24);
    };

    if (!pageData) {
        return <SpinnerComponent />;
    }
    return (
        <div className="investors-component-wrapper">
            <div className="row mt-5 p-5 p-md-0">
                {pageData.items.value.slice(0, visibleItems).map((m: any, index: number) => {
                    var item: Startuppartnersitem = m;
                    return (
                        <div className="col-xxl-2 col-xl-3 col-md-4 col-12 mb-5" key={`investor-item-${index}`}>
                            <div className="investor-card">

                                <Image src={item.image.value[0].url} alt={item.name.value} width={240} height={240} className="investor-profile-image" />

                                <div className="text-container">
                                    <p className="name">{item.name.value}</p>
                                    <p className="short-content" dangerouslySetInnerHTML={{ __html: item.short_content.value }} />
                                </div>
                            </div>


                        </div>
                    )
                })}
            </div>

            {visibleItems < pageData.items.value.length && (
                <div className="text-center mt-4">
                    <button className="startup-btn" onClick={showMoreItems}>Show More</button>
                </div>
            )}

        </div>
    )
}

