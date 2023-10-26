import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CookbooksContext } from "../context/cookbooks.context";
import { del, post } from "../services/authService";

const AddToCookBook = () => {
    
    const {user} = useContext(AuthContext)
    const {setNewCookbook} = useContext(CookbooksContext)
    const options = user.cookbooks.map(cookbook => {
        return { value: cookbook._id, label: cookbook.name }
    })
    
      const [selectedValues, setSelectedValues] = useState([]);
      
      const handleAddToCookbook = (cookbookId, recipeId) => {
        post(`/add/${cookbookId}/${recipeId}`).then((response) => {
          console.log(response.data);
          setNewCookbook(true)
          // window.location.reload(false);
        });
      };
      const handleRemoveFromCookbook = (cookbookId, recipeId) => {
        del(`/remove/${cookbookId}/${recipeId}`).then((response) => {
          console.log(response.data);
          setNewCookbook(true)
          // window.location.reload(false);
        });
      };
      const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
          option.value
        );
        setSelectedValues(selectedOptions);
      };
    
      return (
        <div className="container">
          <h1 className="text-center">Scrollable Multi-Select Dropdown</h1>
          <Form>
            <Form.Group>
              <Form.Label>Choose multiple options:</Form.Label>
              <Form.Select
                className="scrollable-multi-select"
                size="5"
                multiple
                value={selectedValues}
                onChange={handleSelectChange}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          <div>
            Selected Values: {selectedValues.join(", ")}
          </div>
        </div>
      );
    };
  
  export default AddToCookBook
  