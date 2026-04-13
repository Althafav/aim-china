import StartupMenuComponent from '@/components/Portfolio/startup/StartupMenuComponent'
import React, { useState } from 'react'
import { TiTick } from 'react-icons/ti'
import axios from 'axios';
import Globals from '@/modules/Globals';

import AddOnModal from './UI/AddOnModal';
import { GoDotFill } from 'react-icons/go';


type AddOn = {
    name: string;
    price: number;
    quantity?: number;
};


type PackageType = 'Standard' | 'Deluxe' | 'Premium';

type Payload = {
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
    organization: string;
    promocode: string;
    aed_amount: number;
    package: string;
    source: string;
    order_description: string;
    source_link: string;
};


const addonsList: AddOn[] = [
    { name: 'Dessert Safari', price: 150, quantity: 1 },
    { name: 'Gala Dinner', price: 499, quantity: 1 },
    { name: 'Startup Conveyor', price: 499 },
    { name: 'Additional Startup Pass', price: 500 },
    { name: 'Pitch Demo', price: 799 },
];



export default function PackagesComponent() {

    const [loading, setLoading] = useState({ standard: false, deluxe: false, premium: false });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedAddons, setSelectedAddons] = useState<{ name: string; quantity: number; price: number }[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
    const [basePrice, setBasePrice] = useState<number>(0);


    const toggleAddon = (addon: AddOn) => {
        const existingAddon = selectedAddons.find(item => item.name === addon.name);
        if (existingAddon) {

            setSelectedAddons(selectedAddons.filter(item => item.name !== addon.name));
        } else {

            setSelectedAddons([...selectedAddons, { ...addon, quantity: 1 }]);
        }
    };


    const updateAddonQuantity = (addon: AddOn, quantity: number) => {
        if (quantity < 1) return;
        const updatedAddons = selectedAddons.map(item =>
            item.name === addon.name ? { ...item, quantity } : item
        );
        setSelectedAddons(updatedAddons);
    };


    const calculateTotalPrice = () => {
        const addonsTotal = selectedAddons.reduce((acc, addon) => acc + addon.price * addon.quantity, 0);
        return basePrice + addonsTotal;
    };


    const handleBuyNow = (priceUSD: number, packageType: PackageType) => {
        setSelectedPackage(packageType);
        setBasePrice(priceUSD);
        setIsModalOpen(true);
    };

    const handleConfirmAddons = async () => {
        if (!selectedPackage) return;
        setLoading(prev => ({ ...prev, [selectedPackage]: true }));

        const firstname = (document.getElementById('firstname') as HTMLInputElement)?.value;
        const lastname = (document.getElementById('lastname') as HTMLInputElement)?.value;
        const email = (document.getElementById('email') as HTMLInputElement)?.value;

        const totalPriceAED = convertUsdToAed(calculateTotalPrice());
        const orderDescription = selectedAddons.length > 0
            ? selectedAddons.map(addon => `${addon.quantity}x ${addon.name}`).join(', ')
            : '';

        const payload: Payload = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            organization: "Strategic",
            promocode: "",
            aed_amount: totalPriceAED,
            package: selectedPackage,
            source: "AIM Startup 2025 Packages",
            order_description: orderDescription,
            source_link: window.location.href
        };

        try {
            const response = await axios.post('https://payment.aimcongress.com/api/Order/Generate', payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            const paymentLink = response.data.payment_link;
            if (paymentLink) {
                window.location.href = paymentLink;
            }
        } catch (error) {
            console.error('Payment error:', error);
        } finally {
            setLoading(prev => ({ ...prev, [selectedPackage]: false }));
            setIsModalOpen(false);
        }
    };

    const handleSkipAddons = () => {
        setSelectedAddons([]);
        handleConfirmAddons();
    };

    return (
        <div className='packages-page-wrapper '>
            <section className=" packages-table-wrapper">
                <div className="row">
                    <div className="col-12">
                        <h2 className='heading' style={{ textTransform: "uppercase" }}>Packages Designed for Your Need</h2>
                    </div>
                    <div className="col-12 mt-2">
                        {/* <h2 className='subHeading'>Dynamic features and activities fueling startup evolution and success</h2> */}
                    </div>
                </div>

                <div className="row p-lg-5">
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th className='table-heading' style={{ textTransform: "uppercase", color: "#202c4c" }}>Features</th>
                                    <th>
                                        <div className='d-flex flex-column align-items-center'>
                                            <span className='table-heading' style={{ color: "#324476", textTransform: "uppercase", fontWeight: "normal" }}>Standard</span>
                                            <span>2 sqm booth</span>

                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex flex-column align-items-center'>
                                            <span className='table-heading' style={{ color: "#202c4c", textTransform: "uppercase", fontWeight: "normal" }}>Deluxe</span>
                                            <span>6 Sqm Booth</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className='d-flex flex-column align-items-center'>
                                            <span className='table-heading' style={{ color: "#F28E3E", textTransform: "uppercase", fontWeight: "normal" }}>Premium</span>
                                            <span>9 Sqm Booth</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>
                                        Branded Booth
                                    </td>

                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>

                                </tr>

                                <tr>
                                    <td style={{ fontWeight: "bold" }}>LED Screen + USB</td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Pitch Competition Slot (if applicable)

                                    </td>
                                    <td className='text-center'>Eligible Startups Only</td>
                                    <td className='text-center'>Eligible Startups Only</td>
                                    <td className='text-center'>Eligible Startups Only</td>
                                </tr>

                                <tr>
                                    <td className='d-flex align-items-center gap-1 '><GoDotFill size={14} style={{ marginLeft: "12px" }} /><span >Preliminary rounds: Online Pitching</span></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr>
                                    <td className='d-flex align-items-center gap-1 '><GoDotFill size={14} style={{ marginLeft: "12px" }} /><span>Final rounds: AIM Congress 2025 Startup Stage (Top 15 Finalists)</span></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Startup Passes with Access to:

                                    </td>
                                    <td className='text-center'>2 Passes</td>
                                    <td className='text-center'>3 Passes</td>
                                    <td className='text-center'>5 Passes</td>

                                </tr>

                                <tr>
                                    <td className='d-flex align-items-center gap-1 '><GoDotFill size={14} style={{ marginLeft: "12px" }} />Opening Ceremony</td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr>
                                    <td className='d-flex align-items-center gap-1 '><GoDotFill size={14} style={{ marginLeft: "12px" }} />Startup Conferences</td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>


                                <tr>
                                    <td className='d-flex align-items-center gap-1 '><GoDotFill size={14} style={{ marginLeft: "12px" }} />Exhibition Hall</td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr>
                                    <td className='d-flex align-items-center gap-1 '><GoDotFill size={14} style={{ marginLeft: "12px" }} />Workshops</td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr>
                                    <td className='d-flex align-items-center gap-1 '><GoDotFill size={14} style={{ marginLeft: "12px" }} />Investor Hub</td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Official Networking App</td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Marketing Promotion

                                    </td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr>
                                    <td className='d-flex align-items-center gap-1 '><GoDotFill size={14} style={{ marginLeft: "12px" }} />Social media post</td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr>
                                    <td className='d-flex align-items-center gap-1 '><GoDotFill size={14} style={{ marginLeft: "12px" }} />Website Promotion</td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                    <td className='text-center'><TiTick /></td>
                                </tr>

                                <tr >
                                    <td style={{ fontWeight: "bold" }}>Gala Dinner</td>
                                    <td className='text-center'>-</td>
                                    <td className='text-center'>-</td>
                                    <td className='text-center'>2 Passes</td>
                                </tr>



                                <tr >
                                    <td style={{ fontWeight: "bold" }}>Ticket for Desert Safari Experience</td>
                                    <td className='text-center'>1 Ticket</td>
                                    <td className='text-center'>2 Tickets</td>
                                    <td className='text-center'>3 Tickets</td>
                                </tr>

                                <tr >
                                    <td style={{ fontWeight: "bold" }}>UAE Visa (if required)</td>
                                    <td className='text-center'>2 Visas</td>
                                    <td className='text-center'>3 Visas</td>
                                    <td className='text-center'>5 Visas</td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td className='text-center'>
                                        <button className='startup-package-btn' style={{ background: "#324476", borderRadius: "50px", color: "white" }}
                                            onClick={() => handleBuyNow(1599, 'Standard')}
                                            disabled={loading.standard}
                                        >
                                            {loading.standard ? (
                                                <span className="spinner">processing...</span>
                                            ) : (
                                                <>
                                                    <span className='price' id='standardPrice'>$1,599</span>
                                                    <span className='action-tag'>Register Now</span>
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td className='text-center'>
                                        <button className='startup-package-btn' style={{ background: "#202c4c", borderRadius: "50px", color: "white" }}
                                            onClick={() => handleBuyNow(5999, 'Deluxe')}
                                            disabled={loading.deluxe}
                                        >
                                            {loading.deluxe ? (
                                                <span className="spinner">processing...</span>
                                            ) : (
                                                <>
                                                    <span className='price' id='deluxePrice'>$5,999</span>
                                                    <span className='action-tag'>Register Now</span>
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td className='text-center'>
                                        <button className='startup-package-btn' style={{ background: "#F28E3E", borderRadius: "50px", color: "white" }}
                                            onClick={() => handleBuyNow(8999, 'Premium')}
                                            disabled={loading.premium}
                                        >
                                            {loading.premium ? (
                                                <span className="spinner">processing...</span>
                                            ) : (
                                                <>
                                                    <span className='price' id='premiumPrice'>$6,499</span>
                                                    <span className='action-tag'>Register Now</span>
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </section>
            <AddOnModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAddons}
                onSkip={handleSkipAddons}
                addons={addonsList}
                selectedAddons={selectedAddons}
                onAddonToggle={toggleAddon}
                onQuantityChange={updateAddonQuantity}
                totalPrice={calculateTotalPrice()}
                selectedPackage={selectedPackage}
            />
        </div>
    )
}


function convertUsdToAed(usdAmount: number): number {
    const exchangeRate = 3.68;
    return parseFloat((usdAmount * exchangeRate).toFixed(0));
}