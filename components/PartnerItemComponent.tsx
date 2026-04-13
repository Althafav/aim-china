import Link from "next/link";
import React from "react";
import Helper from "@/modules/Helper"

export default function PartnersItemComponent(props: any) {
    const { partners, section } = props;
    var formatName = "";
 
    if (partners.length === 0) {
        return <React.Fragment />;
    }

    return (
        <React.Fragment>
            <div className="row sponsors_listing">
                {partners.map((s: any) =>
                    s.hero.value == 1 && s.russiaPartner.value != 1
                        ? ((formatName = s.system.id),
                            (
                                <div className="col-12 offset-md-4 col-md-4 text-center m-b-20">
                                    <div className="m-b-40">
                                        <Link passHref legacyBehavior href={`/partner/${Helper.formatUrlParameter(s.name.value)}`}>
                                            <a rel="noreferrer noopener">
                                                <div className="m-b-20" style={{ margin: "0 auto", marginBottom: "10px", width: "200px", height: "200px", background: "url(" + s.image.value[0]?.url + ")", backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>
                                                {/* <img
                          className="m-b-20"
                          style={{ margin: "0 auto", marginBottom: "10px" }}
                          src={s.logo.value[0].url}
                          alt={s.logo.value}
                          width="200"
                          height="200"
                        /> */}
                                                <p>{s.name.value}</p>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        : ""
                )}
            </div>
            <div className="row g-3 sponsors_listing">
                {partners.map((s: any) =>
                    s.hero.value == 1 && s.russiaPartner.value == 1
                        ? ""
                        : ((formatName = s.system.id),
                            section == "super" ? (
                                <div className="col-12 col-md-4 text-center m-b-20">
                                    <div className="m-b-40 border">
                                        <Link passHref legacyBehavior href={`/partner/${Helper.formatUrlParameter(s.name.value)}`}>
                                            <a rel="noreferrer noopener">
                                                <div className="m-b-20" style={{ margin: "0 auto", width: "160px", height: "160px", background: "url(" + s.image.value[0].url + ")", backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>

                                                {/* <img
                          className="m-b-20"
                          style={{ margin: "0 auto" }}
                          src={s.logo.value[0].url}
                          alt={s.logo.value}
                          width="157"
                          height="157"
                        /> */}
                                                <p className="text-dark">{s.name.value}</p>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="col-12 col-md-3 text-center m-b-20">
                                    <div className="m-b-40 border h-100">
                                        <Link passHref legacyBehavior href={`/partner/${Helper.formatUrlParameter(s.name.value)}`}>
                                            <a rel="noreferrer noopener">
                                                <div className="m-b-20" style={{ margin: "0 auto", width: "160px", height: "160px", background: "url(" + s.image.value[0].url + ")", backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>

                                            
                                                <p className="text-dark">{s.name.value}</p>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ))
                )}
            </div>
        </React.Fragment>
    );
}
