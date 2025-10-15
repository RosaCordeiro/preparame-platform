import SpecialistsQueryCrud from "../../components/platform/specialistsCrud/SpecialistsQueryCrud.vue"
import SpecialistsRegisterCrud from "../../components/platform/specialistsCrud/SpecialistsRegisterCrud.vue"
import SpecialistProvidesTimetables from "../../components/platform/specialistProvidesTimetables/SpecialistProvidesTimetables"
import ViewProductsUser from "../../components/platform/viewProductsUser/ViewProductsUser.vue"
import Platform from "../../layouts/Platform.vue"

const specialistRoutes = [
    {
        path: "/specialists",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SpecialistsQueryCrud
            }
        }]
    },
    {
        path: "/specialists/new",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SpecialistsRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
            ]
        }
    },
    {
        path: "/specialists/:id",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SpecialistsRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
            ]
        }
    },
    {
        path: "/providesTimetables",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SpecialistProvidesTimetables
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
                'SPECIALIST'
            ]
        }
    },
    {
        path: "/viewProductsUser",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: ViewProductsUser
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
                'SPECIALIST'
            ]
        }
    },
]

export { specialistRoutes }