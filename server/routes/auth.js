import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const chatEngineRes = await axios.get("https://api.chatengine.io/users/me",
        {
            headers: {
                "Project-ID": process.env.PROJECT_ID,
                "User-Name": username,
                "User-Secret": password,
            }
        });

        res.status(200).json({response: chatEngineRes.data});
    } catch (error) {
        console.error("error", error.response);
        res.status(500).json({ error: error.message });
    }
})

router.post('/signup', async (req, res) => {
    try {
        const {username, password} = req.body;
        const chatEngineRes = await axios.post("https://api.chatengine.io/users/",
        {
            username: username,
            secret: password
        },
        {
            headers: {
                "Private-Key": process.env.PRIVATE_KEY
            }
        });

        res.status(200).json({response: chatEngineRes.data});
    } catch (error) {
        console.error("error", error.response);
        res.status(500).json({ error: error.message });
    }
})

export default router;