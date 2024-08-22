import { useEffect, useState } from "react";
import { PageProps, User } from "@/types";

interface GeoProps {
    geonameId: number;
    countryName: string;
    countryCode: string;
    name: string;
    lat: number;
    lng: number;
}
interface StateProps {
    name: string;
    geonameId: number;
}
interface CityProps {
    name: string;
    geonameId: number;
}

const ShippingAddress = ({ auth }: PageProps) => {
    const [countries, setCountries] = useState<GeoProps[]>([]);
    const [states, setStates] = useState<StateProps[]>([]);
    const [cities, setCities] = useState<CityProps[]>([]);
    const [shippingAddress, setShippingAddress] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    });

    // Fetch countries when the component mounts
    useEffect(() => {
        fetch(
            `http://api.geonames.org/countryInfoJSON?username=stella_squality`
        )
            .then((response) => response.json())
            .then((data) => setCountries(data.geonames));
    }, []);

    // Fetch states based on the selected country
    useEffect(() => {
        if (shippingAddress.country) {
            fetch(
                `http://api.geonames.org/childrenJSON?geonameId=${shippingAddress.country}&username=your_username`
            )
                .then((response) => response.json())
                .then((data) => setStates(data.geonames));
        }
    }, [shippingAddress.country]);

    // Fetch cities based on the selected state
    useEffect(() => {
        if (shippingAddress.state) {
            fetch(
                `http://api.geonames.org/childrenJSON?geonameId=${shippingAddress.state}&username=your_username`
            )
                .then((response) => response.json())
                .then((data) => setCities(data.geonames));
        }
    }, [shippingAddress.state]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Shipping address submitted:", shippingAddress);
    };

    return (
        <div className="w-auto mx-auto p-6 bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Shipping Address
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Address Line 1 *
                        </label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={shippingAddress.addressLine1}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Address Line 2 (Optional)
                        </label>
                        <input
                            type="text"
                            name="addressLine2"
                            value={shippingAddress.addressLine2}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Country *
                        </label>
                        <select
                            name="country"
                            value={shippingAddress.country}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                            required
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option
                                    key={country?.geonameId}
                                    value={country?.geonameId}
                                >
                                    {country.countryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            State/Province *
                        </label>
                        <select
                            name="state"
                            value={shippingAddress.state}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                            required
                        >
                            <option value="">Select State/Province</option>
                            {states.map((state) => (
                                <option
                                    key={state.geonameId}
                                    value={state.geonameId}
                                >
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            City *
                        </label>
                        <select
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                            required
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option
                                    key={city.geonameId}
                                    value={city.geonameId}
                                >
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            ZIP/Postal Code *
                        </label>
                        <input
                            type="text"
                            name="zipCode"
                            value={shippingAddress.zipCode}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
                    >
                        Save Address
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShippingAddress;
