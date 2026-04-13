import { Partnerspage } from "@/models/partnerspage";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React from "react";
import PartnersItemComponent from "./PartnerItemComponent";


export default class PartnersComponent extends React.Component<
    {
        codename: string;
    },
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
        Globals.KontentClient.item(this.props.codename)
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
                {pageData.partnerscontainer.value.map((i: any, index: number) =>
                    i.system.codename != "media_partner" ? (
                        <div className="container" key={`partner-item-${index}`}>
                            <div className="row g-4">
                                <div className="col-12 text-center">
                                    <h2 className="section-heading bordered-heading text-center m-t-20 m-b-50">
                                        {i.heading.value}
                                    </h2>
                                </div>
                            </div>
                            <PartnersItemComponent partners={i.partners.value} />
                        </div>
                    ) : (
                        ""
                    )
                )}
            </React.Fragment>
        );
    }
}
