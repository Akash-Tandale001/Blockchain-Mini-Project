import { ethers } from "ethers";
import "./Buy.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../helper/Loader";
import { useState } from "react";

// toast.configure()
const Buy = ({ state }) => {
  const [loader, setLoader] = useState(false);
  const buyChai = async (event) => {
    event.preventDefault();
    setLoader(true);
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    //const amount = document.querySelector("#amount").value;
    const amount = { value: ethers.utils.parseEther("0.001") };
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    // alert("Transaction is successul");
    toast.success("Transaction is succesfully", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setLoader(false);
    window.location.reload();
  };
  return (
    <>
      {loader ? <Loader /> : null}
      <div className="center">
        <h1>Thanks</h1>
        <form onSubmit={buyChai}>
          <div className="inputbox">
            <input
              type="text"
              required="required"
              id="name"
              placeholder="Your Name"
            />
          </div>
          <div className="inputbox">
            <input
              type="text"
              required="required"
              id="message"
              placeholder="Your Message"
            />
          </div>
          <div className="inputbox">
            <input type="submit" value="Pay" disabled={!state.contract} />
          </div>
        </form>
      </div>
    </>
  );
};
export default Buy;
