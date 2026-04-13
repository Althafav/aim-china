import React from 'react';


type AddOn = {
    name: string;
    price: number;
};

type AddOnModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onSkip: () => void;
    addons: AddOn[];
    selectedAddons: { name: string; quantity: number; price: number }[];
    onAddonToggle: (addon: AddOn) => void;
    onQuantityChange: (addon: AddOn, quantity: number) => void;
    totalPrice: number;
    selectedPackage: string | null;
};

const AddOnModal: React.FC<AddOnModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    onSkip,
    addons,
    selectedAddons,
    onAddonToggle,
    onQuantityChange,
    totalPrice,
    selectedPackage,

}) => {
    if (!isOpen) return null;

    const isSelected = (addonName: string) =>
        selectedAddons.some(addon => addon.name === addonName);

    const getQuantity = (addonName: string) =>
        selectedAddons.find(addon => addon.name === addonName)?.quantity || 1;


    const hasQuantityControl = (addonName: string) =>
        addonName === 'Dessert Safari' || addonName === 'Gala Dinner';

    const estimatedAED = totalPrice * 3.68

    return (
        <div className="custom-modal-overlay" id='AddOnModal'>
            <div className="custom-modal">
                <div className="custom-modal-header">
                    <h5 className='text-black'>{selectedPackage} Ticket : <strong>${totalPrice}</strong> </h5>
                    <button className="custom-modal-close" onClick={onClose}>×</button>
                </div>
                <div className="custom-modal-body">
                    <p className='mb-3'>Do you want any Add-ons ?</p>
                    {addons.map(addon => (
                        <div key={addon.name} className="addon-item" >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isSelected(addon.name)}
                                    onChange={() => onAddonToggle(addon)}
                                />
                                {addon.name} - ${addon.price}
                            </label>
                            {isSelected(addon.name) && hasQuantityControl(addon.name) && (
                                <div className="quantity-selector">
                                    <button
                                        onClick={() => onQuantityChange(addon, getQuantity(addon.name) - 1)}
                                    >
                                        -
                                    </button>
                                    <span>{getQuantity(addon.name)}</span>
                                    <button
                                        onClick={() => onQuantityChange(addon, getQuantity(addon.name) + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="custom-modal-footer">
                    <div className='text-dark'>Grand Total: <strong>${totalPrice}</strong></div>
                    <p className='estimation-price'>Estimated amount in Dirhams : AED {estimatedAED.toFixed(0)}</p>
                    <div className="mt-3">
                        <button className="custom-modal-confirm" onClick={onConfirm}>Confirm Add-ons</button>
                        <button className="custom-modal-skip" onClick={onSkip}>Skip Add-ons</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOnModal;
