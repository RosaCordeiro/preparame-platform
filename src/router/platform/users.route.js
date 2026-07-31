import Platform from "../../layouts/Platform.vue";

const UsersQueryCrud = () =>
  import("../../components/platform/usersCrud/UsersQueryCrud.vue");
const UsersRegisterCrud = () =>
  import("../../components/platform/usersCrud/UsersRegisterCrud.vue");
const UserProfile = () =>
  import("../../components/platform/userProfile/UserProfile.vue");

const userRoutes = [
    {
        path: "/users",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: UsersQueryCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
            ]
        }
    },
    {
        path: "/users/:id",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: UsersRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
            ]
        }
    },
    {
        path: "/profile",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: UserProfile
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
                'USER',
                'SPECIALIST'
            ]
        }
    },
]

export { userRoutes }
