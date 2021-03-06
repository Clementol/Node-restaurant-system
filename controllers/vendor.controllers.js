const { ObjectId } = require("mongodb");
const VendorServices = require("../services/vendor.services");

const createVendor = (req, res) => {
  try {
    const {
      name,
      location,
      latitude,
      longitude,
      openTime,
      closeTime,
      deliveryFee,
    } = req.body;
    const vendorImage = req.file;
    const vendorId = ObjectId().toString();
    let data = {};
    data.vendorId = vendorId;
    data.name = name;
    data.image = vendorImage.location;
    (data.location = location),
      (data.latitude = latitude),
      (data.longitude = longitude),
      (data.openTime = openTime);
    data.closeTime = closeTime;
    data.deliveryFee = deliveryFee;

    VendorServices.CreateVendor(data)
      .then((vendor) => {
        return res.status(201).json({ vendor });
      })
      .catch((error) => {
        const msg = `Unable to create vendor ${error}`;
        return res.status(400).json({ error: msg });
      });
  } catch (error) {
    const msg = `Error creating vendor ${error}`;
    return res.status(500).json({ error: msg });
  }
};

const updateVendor = async (req, res) => {
  try {
    const {
      name,
      location,
      latitude,
      longitude,
      openTime,
      closeTime,
      deliveryFee,
    } = req.body;
    const { vendorId } = req.params;

    const vendorImage = req.file;
    let data = {};
    if (vendorId == null) {
      const msg = `vendor id is required`;
      return res.status(400).json({ error: msg });
    }
    if (name != null) {
      data.name = name;
    }
    if (vendorImage != null) {
      data.image = vendorImage.location;
    }
    if (location != null) {
      data.location = location;
    }
    if (latitude != null) {
      data.latitude = latitude;
    }
    if (longitude != null) {
      data.longitude = longitude;
    }
    if (openTime != null) {
      data.openTime = openTime;
    }
    if (closeTime != null) {
      data.closeTime = closeTime;
    }
    if (deliveryFee != null) {
      data.deliveryFee = deliveryFee;
    }
    VendorServices.UpdateVendor(vendorId, data)
      .then((vendor) => {
        const [affectedCount] = vendor;
        if (affectedCount == 0) {
          const msg = `No vendor found`;
          return res.status(400).json({ error: msg });
        }
        return res.status(202).json({ user });
      })
      .catch((error) => {
        const msg = `Unable to update vendor ${error}`;
        return res.status(400).json({ error: msg });
      });
  } catch (error) {
    const msg = `Error creating vendor ${error}`;
    return res.status(500).json({ error: msg });
  }
};

const getVendorOrders = async (req, res) => {
  try {
    const { vendorId } = req.params;
    await VendorServices.getVendorOrders(vendorId)
      .then((vendor) => {
        return res.status(200).json({ vendor });
      })
      .catch((error) => {
        const msg = `Unable to get vendor orders ${error}`;
        return res.status(400).json({ error: msg });
      });
  } catch (error) {
    const msg = `Error getting vendor order ${error}`;
    return res.status(500).json({ error: msg });
  }
};

const updateVendorOrders = async (req, res) => {
  let msg
  try {
    const { vendorId } = req.params;
    const { orderIds, orderStatus } = req.body;
    await VendorServices.updateVendorOrders(vendorId, orderIds, orderStatus)
      .then((order) => {
        const [affectedCount] = order;
        if (affectedCount == 0) {
          msg = `No order found`;
          return res.status(400).json({ error: msg });
        }
        return res.status(202).json({ order });
      })
      .catch((error) => {
        msg = `Unable to update order ${error}`;
        return res.status(400).json({ error: msg });
      });
  } catch (error) {
    msg = `Error updating vendor order ${error}`;
    return res.status(500).json({ error: msg });
  }
};

module.exports = { createVendor, updateVendor, getVendorOrders, updateVendorOrders };
