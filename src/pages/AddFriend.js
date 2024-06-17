import React from "react";

function AddFriend(){
    return(
        <div>
        <h1>Bill Split</h1>
            <form>
                <label>
                    <div>
                        <input type="text" name="name" placeholder="Enter a Friend Name" />
                    </div>
                    <div>
                        <input type="text" name="name" placeholder="Enter a Friend Name" />
                    </div>
                    <div>
                        <input type="text" name="name" placeholder="Enter a Friend Name" />
                    </div>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
export default AddFriend;