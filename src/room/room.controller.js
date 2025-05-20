import Room from './room.model.js';

export const createRoom = async (req, res) => {

    try {
        const { name, description, capacity, pricePerDay, type, hotel, reservations} = req.body;
        const newRoom = new Room({ name, description, capacity, pricePerDay, type, hotel, reservations});
        await newRoom.save();
        console.log("hola");
        return res.status(201).json({
            success: true,
            message: 'Room created successfully',
            room: newRoom
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating room',
            error: error.message
        })
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        return res.status(200).json({
            success: true,
            rooms
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching rooms',
            error: error.message
        })
    }
}

export const getRoomById = async (req, res) => {
    try {
        const { rid } = req.params;
        const room = await Room.findById(rid);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            })
        }
        return res.status(200).json({
            success: true,
            room
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching room',
            error: error.message
        })
    }
}

export const updateRoom = async (req, res) => {
  try {
    const { rid } = req.params;
    const data = req.body;

    const room = await Room.findByIdAndUpdate(rid, {$set: data}, {new: true});
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating room",
      error: error.message
    })
  }
}