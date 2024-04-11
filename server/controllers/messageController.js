import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// send message
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;
        // find the conversation of 2 users
        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]}
        });

        if(!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };
        // create message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        // if message exist then pust the message id
        if(newMessage) {
            gotConversation.messages.push(newMessage._id)
        };
        // save messages
        await Promise.all([gotConversation.save(), newMessage.save()]);

        // socket.io
        // receiver socket id
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        return res.status(201).json({newMessage})
    } catch (error) {
        console.log(error);
    }
};

// get message
export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: {$all : [senderId, receiverId]}
        }).populate("messages");
        return res.status(200).json(conversation ?. messages)
    } catch (error) {
        console.log(error);
    }
}