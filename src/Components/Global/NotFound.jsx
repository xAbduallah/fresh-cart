import errorImg from "../../assets/images/error.svg";
export default function NotFound() {
    return <>
        <div className="w-full flex justify-center">
            <img src={errorImg} alt="" />
        </div>
    </>
}