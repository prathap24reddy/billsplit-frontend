import React from "react";
import AddFriend from "./pages/AddFriend";
import BillSplit from "./pages/BillSplit";
import Header from "./Header";
import Footer from "./Footer";
function App() {
  return (
    <div className="App">
      <Header/>
      <BillSplit/>
      {/* <AddFriend/> */}
      <Footer/>
    </div>
  );
}

export default App;
