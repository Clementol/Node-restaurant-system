import { ObjectId } from "mongodb";
import MenuServices from "../services/menu.services";

const createMenu = (req, res) => {

  try {

    const { name, startDate, endDate, vendorId } = req.body;
    
    const menuId = ObjectId().toString();

    let data = {};
    data.menuId = menuId
    data.name = name
    if (startDate != null) {
      data.startDate = startDate
    }
    if (endDate != null) {
      data.endDate = endDate
    }
    data.vendorId = vendorId

    MenuServices.CreteMenu(data)
    .then(menu => {
        return res.status(200).json({ menu });
    })
    .catch(error => {
        const msg = `Unable to create menu ${error}`
        return res.status(400).json({error: msg });
    })

  } catch (error) {
    const msg = `Error creating menu ${error}`;
    return res.status(500).json({ error: msg });
  }

};

const updateMenu = (req, res) => {
  try {
    const {name, startDate, endDate } = req.body
    const {menuId} = req.params
    let data = {}
    if (name != null) {
      data.name = name
    }
    if (startDate != null) {
      data.startDate = startDate
    }
    
    if (endDate != null) {
      data.endDate = endDate
    }

    MenuServices.UpdateMenu(menuId, data)
    .then(menu => {
      const [affectedCount] = menu
      
      if (affectedCount == 0) {
        const msg = `No menu found`
        return res.status(400).json({error: msg})
      }
      return res.status(202).json("User updated");
    })
    .catch(error => {
      const msg = `Unable to update menu ${error}`
      return res.status(400).json({error: msg });
    })
  } catch (error) {
    const msg = `Error updating menu ${error}`;
    return res.status(500).json({ error: msg });
  }
}

const getMenusWithFoods = (req, res) => {
  try {
    const {vendorId} = req.params

    MenuServices.GetMenusWithFoods(vendorId)
    .then(menus => {
      return res.status(200).json({menus})
    })
    .catch(error => {
      return res.status(400).json({error})
    })
  } catch (error) {
    const msg = `Error getting menu with foods ${error}`;
    return res.status(500).json({ error: msg });
  }
}

export { createMenu, updateMenu, getMenusWithFoods };
