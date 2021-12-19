import { User } from '../../../model.js'


const randomString = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}



export default async function (req, res) {
    if (req.method !== 'POST') {
        res.status(405).end() //Method Not Allowed
        return;
    }


    const { email, password, passwordconfirmation } = req.body;

    if (password !== passwordconfirmation) {
        res.end(
            JSON.stringify({ status: 'error', message: 'Passwords do not match' })
        );
        return;
    }

    let user = await User.findOne({ where: { email } })

    if (!user) {
        user = await User.create({ email, password });

        const sessionToken = randomString(255);
        const d = new Date();
        d.setDate(d.getDate() + 30);
        User.update(
            {
                session_token: sessionToken,
                session_expiration: d
            },
            { where: { email } }
        );
        res.end(JSON.stringify({ status: 'success', message: 'User added' }));
    } else {
        res.end(JSON.stringify({ status: 'error', message: 'User already exists' }));
    }
}