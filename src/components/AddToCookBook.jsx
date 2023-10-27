import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { CookbooksContext } from "../context/cookbooks.context";
import { del, post } from "../services/authService";
import { Form } from "react-bootstrap";
import Select from "react-select";

const AddToCookBook = ({recipeId}) => {
    
    const {user} = useContext(AuthContext)
    const {setNewCookbook} = useContext(CookbooksContext)
    const options = user.cookbooks.map(cookbook => {
        return { value: cookbook._id, label: cookbook.name }
    })
    
      const [selectedValues, setSelectedValues] = useState([]);

      const handleAddToCookbook = async () => {
        const promises = selectedValues.map((selected) => {
          return post(`/cookbooks/add/${selected.value}/${recipeId}`)
        })
        let response = await Promise.all(promises).then(() => setNewCookbook(true))

        console.log(response);
        // post(`/add/${cookbookId}/${recipeId}`).then((response) => {
        //   console.log(response.data);
        //   setNewCookbook(true)
        //   // window.location.reload(false);
        // });
      };
      
      const handleSelectChange = (e) => {
        // const selectedOptions = e.map((selection)=> {
        //   return selection.value
        // })

        // console.log("THIS IS THE VALUE ===>",e);

        setSelectedValues(e);
        if(selectedValues){
            console.log("THIS IS THE VALUE ===>", selectedValues);
        }
      };


    
      return (
        <div>
          <div>
            <label>Choose multiple options:</label>
            <Select
              isMulti
              options={options}
              value={selectedValues}
              onChange={handleSelectChange}
              className="scrollable-multi-select"
            />
          </div>
          <button onClick={() => handleAddToCookbook(selectedValues)}>
            Add to Cookbook
          </button>
          <div>
            Selected Values: {selectedValues.map((option) => option.label).join(", ")}
          </div>
        </div>
      );
    };
  
  export default AddToCookBook