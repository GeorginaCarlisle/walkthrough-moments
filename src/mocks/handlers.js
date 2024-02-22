import { rest } from "msw"

const baseURL = 'https://walk-through-django-rest-a5d1529cfa3a.herokuapp.com/'

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json(
            {
                "pk": 2,
                "username": "Tester",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 2,
                "profile_image": "https://res.cloudinary.com/dw8hkd3cp/image/upload/v1/media/../default_profile_yzfpjq"
            }
        ));
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
];