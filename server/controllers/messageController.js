import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

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
        await gotConversation.save();

        // socket.io
        return res.status(201).json({message: "message sent"})
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