const Login = () => import("../../layouts/Login.vue");
const ResetPassword = () => import("../../layouts/ResetPassword.vue");

const loginRoutes = [
    {
        path: "/login",
        name: "Login",
        components: {
            site: Login
        }
    },
    {
        path: "/password/reset/:token",
        name: "ResetPassword",
        components: {
            site: ResetPassword
        }
    },
]

export { loginRoutes }
