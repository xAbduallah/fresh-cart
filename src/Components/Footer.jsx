
import appStore from "../assets/images/appStore.webp"
import googlePlay from "../assets/images/googlePlay.png"
import MasterCardLogo from "../assets/images/MasterCard.png"
import AmazonPay from "../assets/images/amazonpay.svg"
import AmericanExpressLogo from "../assets/images/american-express-logo.png"

export default function Footer() {
    return <>
        <div className="flex flex-col bg-[#F0F3F2] mt-10 px-16 py-16 gap-2">
            <h1 className="text-black text-4xl">Get the FreshCart app</h1>
            <p className="text-gray-500 text-2xl">We will send you a link, open it on your phone to download the app.</p>

            <div className="ms-[1%] me-[1%]">
                <div className="flex items-center flex-col lg:flex-row justify-between w-[100%] mt-5 gap-3">
                    <input type="email" placeholder="Email .." className="w-[75%] py-2 px-3 rounded-md border border-gray-300 text-gray-900 focus:border-blue-500"></input>
                    <span className="w-[50%] lg:w-[20%] px-5 py-2 text-lg text-center text-white bg-green-600 rounded-lg cursor-pointer hover:bg-green-700 focus:ring-4 ">
                        Share App Link
                    </span>
                </div>

                <hr className="w-full h-0.5 bg-gray-300 my-5" />

                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
                    {/* Payment Partners Section */}
                    <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                        <h1 className="text-black text-2xl md:text-3xl">Payment Partners</h1>
                        <div className="flex gap-3">
                            <img
                                className="w-10 md:w-12 h-auto object-contain"
                                src={AmazonPay}
                                alt="amazon pay"
                            />
                            <img
                                className="w-10 md:w-12 h-auto object-contain"
                                src={AmericanExpressLogo}
                                alt="american express"
                            />
                            <img
                                className="w-10 md:w-12 h-auto object-contain"
                                src={MasterCardLogo}
                                alt="mastercard"
                            />
                            <img
                                className="w-10 md:w-12 h-auto object-contain"
                                src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
                                alt="paypal"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <h1 className="text-black font-light text-2xl md:text-3xl text-center lg:text-left">Get deliveries with FreshCart</h1>
                        <div className="flex gap-3">

                            <img
                                className="w-20 md:w-24 h-auto object-contain cursor-pointer"
                                src={appStore}
                                alt="app Store"
                            />
                            <img
                                className="w-20 md:w-24 h-auto object-contain cursor-pointer"
                                src={googlePlay}
                                alt="google play"
                            />
                        </div>
                    </div>
                </div>

                <hr className="w-full h-0.5 bg-gray-300 my-5" />

            </div>
        </div>
    </>
}