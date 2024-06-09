export const Currency_icon = `A$`;
export const api_url = "http://localhost:8000";

export const priceWithSymbol = (number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "AUD" }).format(
        number
    );
// export const SpinnerLoader = (props) => (
//     <div className={"spinner-container " + (props.Style ? props.Style : "")}>
//         <Loader
//             type="TailSpin"
//             color="#5e6df2"
//             height={70}
//             width={70}
//             timeout={props.time ? props.time : 3000} //3 secs
//         />
//     </div>
// );