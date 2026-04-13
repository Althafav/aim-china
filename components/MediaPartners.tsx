import { Partnerspage } from "@/models/partnerspage";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React from "react";
import PartnersItemComponent from "./PartnerItemComponent";


export default class MediaPartnerComponent extends React.Component<
    {},
    {
        pageData: Partnerspage;
        isLoaded: Boolean;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            pageData: new Partnerspage(),
            isLoaded: false,
        };
    }

    componentDidMount() {
        Globals.KontentClient.item("partners_page_2024")
            .languageParameter(Globals.CURRENT_LANG_CODENAME)
            .withParameter("depth", "2")
            .toObservable()
            .subscribe((response: any) => {
                this.setState({
                    pageData: response.item,
                    isLoaded: true,
                });
            });
    }

    render(): React.ReactNode {
        let { pageData, isLoaded } = this.state;

        if (!isLoaded) {
            return <React.Fragment />;
        }

        return (
            <React.Fragment>
                {/* {pageData.partnerscontainer.value.map((i: any) => (
          i.heading.value=="Media Partners"?(
            <div className="container m-b-20">
            <PartnersItemComponent partners={i.partners.value} />
          </div>
          ):""
        ))} */}
                {pageData.partnerscontainer.value.map((i: any, index: number) => (
                    i.system.codename == "key_media_partners" || i.system.codename == "media_partner" ? (
                        <div className="container m-b-20" key={`partners-${index}`}>
                            <div className="row">
                                <div className="col-12 text-center pb-50">
                                    <h3 className="section-heading text-center m-t-50 m-b-50">{i.heading.value}</h3>
                                </div>
                            </div>
                            <PartnersItemComponent partners={i.partners.value} section={i.system.codename == "key_media_partners" ? "super" : ""} />
                        </div>
                    ) : ""

                ))}
            </React.Fragment>
        );
    }
}
